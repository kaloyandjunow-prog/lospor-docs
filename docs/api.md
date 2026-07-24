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

Browser clients use an API-owned HttpOnly session cookie. Revision and
idempotency headers remain part of the shared Core sync protocol.

The first V7 release is first-party only. The OpenAPI document describes the
transport surface, but it is not a promise of unrestricted public access.
Third-party applications will require a later client-registration, scopes,
rate-limit, and support-policy release.
