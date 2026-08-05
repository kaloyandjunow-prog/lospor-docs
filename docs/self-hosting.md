---
sidebar_position: 4
title: Self-hosting
---

# Self-hosting

There are two ways to run LOSPOR on your own infrastructure, and they are not
equivalent.

**If you are a hospital, use the appliance.** It is a packaged install with a
bundled PostgreSQL, TLS, backups, health checks and a supported update path.
The rest of this page — three services started by hand — is for evaluating the
software, not for running a clinical service on it.

## The hospital appliance

`lospor-hospital` is a self-contained bundle: the API, the web app, the PWA and
the Research Browser, pinned to reviewed upstream versions recorded in
`UPSTREAM_VERSIONS.json`, with PostgreSQL alongside them.

```sh
./scripts/install.sh
```

That creates the database, applies migrations, generates secrets, creates the
first administrator, and brings the services up behind TLS.

| Task | Command |
|---|---|
| Update to a newer bundle | `./scripts/update.sh` |
| Take a backup | `./scripts/backup-now.sh` |
| Restore one | `./scripts/restore-backup.sh` |
| Check a running install | `./scripts/doctor.sh` |
| Enrol with a central registry | `./scripts/enrol-central.sh` |

Its own documentation covers installation, backup and restore, operations,
security and update compatibility in more depth than this page does. Start
there rather than here.

---

## Running from source

For evaluation, development, or an institution that has decided to operate the
services itself. Everything below assumes you are comfortable running a
production Node.js service: this page describes the application, not how to
administer a server.

LOSPOR is three Node.js services and one PostgreSQL database. They may run on
one machine:

- `lospor-api`, default port `3002`
- `lospor-app`, default port `3000`
- `lospor-browser`, default port `3003`
- PostgreSQL

The mobile app is installed on phones; it is not a fourth server.

### Requirements

- Node.js 20 or later
- PostgreSQL
- the `lospor-api`, `lospor-app`, `lospor-browser`, and `lospor-mobile` repositories
- one tagged `@lospor/core` version used by every consumer
- a reverse proxy terminating TLS, and a process manager — see
  [Running it properly](#running-it-properly)

### 1. Configure the API

In `lospor-api`, create `.env.local` from `.env.example`. At minimum set:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
LOSPOR_AUTH_SECRET="a-long-random-secret"
NEXTAUTH_SECRET="the-same-secret"
LOSPOR_WEB_URL="http://localhost:3000"
CORS_ALLOW_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3003"
RESEARCH_EXPORT_STORAGE_DRIVER="filesystem"
RESEARCH_EXPORT_STORAGE_DIR=".data/research-exports"
RESEARCH_EXPORT_WORKER_SECRET="another-long-random-secret"
RESEARCH_EXPORT_RETENTION_DAYS="30"
```

`DIRECT_URL` must be a direct/session connection that supports PostgreSQL row
locks and transactions; do not point it at a transaction-only pooler. Keep the
research export directory private and include it in encrypted server backups
only if your institutional retention policy requires that.

Keep `NEXTAUTH_SECRET` equal to `LOSPOR_AUTH_SECRET` during the V6
compatibility period so existing mobile bearer tokens can be verified.

Optional API settings cover Brevo email, Mistral AI, OMOP pseudonymization,
PDF browser location, catalog snapshots, and the retention cron.

### 2. Prepare the database

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

### Paediatric mode

Paediatric dosing is **off unless you turn it on**, and it takes two switches,
not one:

```env
PEDIATRIC_MODE_ENABLED="true"
```

That alone is not enough. The API also requires a `@lospor/core` version in
which `PEDIATRIC_PRODUCTION_READY` is `true` — a clinical sign-off asserting the
paediatric drug profiles have been reviewed as fit to calculate a dose for a
real child. Both must hold:

```text
pediatricModeEnabled = PEDIATRIC_PRODUCTION_READY && PEDIATRIC_MODE_ENABLED === "true"
```

Check what a running install actually resolved:

```bash
curl http://localhost:3002/v1/capabilities
```

`features.pediatricMode` reports `enabled`, `productionReady` and the ruleset
version in force. If `enabled` is `false`, paediatric cases are refused with
`503 PEDIATRIC_MODE_DISABLED` and no paediatric doses are offered.

You must also seed the platform clinical rulesets and select the paediatric one.
Without them paediatric mode resolves to no ruleset and offers no doses at all,
while still reporting itself healthy — verify with
`npm run clinical-rules:verify-pediatric-v2` rather than assuming.

### 3. Create the first administrator

A fresh database has institutions and no users. Registration produces an
unapproved member, and only an administrator can approve or promote anyone, so
without this step nobody can get in.

```bash
cd lospor-api
LOSPOR_BOOTSTRAP_ADMIN_EMAIL="you@hospital.example" \
LOSPOR_BOOTSTRAP_ADMIN_PASSWORD="..." \
LOSPOR_BOOTSTRAP_ADMIN_FIRST_NAME="..." \
LOSPOR_BOOTSTRAP_ADMIN_LAST_NAME="..." \
npm run bootstrap:admin
```

It sets the role, the approval and the verified address together, and refuses
to run once an administrator exists. Do not try to do this by editing the
database: setting `role` alone leaves the account unverified and unable to sign
in.

Everyone else registers themselves, verifies their email address, and chooses
their institution. Changing institution afterwards needs approval from an
administrator or from the head of the department being joined.

### 4. Build and start the services

Build once, then run the built output. `npm run dev` is a development server:
it is slower, it rebuilds on every request, and it is not meant to face a
network.

```bash
cd lospor-api    && npm ci && npm run build && npm start   # :3002
cd lospor-app    && npm ci && npm run build && npm start   # :3000
cd lospor-browser && npm ci && npm run build && npm start  # :3003
```

Verify the API before starting anything that depends on it:

```bash
curl http://localhost:3002/health/live    # process is up, reports the version
curl http://localhost:3002/health/ready   # database is reachable too
```

Web and the Research Browser hold no database credentials. Only the API gets
`DATABASE_URL`, `DIRECT_URL` and the signing secret.

### Running it properly

Nothing above survives a reboot, and none of it is encrypted in transit. At
minimum:

- **A process manager** — systemd units, or the container runtime of your
  choice — so the services restart on failure and come back after a reboot.
- **A reverse proxy terminating TLS** in front of all three: nginx, Caddy, or
  whatever your institution already runs. Clinical data must not cross a
  hospital network in clear text, and browsers will not grant a service worker
  or camera access to an insecure origin, so the PWA and lab scanning need it
  regardless.
- **Bind the services to localhost** and let the proxy be the only thing
  listening publicly.
- **Scheduled jobs** — see [Data retention](#data-retention). Nothing runs them
  for you outside Vercel.

The appliance does all of this already, which is the argument for using it.

### 5. Connect Expo locally

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

Only the API project runs `prisma migrate deploy`, account-retention jobs,
and the research export worker/cleanup schedule. Web
must never receive `DATABASE_URL`, `DIRECT_URL`, or the API signing secret.

Deploy API first, verify health and login, then deploy web. Configure mobile
and PWA with:

```env
EXPO_PUBLIC_API_BASE="https://api.lospor.org"
```

## Backups

A backup you have never restored is a hypothesis, not a backup. All three steps
matter.

### Take one

```bash
pg_dump --format=custom --file="lospor-$(date +%F).dump" "$DATABASE_URL"
```

Use the custom format: it restores selectively and compresses. Note the
PostgreSQL version you dumped with — `pg_restore` will not read a dump from a
newer major version.

Back up the research export directory
(`RESEARCH_EXPORT_STORAGE_DIR`) alongside it if your retention policy requires
the artifacts themselves. Both contain clinical data and belong in encrypted
storage.

### Restore one

Never restore over a live database. Restore into a scratch one and look at it
first:

```bash
createdb lospor_restore_check
pg_restore --dbname=lospor_restore_check --no-owner "lospor-2026-08-05.dump"
```

### Verify it

Restoring without error only proves the file parsed. Check the data is there:

```sql
SELECT count(*) FROM "Case";
SELECT count(*) FROM "CaseEvent";
SELECT count(*) FROM "User";
SELECT count(*) FROM _prisma_migrations WHERE finished_at IS NOT NULL;
```

Compare the counts against production. The migration count matters as much as
the row counts: a restore that is one migration behind the code will fail in
ways that look like application bugs.

Do this on a schedule, not only when you need it.

## Updates and rollback

**Take and verify a backup before any migration.** Then deploy in this order:
Core, API, web, Database Browser, then mobile and the PWA. The API must be live
and healthy before web, because web calls it and not the reverse.

Rehearse migrations against a restored copy of production rather than trusting
them. This is not ceremony: rehearsing the v8.0.0 batch is what revealed that
one of its migrations seeded a published-but-empty clinical ruleset which then
took precedence over the real one, leaving paediatric dosing silently switched
off while every health check reported success.

Keep the previous API and web artifacts available until the new clients have
completed a cross-device case test.

The web `/api/*` proxy supports V6 clients for the documented compatibility
window. Removing it early would break old installed applications.
## Data retention

The API's `vercel.json` calls `/v1/internal/purge-deleted` nightly. Non-Vercel
installations must call the same endpoint from their scheduler with:

```text
Authorization: Bearer <CRON_SECRET>
```

The endpoint refuses to run when the secret is absent or wrong.

Non-Vercel installations must also schedule
`/v1/internal/research-exports/process` with
`Authorization: Bearer <RESEARCH_EXPORT_WORKER_SECRET>`. That job processes
queued exports, removes abandoned private working objects, and deletes
downloadable artifacts after `RESEARCH_EXPORT_RETENTION_DAYS`. Export metadata
and checksums remain for audit and reproducibility.

## Licence

LOSPOR is AGPL-3.0-or-later. Organizations that modify and provide the
networked software must meet the license's source-availability requirements.
