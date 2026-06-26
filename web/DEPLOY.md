# chinarvest.com — Deploy Guide

## Prerequisites

- Node.js 18+
- npm
- **GitHub repository:** `github.com/microfeel/chinarvest`
- **Cloudflare account** (for DNS + Pages — free tier works)
- **Domain:** `chinarvest.com` (already registered on Cloudflare)

## Local Development

```bash
cd web
npm install
npm run dev
```

Visit http://localhost:3000

## Build (static export)

```bash
cd web
npm run build
```

Output goes to `out/` directory. Works with any static host.

## Deploy to Cloudflare Pages (Recommended)

### Step 1: Connect GitHub

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages** → **Pages**
3. Click **Connect to Git**
4. Select `microfeel/chinarvest`

### Step 2: Build settings

| Setting | Value |
|---------|-------|
| Framework preset | **Next.js** (or choose None) |
| Root directory | `/web` |
| Build command | `npm run build` |
| Build output directory | `out/` |
| Node.js version | 22 |
| Environment variables (optional) | (none needed) |

### Step 3: Deploy

Click **Save and Deploy**. Cloudflare will:
1. Install dependencies
2. Run the prebuild script (generates sitemap.xml)
3. Build the Next.js static export
4. Deploy to a `chinarvest.pages.dev` preview URL

### Step 4: Custom domain

1. In the Pages project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter `chinarvest.com`
4. Cloudflare auto-configures DNS (CNAME records)

Done. HTTPS, CDN, and auto-deploy on every git push.

## Alternative: Deploy to any static host

The `out/` directory is a fully static site. Upload it to:

- **GitHub Pages** — push `out/` to `gh-pages` branch
- **Nginx/Apache** — serve `out/` as the document root
- **S3/CloudFront** — sync `out/` to an S3 bucket
- **Any web server** — just copy the files

## Adding Products

1. Create a new JSON file in `data/products/`
2. Follow the existing template structure
3. Commit and push — Cloudflare Pages auto-rebuilds

## Data Flow

```
Edit data/products/*.json  →  git push  →  Cloudflare Pages auto-build
         ↓
   Static HTML pages served via Cloudflare CDN
```
