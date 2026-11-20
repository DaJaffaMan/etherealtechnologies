# Ethereal Technologies Corporate Site

The official corporate web platform, consultancy storefront, and product showcase for **Ethereal Technologies** (Bristol, UK).

Rebuilt with **SolidJS 2.0**, **Vite 8**, **Tailwind CSS v4**, and **Static Site Generation (SSG)**, hosted on **Google Cloud Storage (GCS)** and delivered globally via **Cloudflare** (DNS, SSL, CDN, and Edge Workers).

---

## Site Structure & Positioning

Ethereal Technologies operates as a **principal-led software consultancy & product studio** — pairing senior cloud/application consultancy with our flagship in-house product, **[Agora](https://agora.cleaning)**.

Prerendered routes (`build/`):

* `/` (`index.html`): Principal-led consultancy positioning, client trust strip, 4 core service pillars, Agora flagship spotlight, selected client work preview, and studio credentials.
* `/agora` (`agora/index.html`): Deep dive into the Agora cleaning marketplace (live on web & Google Play, onboarded cleaners, multi-party Stripe Connect, and the Flutter + NestJS + GraphQL + Neo4j + GCP/Terraform architecture).
* `/work` (`work/index.html`): Interactive capability filtering across 5 detailed client case studies (Costain, Octopus Energy Hydrogen, Homelink, Sero, Superdry) plus an expandable 13-engagement engineering track record (2013–Present).
* `/about` (`about/index.html`): Studio working principles, founder profile (Jack Jefferies), cloud certifications (AWS, GCP, Neo4j), and languages.
* `/contact` (`contact/index.html`): Structured consultancy inquiry form (engagement type, timeline, project context) compiling a `mailto:` draft, accessible post-interaction validation, and one-click email copy.
* `/404.html` & `/sitemap.xml`: Static 404 page and SEO sitemap generated automatically at build time.

---

## Architecture & Infrastructure

```
Client Browser
   │  HTTPS
   ▼
Cloudflare Edge (DNS, SSL, CDN)
   │
   ▼
Cloudflare Worker (ethereal-gcs-proxy)
   ├─ 301 apex (etherealtechnologies.co.uk) → https://www.etherealtechnologies.co.uk
   ├─ Extensionless SSG routes (/agora → /agora/index.html)
   ├─ Static assets passthrough (.js, .css, .png, .svg, etc.)
   └─ Unknown routes → /404.html (HTTP 404)
   │
   ▼
GCS Static Origin Bucket (ethereal-technologies-corporate-site)
```

* **Frontend**: SolidJS 2.0 (`solid-js`, `@solidjs/web`, `@solidjs/router`, `@solidjs/meta`), TypeScript (strict), Tailwind CSS v4.
* **Prerendering (SSG)**: Vite 8 (`@solidjs/vite-plugin` Start SSR mode with `renderMode: "async"`) + `scripts/prerender.mjs` rendering every route to static HTML with per-route `<title>`, meta/OG tags, canonical URLs, and JSON-LD structured data.
* **Testing**: Vitest (`jsdom`) covering theme override rules, contact form/mailto utilities, route rendering, reactive filters, and disclosure controls.
* **IaC & CI/CD**: Terraform (`terraform/`) + GitHub Actions (`.github/workflows/deploy.yml`) running `typecheck`, `test`, `build`, `terraform apply`, and GCS artifact sync.

---

## Prerequisites

* **Node.js**: v22+ (`22.20.0` in `.tool-versions`, required by `solid-js@2.0.x`)
* **pnpm**: v9+ (`9.1.0` in `.tool-versions`)
* **Terraform**: v1.5.7+

---

## Local Development

1. **Install dependencies**:
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Start the local development server**:
   ```bash
   pnpm dev
   ```

3. **Typecheck**:
   ```bash
   pnpm run typecheck
   ```

4. **Run unit & component tests**:
   ```bash
   pnpm test
   ```

5. **Create the prerendered production build (`build/`)**:
   ```bash
   pnpm run build
   ```
   This builds client and server bundles (`dist/client`, `dist/server`) and runs `node scripts/prerender.mjs` to emit static HTML, `404.html`, and `sitemap.xml` into `build/`.

---

## Infrastructure Management (Terraform)

All infrastructure is defined in `terraform/`:

* `main.tf`: GCP & Cloudflare providers, static GCS bucket, public IAM read rules.
* `cloudflare.tf`: Cloudflare DNS zone, Apex/WWW CNAMEs, Google Workspace MX/SPF/DMARC, verification TXT records, and `dev.agora` NS delegation.
* `worker.tf`: `ethereal-gcs-proxy` Cloudflare Worker handling apex-to-www 301 redirect, SSG route `/index.html` resolution, and 404 handling.
* `state_bucket.tf`: Versioned GCS bucket for remote Terraform state.

To plan infrastructure changes locally:

```bash
cd terraform
terraform init
terraform plan -var="cloudflare_api_token=<YOUR_CLOUDFLARE_TOKEN>"
```
