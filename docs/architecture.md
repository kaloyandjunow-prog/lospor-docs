---
title: Application architecture
---

# Application architecture

LOSPOR v7 is split into six repositories:

- **API (`lospor-api`)** owns HTTP behavior, authentication, PostgreSQL,
  Prisma migrations, email, AI providers, PDF rendering, audit data, and OMOP
  persistence/export.
- **Web (`lospor-app`)** owns the Next.js browser interface. It has no database
  credentials and does not import Prisma.
- **Mobile/PWA (`lospor-mobile`)** owns the Expo clinical interface and offline
  device storage.
- **Core (`lospor-core`)** owns framework-free clinical rules, catalogs,
  validation, synchronization protocols, and shared data contracts.
- **Database (`lospor-browser`)** owns the standalone research, quality, and benchmarking interface. It has no database credentials and consumes only governed API projections.
- **Docs (`lospor-docs`)** owns user, administrator, and developer guidance.

## Request flow

New clients use the versioned API directly:

```text
Web / Mobile / PWA -> https://api.lospor.org/v1 -> PostgreSQL
Database Browser -> https://api.lospor.org/v1/research -> PostgreSQL
```

During the V6 compatibility period, requests to the old web address are
forwarded without reimplementing the endpoint:

```text
V6 client -> https://app.lospor.org/api/* -> https://api.lospor.org/v1/*
```

The compatibility proxy is intended to remain for 12 months after the V7
production release. It gives installed mobile versions time to update. It does
not mean every old behavior is copied into the web application.

## Authentication

The API is the authority for login and account state. Native clients use a
signed bearer token. Browser clients use the same API-owned session token in
an HttpOnly cookie. Role changes, account deletion, password resets, and token
revocation are checked against the live account.

The first V7 release supports first-party LOSPOR clients. The API is structured
and documented for future integrations, but third-party client registration
and scoped credentials are not enabled yet.

## Shared clinical domain

Core owns rules that must produce the same clinical answer on every client:

- clinical catalogs, aliases, trees, profiles, and offline fallback;
- laboratories, ICD-10 systems, ASA suggestions, and risk bands;
- clinical limits, validation, readiness, finalization, Aldrete, and handover;
- monitoring, airway, technique, and option metadata;
- timetable projection, active infusions/fluids/gases/agents, totals, and
  semantic event descriptions;
- status derivation, account policy, search contracts, units, and summaries;
- option caching, locks, polling, revision/conflict handling, and autosave
  decisions; and
- API version, capability, error, health, and session contracts.

Core has no React, Expo, Next.js, Prisma, storage, or network implementation.
Clients keep translations, layout, animation, haptics, and device storage. The
API keeps database queries and external service adapters.

## Locking and offline safety

The API acquires case-editing leases with one atomic PostgreSQL operation. Two
devices cannot both be told that they acquired the same available lease.
Clients may deliberately remain usable when the lock endpoint is temporarily
unreachable; revision checks still reject stale writes before they overwrite
newer server data.

Offline storage is platform-specific. Native mobile uses the application's
private filesystem. PWA uses IndexedDB so new-case drafts survive reloads and
can synchronize after connectivity returns.

## Deployment boundary

Clinical web, Database Browser, and API are separate deployable services. A web outage does not remove the
API used by installed mobile clients. An API or database outage still prevents
server synchronization, but mobile can retain queued work through its offline
system and send it when service returns.

The API currently supports Vercel/serverless deployment and sets
`output: standalone` for a future local Node/container installation. A local
institution can later run API, web, and PostgreSQL on one physical server; they
are separate processes, not necessarily separate machines.

## Release order

1. Publish and tag Core v7.
2. Update API, web, and mobile to the Core v7 tag and verify clean installs.
3. Apply API-owned database migrations.
4. Deploy the API and verify live/ready health checks and `/v1/capabilities`.
5. Deploy web with its API origin.
6. Release PWA/mobile after end-to-end compatibility tests.

The V6 tags remain the rollback baseline. A release must never point npm at a
developer's local sibling directory.

## Enforced boundaries

Repository checks reject Prisma, database, or authentication implementations
inside web and reject browser/device storage code inside API. API contract
tests require every implemented public operation to have explicit parameters,
request bodies, success responses, errors, authentication, and revision or
idempotency headers where applicable. A cross-repository release gate verifies
clean installs, a real PostgreSQL migration and integration suite, API and
client builds, browser flows, PWA offline recovery, and the Android export.
