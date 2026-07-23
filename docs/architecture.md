---
title: Application architecture
---

# Application architecture

LOSPOR is split into four repositories with clear ownership:

- **Web (`lospor-app`)** owns the canonical database schema and API.
- **Mobile/PWA (`lospor-mobile`)** owns the Expo clinical interface.
- **Core (`lospor-core`)** owns platform-neutral clinical rules, sync logic,
  and data contracts used by both apps.
- **Docs (`lospor-docs`)** explains user, administrator, and developer
  behavior.

## Shared data contracts

Core defines the shape of case details, intraoperative events, and timetable
snapshots once. Web and mobile import those definitions. A field change is
therefore checked in both apps by their TypeScript builds.

Runtime parsers sit at storage and network boundaries. They accept supported
legacy representations, such as an infusion rate stored as text or a number,
and reject malformed rows before application code uses them.

## What stays outside Core

Core has no React components, Expo APIs, Next.js routes, Prisma client, or
database connection. UI remains in each app, and the web repository remains the
single owner of persistence and HTTP behavior. This keeps Core reusable and
prevents a shared package from becoming a second backend.
