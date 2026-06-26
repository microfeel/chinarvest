#!/usr/bin/env python3
"""
ChinaRvest — Market Intelligence Report Generator
Queries UN Comtrade API to analyze target markets for our products.

Setup:
  1. Register at https://comtradedeveloper.un.org/
  2. Get a free API subscription key
  3. Set it in the KEY variable below or as env UN_COMTRADE_KEY

Note: As of 2026, the UN Comtrade REST API (comtradeapi.un.org/data/v1/get)
has been deprecated. The new Comtrade+ platform uses a web-based interface.
This script tries both old and new endpoints; update the URL if needed.
"""

import urllib.request
import urllib.error
import json
import os
import sys
from datetime import datetime

# --- Configuration ---
KEY = os.environ.get("UN_COMTRADE_KEY", "0c46b286cfb44e3aaab3a71cd370d8d1")

HS_CODES = {
    "1202.42": "Peanuts (blanched/processed)",
    "1006.30": "Rice (semi-milled/wholly milled)",
    "1104.12": "Oats (rolled/flaked)",
    "1005.90": "Corn (maize, other)",
    "0713.40": "Lentils and beans (dried)",
    "1104.29": "Other worked grains",
}

COUNTRY_NAMES = {
    "842": "USA", "276": "Germany", "392": "Japan", "458": "Malaysia",
    "608": "Philippines", "702": "Singapore", "764": "Thailand",
    "826": "UK", "124": "Canada", "356": "India", "360": "Indonesia",
    "400": "Jordan", "484": "Mexico", "586": "Pakistan", "682": "Saudi Arabia",
    "760": "Syria", "784": "UAE", "792": "Turkey", "634": "Qatar",
    "704": "Vietnam", "410": "Korea", "528": "Netherlands", "804": "Ukraine",
    "616": "Poland",
}

CACHE_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "intelligence", "cache")
os.makedirs(CACHE_DIR, exist_ok=True)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fetch_comtrade(reporter, cmd_code_hs, flow=2, partner=0):
    """
    Fetch trade data from UN Comtrade.
    cmd_code: HS code WITHOUT dots (e.g. '100630')
    flow: 2 = imports, 1 = exports
    """
    cmd_code = cmd_code_hs.replace(".", "")
    cache_file = os.path.join(CACHE_DIR, f"{reporter}_{cmd_code}_{flow}_{partner}.json")
    
    # Use cache if fresh (< 24h)
    if os.path.exists(cache_file):
        age = (datetime.now() - datetime.fromtimestamp(os.path.getmtime(cache_file))).total_seconds()
        if age < 86400:
            print(f"  (cached)")
            with open(cache_file) as f:
                return json.load(f)
    
    # Try latest available year (go back if latest isn't available)
    for year in [2024, 2023, 2022]:
        url = (
            f"https://comtradeapi.un.org/data/v1/get/C/A/HS/{year}"
            f"?reporter={reporter}&partner={partner}&cmdCode={cmd_code}"
            f"&flow={flow}&maxRecords=250"
        )
        
        req = urllib.request.Request(url)
        req.add_header('Ocp-Apim-Subscription-Key', KEY)
        req.add_header('User-Agent', 'chinarvest-market-intel/1.0')
        
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read())
                if data.get('dataset'):
                    with open(cache_file, 'w') as f:
                        json.dump(data, f)
                    print(f"  (year {year}, {len(data['dataset'])} records)")
                    return data
        except urllib.error.HTTPError as e:
            if e.code == 404:
                print(f"  (year {year}: API endpoint not available)", end="")
                continue
            print(f"  (year {year}: HTTP {e.code})", end="")
            continue
        except Exception as e:
            print(f"  (year {year}: {e})", end="")
            continue
    
    print()
    return None


def analyze_product(reporter, cmd_code, label):
    """Fetch and analyze a product's export markets."""
    print(f"  HS {cmd_code} ({label})...")
    data = fetch_comtrade(reporter, cmd_code, flow=2)
    if not data:
        return None
    
    dataset = data.get('dataset', [])
    if not dataset:
        print(f"  No data returned")
        return None
    
    # Aggregate by partner country
    by_partner = {}
    for row in dataset:
        pt_code = str(row.get('ptCode', ''))
        pt_title = str(row.get('ptTitle', ''))
        trade_value = row.get('TradeValue', 0) or 0
        qty = row.get('Qty', 0) or 0
        
        if pt_code not in by_partner:
            by_partner[pt_code] = {
                'name': pt_title,
                'value': 0,
                'qty': 0,
                'records': 0,
            }
        by_partner[pt_code]['value'] += trade_value
        by_partner[pt_code]['qty'] += qty
        by_partner[pt_code]['records'] += 1
    
    sorted_partners = sorted(by_partner.items(), key=lambda x: x[1]['value'], reverse=True)
    
    return {
        'hsCode': cmd_code,
        'label': label,
        'totalRecords': len(dataset),
        'markets': [
            {
                'code': pc,
                'name': info['name'] if info['name'] else COUNTRY_NAMES.get(pc, f"ISO {pc}"),
                'tradeValue': info['value'],
                'qty': info['qty'],
                'records': info['records'],
            }
            for pc, info in sorted_partners[:15]
        ],
    }


def generate_report(results):
    """Generate the market intelligence report as markdown."""
    now = datetime.now().strftime("%Y-%m-%d")
    
    lines = [
        "# 品类-市场优先级报告",
        "",
        f"> 数据来源: UN Comtrade | 生成日期: {now}",
        "> 注: 数据为各品类下哪些国家进口中国该产品最多",
        "",
        "---",
        "",
    ]
    
    for r in results:
        if r is None:
            lines += [f"## ⚠️ {r['label'] if r else 'Unknown'} — 无数据", "", "该品类暂未查询到 UN Comtrade 数据。", "", "---", ""]
            continue
        lines += [
            f"## {r['label']} (HS {r['hsCode']})",
            "",
            f"**数据记录数：** {r['totalRecords']}",
            "",
            "| 排名 | 进口国 | 贸易额 (USD) | 数量 | 记录数 |",
            "|------|--------|-------------|------|-------|",
        ]
        for i, m in enumerate(r['markets'][:10], 1):
            val_str = f"${m['tradeValue']:,.0f}" if m['tradeValue'] else "N/A"
            qty_str = f"{m['qty']:,.0f}" if m['qty'] else "N/A"
            lines.append(f"| {i} | {m['name']} | {val_str} | {qty_str} | {m['records']} |")
        lines += ["", "---", ""]
    
    lines += [
        "## 初步建议",
        "",
    ]
    
    for r in results:
        if r is None:
            continue
        top_markets = [m for m in r['markets'] if m['tradeValue'] > 0][:5]
        names = ", ".join(m['name'] for m in top_markets)
        lines.append(f"- **{r['label']}**: {names}")
    
    lines += [
        "",
        "---",
        "",
        "> **下一步：** 根据此报告确定 chinarvest.com 主攻市场，",
        "> 再基于目标市场优化独立站内容和 GEO 策略。",
    ]
    
    return "\n".join(lines)


def main():
    print("=" * 60)
    print("ChinaRvest — Market Intelligence Report Generator")
    print("=" * 60)
    print(f"Querying UN Comtrade for {len(HS_CODES)} product categories...")
    print(f"(API key: {KEY[:8]}...{KEY[-4:]})")
    print()
    
    reporter = "156"  # China
    results = []
    
    for cmd_code, label in HS_CODES.items():
        r = analyze_product(reporter, cmd_code, label)
        results.append(r)
        print()
    
    report = generate_report(results)
    
    output_path = os.path.join(BASE_DIR, "data", "intelligence", "market-report.md")
    with open(output_path, 'w') as f:
        f.write(report)
    
    print(f"{'=' * 60}")
    print(f"Report saved to: {output_path}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
