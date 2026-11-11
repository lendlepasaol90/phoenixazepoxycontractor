# Phoenix AZ Epoxy Contractor

Website for **https://phoenixazepoxycontractor.com**: a static site with no framework, built by a small Node script and served by a Cloudflare Worker that also handles the estimate forms.

## Quick start

```bash
npm install          # installs wrangler (the only dependency)
npm run check        # builds ./dist and runs link / metadata / word-count checks
npm run dev          # local preview with the real Worker at http://localhost:8787
npm run deploy       # builds and deploys to Cloudflare Workers
```

`wrangler deploy` runs the build automatically (see `build.command` in `wrangler.jsonc`), so a Git-connected Cloudflare deployment needs no extra build settings.

## Before going live: replace the placeholders

Everything business-specific is in **`src/site.config.mjs`**:

| Setting | Current value | What to do |
|---|---|---|
| `phone.display` / `phone.href` | `(XXX) XXX-XXXX` | Add the real number and a `tel:` link, then set `isPlaceholder: false` |
| `email.display` / `email.href` | `email@your-domain.com` | Add the real address and a `mailto:` link, then set `isPlaceholder: false` |
| `hours` | `Hours to be confirmed` | Business hours |
| `address` | `null` | Leave `null` unless there is a verified street address. When set, it is added to the LocalBusiness schema |

When `isPlaceholder` is `false`, the phone and email also appear in the structured data automatically.

**Logo:** the header and footer show a dashed `Logo` slot (`.logo__slot` in `src/static/site.css`). Replace that `<span>` in `src/lib/layout.mjs` with an `<img>` once the logo is supplied. The slot is sized for a horizontal logo about 130×46px.

**Favicon:** add `favicon.ico`, `icon.svg` and `apple-touch-icon.png` to `public/` and add the `<link>` tags in `head()` in `src/lib/layout.mjs`.

## Estimate form delivery

All forms post to `/api/estimate`, which the Worker (`worker/index.js`) validates, filters for spam with a honeypot field, and then delivers. Set one or more of these in **Cloudflare dashboard → Workers & Pages → phoenixazepoxycontractor → Settings → Variables and secrets**:

| Variable | Purpose |
|---|---|
| `LEAD_WEBHOOK_URL` | POSTs each lead as JSON to any webhook (Zapier, Make, a CRM, a Slack workflow, Google Apps Script) |
| `RESEND_API_KEY` + `LEAD_TO_EMAIL` | Emails each lead through [Resend](https://resend.com). Optional `LEAD_FROM_EMAIL` once a sending domain is verified |
| `LEADS` (KV binding) | Optional. Stores every lead in a KV namespace (see the commented block in `wrangler.jsonc`) |

Every submission is also written to the Worker logs (`observability` is on), so no lead is lost before delivery is configured. Visitors without JavaScript get a normal form POST that redirects to `/thank-you/`.

## Custom domain

In the Worker's **Settings → Domains & Routes**, add `phoenixazepoxycontractor.com` and `www.phoenixazepoxycontractor.com` as custom domains. The Worker redirects `www` to the apex domain.

## Project structure

```
src/
  site.config.mjs          business details, project types, service areas
  build.mjs                renders every page to dist/, plus sitemap.xml, robots.txt, _headers
  lib/layout.mjs           <head>, header, services menu, estimate drawer, footer and map
  lib/components.mjs       images, forms, breadcrumbs, FAQ, before/after slider, layer diagram
  lib/blocks.mjs           section types used by the service pages
  content/home.mjs         homepage
  content/pages.mjs        services overview, about, service areas, gallery, contact, privacy, 404
  content/shared.mjs       before/after pairs used on several pages
  content/services/*.mjs   one file per service page (13 in total)
  static/site.css|js       styles and progressive-enhancement script
public/images/             responsive WebP images (480 / 960 / 1600 / 2200 widths)
public/fonts/              self-hosted Archivo and Source Serif 4 (SIL Open Font License)
worker/index.js            Cloudflare Worker: static assets and /api/estimate
scripts/check.mjs          post-build QA: broken links, missing images, H1s, duplicate titles, word counts
```

### Adding or editing a service page

Each service is one object in `src/content/services/`. Add the file, import it in `services/index.mjs`, and it automatically appears in the Services dropdown, the footer, the services overview page, the sitemap, and its own Service, Breadcrumb and FAQ schema. Run `npm run check` to confirm links and metadata.

## Images

- Photos are licensed stock from Envato Elements, color-graded slightly warmer for consistency.
- Files named `render-*` are original 3D renders (Blender) showing the **same room** before and after a coating. They are labeled on the site as rendered illustrations.
- The site never presents stock or rendered images as completed company projects. Replace or supplement them with real project photos as jobs are documented. Keep the slug and generate the 480/960/1600 widths, and add the slug and aspect ratio to `src/image-manifest.json`.

## Pages

| URL | Page |
|---|---|
| `/` | Homepage |
| `/services/` | Services overview |
| `/epoxy-flooring-phoenix-az/` | Epoxy Flooring |
| `/residential-epoxy-flooring/` | Residential Epoxy Flooring |
| `/garage-epoxy-flooring/` | Garage Epoxy Flooring |
| `/commercial-epoxy-flooring/` | Commercial Epoxy Flooring |
| `/industrial-epoxy-flooring/` | Industrial Epoxy Flooring |
| `/metallic-epoxy-flooring/` | Metallic Epoxy Flooring |
| `/decorative-flake-epoxy-flooring/` | Decorative Flake Epoxy Flooring |
| `/polyaspartic-floor-coatings/` | Polyaspartic Floor Coatings |
| `/polyurea-floor-coatings/` | Polyurea Floor Coatings* |
| `/concrete-floor-coatings/` | Concrete Floor Coatings |
| `/concrete-floor-preparation-repair/` | Concrete Floor Preparation & Repair |
| `/patio-concrete-coatings/` | Patio & Concrete Coatings* |
| `/warehouse-floor-coatings/` | Warehouse Floor Coatings* |
| `/about-us/`, `/service-areas/`, `/gallery/`, `/contact/`, `/privacy-policy/` | Supporting pages |

\* Added to match services offered on the Paradise Valley reference site.
