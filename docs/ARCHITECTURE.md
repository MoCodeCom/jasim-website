# Jasim AlFadhel website: architecture

## Goals

1. Show the artwork first; the interface stays quiet.
2. Treat Arabic and English as equals, including right-to-left layout.
3. Load fast and rank well, with complete HTML on every page.
4. Stay cheap and safe to run, with nothing to patch but the site itself.

## System

```
content files (src/app/content)
        |
Angular 21 build ---> prerendered HTML + JS + fonts
        |
Express server (src/server.ts): static files, 404 rendering
        |
CDN (recommended) ---> visitors
```

There is no database, login or admin area. Content changes are made in version-controlled
files and go live with a redeploy. An admin dashboard or headless CMS can be added later by
replacing the content files with API calls; the page components would not need to change.

## Structure

| Path | Responsibility |
| --- | --- |
| `src/app/content/` | Everything editable: artist details, works, exhibitions |
| `src/app/core/language.ts` | Current language, `lang`/`dir` attributes, interface text |
| `src/app/core/ui-text.ts` | Interface strings in both languages |
| `src/app/core/seo.ts` | Title, description, canonical, hreflang, Open Graph, robots |
| `src/app/shared/` | Reusable artwork display and card |
| `src/app/pages/` | One folder per route |

## Routes

| URL | Page |
| --- | --- |
| `/` | Redirects to `/en` |
| `/{en,ar}` | Home |
| `/{en,ar}/works` | Works, filterable by medium |
| `/{en,ar}/works/:slug` | Single work |
| `/{en,ar}/about` | Biography and statement |
| `/{en,ar}/exhibitions` | Exhibition history |
| `/{en,ar}/contact` | Enquiry form |

All known URLs are prerendered. Anything else is rendered on the server with a 404 status.

## Key decisions

- **Language in the URL.** Each language has its own address, so both can be shared and indexed.
- **Runtime language lookup instead of Angular's build-time i18n.** One build, and one typed
  content file holding both languages side by side, which is easier for a non-developer to edit.
- **CSS logical properties only** (`margin-inline-start`, not `margin-left`), so Arabic layout
  mirrors without separate styles.
- **Self-hosted fonts.** No third-party requests, which helps both speed and privacy.
- **Enquiries through the visitor's email app.** The form opens a pre-filled email, so there is
  no mail service, spam store or personal data to look after. If enquiry volume grows, replace
  it with an `/api` endpoint in `src/server.ts`.

## Design direction: modern museum

Follows the visual style of [Neue Galerie New York](https://www.neuegalerie.org/), as requested.
Its logo, images and proprietary fonts are not used.

- **Colour:** black and white, with deep teal `#174248`, pale mint `#DCE6DE` and gold `#BFA253`
  as full-width blocks and small highlights.
- **Type:** very large bold uppercase Jost headlines; IBM Plex Sans for reading text. Arabic uses
  IBM Plex Sans Arabic throughout.
- **Layout:** full-screen artwork panels stacked down the page, a transparent header with a
  hamburger, and a full-screen menu in large type.
- **Components:** outlined pill buttons, small tracked uppercase labels, and square-edged cards.

## Launch checklist

Everything below is in `src/app/content/site.ts` or `works.ts` unless noted.

- [ ] Have the family check the biography and the open questions in `docs/CONTENT-SOURCES.md`
- [ ] Confirm permission to publish the paintings
- [ ] Replace the descriptive titles and add real titles, materials and dimensions
- [ ] Add exhibition dates and any missing shows
- [ ] Set `email`, `url` and social links
- [ ] Add a favicon (`public/favicon.ico`) and a sharing image
- [ ] Set `launched: true` (this removes the `noindex` tag)
- [ ] Add the production domain to `security.allowedHosts` in `angular.json`
