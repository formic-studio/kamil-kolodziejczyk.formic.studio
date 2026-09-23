# kamil-kolodziejczyk.formic.studio

Portfolio built with Astro and Sanity.

## Structure

- `web/` - Astro website
- `studio/` - Sanity Studio

The legacy Webflow export is kept outside this repository and is used only as a migration reference.

## Content environments

- local development and staging use the public `staging` dataset
- production uses the public `production` dataset

Copy `web/.env.example` to `web/.env` for local development. Secrets must not be committed.

## Commands

```sh
npm install
npm run dev:web
npm run dev:studio
npm run build
```
