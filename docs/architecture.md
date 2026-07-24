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

## Shared clinical domain

From v6.0.0, Core also owns the pure rules that must produce the same answer
on every client:

- canonical preoperative and postoperative save payloads;
- clinical number limits, enum values, readiness, and finalization checks;
- event-log to timetable projection and the reverse legacy conversion;
- active infusion, fluid, gas, and agent reconstruction;
- drug and infusion totals plus printable timetable summaries;
- persisted case statuses and clinician-facing derived stages;
- stable option identities and strict option metadata readers; and
- account-level clinical preference normalization and merge rules.

Web and mobile keep thin adapters where their representations genuinely
differ. For example, Core calculates an infusion rate as a number, while the
mobile editing control may display it as text. Formatting, translations,
colors, animations, and component state remain client concerns.

## Clinical settings across devices

Display units, default monitoring, vital-sign autofill, and intraoperative
drug and infusion favourites belong to the signed-in account. Theme, language,
layout, and notifications remain local to each device.

Both clients keep a small local clinical-settings snapshot so settings work
offline. An offline change records the exact fields changed, rather than only
marking the whole snapshot as dirty. On reconnect, those fields are applied
over the newest account settings. This prevents one offline unit change from
overwriting an unrelated setting changed on another device.

Favourites are stored with a stable option identity rather than their visible
label. Renaming or translating an option therefore does not silently remove it
from a clinician's favourites.

## Status ownership

The database stores only the canonical persistence statuses: `DRAFT`,
`IN_PROGRESS`, `AWAITING_REVIEW`, and `COMPLETE`. Extra workflow labels such
as `AWAITING_ALLOCATION` and `AWAITING_POSTOP` are derived display stages.
They are never written as database statuses.

## Release order

Core must be published and tagged before web and mobile are changed to depend
on that tag. Clean installs of either client must use the same Core release
that their source imports. The v6.0.0 domain change does not require a database
migration.

## What stays outside Core

Core has no React components, Expo APIs, Next.js routes, Prisma client, or
database connection. UI remains in each app, and the web repository remains the
single owner of persistence and HTTP behavior. This keeps Core reusable and
prevents a shared package from becoming a second backend.
