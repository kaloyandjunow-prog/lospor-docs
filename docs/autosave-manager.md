---
title: How autosave works
---

# How autosave works

LOSPOR records a clinical change on the device before trying to send it. The
screen can therefore continue to show unsent work after a short network loss or
an app restart.

## In simple terms

Think of Autosave Manager as one clerk assigned to each case:

1. The clerk writes the change into a local tray.
2. Changes for that case are sent one at a time, in the order they were made.
3. The server acknowledges the change and returns the section's new revision.
4. Only then is the change removed from the tray.

Preoperative, intraoperative, and postoperative forms all use this same process.
The mobile app stores its tray in SecureStore. The web/PWA stores it in
IndexedDB.

## Timetable events

Adding, editing, and deleting a timetable item are separate operations with
stable IDs. Editing or deleting one drug, fluid, vital, or event does not replace
the whole timeline. Retrying the same operation is safe.

## Two devices

Each case section has an increasing revision number. A save says which revision
the user edited. If another device advanced it first, the server returns the
newer revision. LOSPOR retries the changed fields once against that revision.
Different fields can therefore merge without replacing the complete form.

## Reopening and finalizing

When a case is reopened, LOSPOR loads the server copy and reapplies anything
still in the local tray. A case cannot be finalized while its tray still
contains unsynced changes.

## Operational notes

- Schema migration: `20260723000000_autosave_manager_revisions`
- Revision headers:
  - `x-lospor-preop-revision`
  - `x-lospor-intraop-revision`
  - `x-lospor-postop-revision`
- Legacy timestamp conflict headers remain accepted during migration.
- Signing out or deleting a draft clears the relevant local clinical queues.
