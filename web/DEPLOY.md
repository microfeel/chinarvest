# chinarvest.com — Deploy Guide

## Prerequisites

- Node.js 18+
- npm
- A Vercel account (free tier works)
- Cloudflare account for DNS

## Local Development

```bash
cd web
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option 2: Vercel Dashboard (Recommended)

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import the `web/` directory
4. Set Framework Preset: Next.js
5. Root Directory: `web`
6. Build Command: `npm run build`
7. Output Directory: `.next`
8. Deploy

## Cloudflare DNS

Once Vercel gives you the deployment URL (e.g., `chinarvest-com.vercel.app`):

| Type | Name | Value |
|------|------|-------|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

Enable Proxy (orange cloud) for SSL and CDN.

## Adding Products

1. Create a new JSON file in `data/products/`
2. Follow the existing template structure
3. Commit and push — Vercel auto-rebuilds

## Data Flow

```
data/products/*.json  →  Next.js SSG build  →  Static HTML pages
        ↑                        ↑
  Edit JSON files          Vercel auto-deploy
```
