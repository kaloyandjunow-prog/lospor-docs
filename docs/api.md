---
title: API
---

# LOSPOR API

The canonical V7 API prefix is `/v1`. A running API exposes:

- `/health/live` for process health
- `/health/ready` for process and database readiness
- `/v1/capabilities` for client compatibility and feature discovery
- `/openapi.json` for the generated endpoint contract

Native clients authenticate with:

```text
Authorization: Bearer <token>
X-LOSPOR-Client: mobile
X-LOSPOR-Client-Version: <version>
```

Browser clients use an API-owned HttpOnly session cookie. Revision,
idempotency, source, and lock headers are fully described in OpenAPI and remain
part of the shared Core sync protocol.

The v7.1.0 OpenAPI document explicitly describes every supported client,
administrator, maintenance, and health operation: parameters, request bodies,
response bodies, downloads, headers, authentication, and endpoint errors.
Generation fails if a route lacks a contract or a stale contract lacks a
route. The two secret scheduled jobs are kept in a separate internal inventory
and are not exposed for SDK generation.

The API remains first-party only. A complete transport contract is not a
promise of unrestricted access. Third-party applications still require a later
client-registration, scopes, rate-limit, and support-policy release.

## Case editing leases

Lock acquisition and heartbeat use one PostgreSQL compare-and-set statement.
Only an expired lease or the same user/device may update the row. If lock
transport itself is unavailable, clients deliberately remain editable so
clinical work can continue; monotonic section revisions still prevent a stale
save from silently replacing newer server data.

## Export completeness

OMOP batches above 5000 matching cases return HTTP 422 with
`EXPORT_LIMIT_EXCEEDED` and no partial export. Personal account export is a
streamed ZIP with a manifest and cursor-paged NDJSON records.
