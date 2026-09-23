# kamil-kolodziejczyk.formic.studio

Portfolio zbudowane w Astro i Sanity. Kod nie zależy od Webflow, jQuery ani zewnętrznego pliku animacji.

## Structure

- `web/` - Astro website
- `studio/` - Sanity Studio
- `studio/scripts/importCurrentContent.mjs` - idempotentny import aktualnych treści i obrazów do aktywnego datasetu CLI

The legacy Webflow export is kept outside this repository and is used only as a migration reference.

## Content environments

- local development and staging use the public `staging` dataset
- production uses the public `production` dataset
- Sanity Studio: https://kamil-kolodziejczyk-formic.sanity.studio/

Copy `web/.env.example` to `web/.env` for local development. Secrets must not be committed.

## Commands

```sh
npm install
npm run dev:web
npm run dev:studio
npm run build
npm run build:studio
npm run deploy:studio
```

## Import treści

Domyślnym datasetem w `studio/sanity.cli.ts` jest `staging`. Po zalogowaniu do Sanity:

```sh
npm run import:staging
```

Skrypt można uruchamiać ponownie: dokumenty mają stabilne identyfikatory, a istniejące assety są ponownie wykorzystywane. Dataset `production` pozostaje nietknięty do momentu świadomego uruchomienia publikacji produkcyjnej.

## Publikacja frontu

Build Astro jest statyczny. W środowisku staging ustaw `PUBLIC_SANITY_DATASET=staging` oraz `PUBLIC_SITE_URL` na adres podglądu. W produkcji ustaw `PUBLIC_SANITY_DATASET=production` i docelową domenę. Staging automatycznie otrzymuje `noindex,nofollow`.

Formularze otwierają obecnie lokalną aplikację pocztową (`mailto:`). Nie przeniesiono publicznego webhooka Make z wersji Webflow; docelowy endpoint formularza należy wdrożyć po stronie serwera.
