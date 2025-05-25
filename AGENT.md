# BLUF Journal Worker

This Cloudflare Worker project implements a simple BLUF-style journal. Each authenticated user is mapped to a dedicated Durable Object that stores their log entries. Authentication relies on Cloudflare Access so the Worker only checks the `cf-access-authenticated-user-email` header.

## Core Files

- `src/worker.ts` – Main Worker script. Routes `/add` and `/list` to the user's `UserLog` Durable Object based on their email. Serves static assets from `public/` for all other paths.
- `src/userLog.ts` – Durable Object handling storage of BLUF entries. Supports `POST /add` to add an entry and `GET /list` to list entries.
- `public/index.html` – Minimal frontend allowing users to create and list entries.
- `scripts/setup.sh` – Bash script that installs dependencies and builds the project so it can be used offline.
- `wrangler.toml` – Worker configuration with Durable Object binding and static site bucket.
- `package.json` and `tsconfig.json` – Project tooling and TypeScript settings.
- `.github/workflows/ci.yml` – CI workflow that runs `npm run build` on pushes to `main`.

## Local Development

Run `npm run dev` to start `wrangler dev --local`, which uses Cloudflow to emulate Durable Objects locally.

The frontend could be moved to Cloudflare Pages while keeping the Worker endpoints if desired.
