---
title: Releasing V7
---

# Releasing V7

LOSPOR V7 is released in dependency and service order. Do not deploy web or
PWA before the API is healthy on its production domain.

## Repository order

1. Commit, tag, and push Core first (for this release, `v7.3.0`).
2. Update API, web, mobile/PWA, and Database Browser to that immutable Core tag;
   refresh lockfiles and verify clean installs.
3. Commit and tag web, mobile/PWA, Database Browser, and docs.
4. Commit the API release manifest with the exact six tags.
5. Push the API tag last. Its tag event automatically runs the cross-repository
   release gate against those immutable refs.

The gate can also be run manually before tags as a preflight. It performs clean
installs, migrates a temporary PostgreSQL database, runs real concurrency and
export tests, builds every repository, exercises critical web and PWA flows,
and produces an Android export. A failed automatic tag gate blocks deployment
and release promotion; correct the release and create a new patch tag rather
than moving a published tag.

## API deployment

Create a separate Vercel project from `lospor-api`. Configure its database,
direct migration URL, shared auth secret, email, AI, CORS, cron, option
snapshot, and OMOP settings. Secrets belong only to the API project.

Deploy to the temporary Vercel address first. Verify:

```text
/health/live
/health/ready
/v1/capabilities
/openapi.json
```

Then attach `api.lospor.org`, wait for HTTPS, and repeat the checks against the
production domain. The API build runs `prisma migrate deploy`; never use
`prisma db push` in production.

## Client deployment

After API health and authentication pass:

1. Deploy web with
   `LOSPOR_API_INTERNAL_URL=https://api.lospor.org`.
2. Deploy PWA with
   `EXPO_PUBLIC_API_BASE=https://api.lospor.org`.
3. Verify login, case listing, search, one case save, and the legacy web
   `/api/*` compatibility path.
4. Build the Android APK/AAB only after the live service checks pass.

## Rollback

Keep the V6 production deployments and `v6.0.0` tags available. If API V7
fails before clients are switched, leave web/PWA on V6. If clients have
already switched, roll API and clients back together so their contracts remain
aligned.
