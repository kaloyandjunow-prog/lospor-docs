---
sidebar_position: 4
title: Self-hosting
---

# Self-hosting

LOSPOR v7 uses three Node.js services and one PostgreSQL database. They may run
on one physical server:

- `lospor-api`, default port `3002`
- `lospor-app`, default port `3000`
- `lospor-browser`, default port `3003`
- PostgreSQL

The mobile app is installed on phones; it is not a third server.

## Requirements

- Node.js 20 or later
- PostgreSQL
- the `lospor-api` and `lospor-app` repositories
- a tagged `@lospor/core` version used by both services

## 1. Configure the API

In `lospor-api`, create `.env.local` from `.env.example`. At minimum set:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
LOSPOR_AUTH_SECRET="a-long-random-secret"
NEXTAUTH_SECRET="the-same-secret"
LOSPOR_WEB_URL="http://localhost:3000"
CORS_ALLOW_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3003"
```

Keep `NEXTAUTH_SECRET` equal to `LOSPOR_AUTH_SECRET` during the V6
compatibility period so existing mobile bearer tokens can be verified.

Optional API settings cover Brevo email, Mistral AI, OMOP pseudonymization,
PDF browser location, catalog snapshots, and the retention cron.

## 2. Prepare the database

Database commands run only from `lospor-api`:

```bash
cd lospor-api
npm ci
npx prisma migrate deploy
npm run db:seed
npm run seed:icd10-bg
npm run seed:athena
npm run seed:concept-maps
```

Large Athena imports should run from a trusted maintenance machine, not from a
serverless build hook. The seed and backfill scripts are idempotent unless
their own help text states otherwise.

## 3. Start the API

```bash
cd lospor-api
npm run dev
```

Verify:

```bash
curl http://localhost:3002/health/live
curl http://localhost:3002/health/ready
curl http://localhost:3002/v1/capabilities
```

`live` proves the process is running. `ready` also checks the database.

## 4. Configure and start web

In `lospor-app/.env.local`:

```env
LOSPOR_API_INTERNAL_URL="http://localhost:3002"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Then:

```bash
cd lospor-app
npm ci
npm run dev
```

Open `http://localhost:3000`. Web has no database credentials.

## 5. Configure and start the Research Browser

In `lospor-browser/.env.local`:

```env
LOSPOR_API_INTERNAL_URL="http://localhost:3002"
NEXT_PUBLIC_DATABASE_URL="http://localhost:3003"
LOSPOR_DATABASE_ORIGIN="http://localhost:3003"
```

Apply the additive research migration only to the intended local database, then run:

```bash
cd lospor-browser
npm ci
npm run dev
```

Open `http://localhost:3003`. The browser has no database credentials.

## 6. Connect Expo locally

Set the phone-reachable LAN address in `lospor-mobile/.env.local`:

```env
EXPO_PUBLIC_API_BASE="http://192.168.x.x:3002"
```

The phone and server must be on the same network. Restart Expo with a cleared
cache after changing this value.

## Vercel deployment

Create three Vercel projects:

1. `lospor-api` at `api.lospor.org`, with database, auth, email, AI, CORS,
   retention, and OMOP secrets.
2. `lospor-browser` at `database.lospor.org`, with `LOSPOR_API_INTERNAL_URL=https://api.lospor.org` and `LOSPOR_DATABASE_ORIGIN=https://database.lospor.org`. The API also sets `LOSPOR_DATABASE_URL=https://database.lospor.org` and includes it in `CORS_ALLOW_ORIGINS`.
3. `lospor-app` at `app.lospor.org`, with
   `LOSPOR_API_INTERNAL_URL=https://api.lospor.org`.

Only the API project runs `prisma migrate deploy` and the retention cron. Web
must never receive `DATABASE_URL`, `DIRECT_URL`, or the API signing secret.

Deploy API first, verify health and login, then deploy web. Configure mobile
and PWA with:

```env
EXPO_PUBLIC_API_BASE="https://api.lospor.org"
```

## Updates and rollback

Back up PostgreSQL before migrations. Deploy in this order: Core, API, web,
then mobile/PWA. Keep the previous API and web artifacts available until the
new clients have completed a cross-device case test.

The web `/api/*` proxy supports V6 clients for the documented compatibility
window. Removing it early would break old installed applications.

## Data retention

The API's `vercel.json` calls `/v1/internal/purge-deleted` nightly. Non-Vercel
installations must call the same endpoint from their scheduler with:

```text
Authorization: Bearer <CRON_SECRET>
```

The endpoint refuses to run when the secret is absent or wrong.

## Licence

LOSPOR is AGPL-3.0-or-later. Organizations that modify and provide the
networked software must meet the license's source-availability requirements.
