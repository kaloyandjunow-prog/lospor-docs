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

## Timeline clock and timezone

Starting a case saves two pieces together: the exact UTC instant and the IANA
timezone used by the clinician, such as `Europe/Sofia`. The visible `HH:MM`
remains for display, but it is never used by itself to reconstruct a date.

The start-time patch is sent before the first timetable event. Live clocks,
five-minute columns, reopen backfill, web projection, and mobile projection all
use that same exact instant. This works across positive, negative, half-hour,
and daylight-saving offsets.

Legacy cases that have only an `HH:MM` remain readable, but LOSPOR does not
invent timestamps for their saved columns. A legacy snapshot is converted to
events only when a trustworthy `startedAt` exists, and conversion is rejected
if it would synthesize future observations.

## Two devices

Each case section has an increasing revision number. A save says which revision
the user edited. If another device advanced it first, the server returns the
newer revision. LOSPOR retries the changed fields once against that revision.
Different fields can therefore merge without replacing the complete form.

## Reopening and finalizing

When a case is reopened, LOSPOR loads the server copy and reapplies anything
still in the local tray. A case cannot be finalized while its tray still
contains unsynced changes.

## A field rejected for privacy

If the server detects likely identifying information, Autosave Manager keeps
that field on the device and shows the reason beside it. Other safe fields in
the same form can still save.

The rejected text is not repeatedly sent. It stays blocked until the clinician
changes that field, then LOSPOR tries it once again. Reopening the case restores
the local blocked text over the server copy so it is not lost.

The probable-name check is skipped only for structured selections from the
ICD-10, procedure, medication, and allergy catalogues. EGN, long-number, date,
and email checks still apply to those labels.

## When the server cannot be reached

A save always reaches durable storage on the device before any network request is
attempted, so an unsent save is queued rather than lost. That property is what
lets the application stop trying quickly.

Until 8.4.0 every save waited the full network timeout before concluding it was
offline, and intraoperative writes are serialised per case, so one unreachable
save delayed everything queued behind it — and the next save paid the same cost
again. The application spent seconds repeatedly arriving at an answer it already
had.

The timeout stayed at eight seconds; what changed is that the wait is now paid
**once**. After a failure the application writes straight to the queue without
attempting the network until a short cooldown has passed. It clears that state
the moment any request reaches the server — even an error response proves the
network is up — and whenever the application returns to the foreground, since
the connection may well have changed while it was away.

The cooldown is deliberately shorter than the periodic flush, so every flush
still makes one genuine attempt and a recovered connection is picked up on the
next cycle rather than being locked out.

Eight seconds is deliberate. A shorter limit was tried and reverted in 8.5.0: a
healthy save over mobile data can exceed three seconds, and the abort was then
read as a network failure, so the application announced itself offline while it
was online and saving normally. Telling a clinician their work is not reaching
the server, when it is, is worse than waiting a few more seconds.

## A poll that never answers

Background syncing runs on a single-flight poller: one poll at a time, the next
scheduled once the previous finishes. Until 8.5.0 that rescheduling happened only
when the in-flight poll completed, and a request with no timeout could fail to
complete at all — leaving the loop permanently asleep. Queued work then sat until
the clinician pressed sync by hand, and reopening the application did not help,
because it joined the same stuck attempt.

Polls now run under a watchdog. One that overruns is abandoned so the loop always
re-arms, and an abandoned poll that finishes late cannot disturb the poll that
replaced it.

Settings → Diagnostics shows whether the application currently considers the
server reachable, and how many edits are waiting.

## Operational notes

- Schema migration: `20260723000000_autosave_manager_revisions`
- Revision headers:
  - `x-lospor-preop-revision`
  - `x-lospor-intraop-revision`
  - `x-lospor-postop-revision`
- Legacy timestamp conflict headers remain accepted during migration.
- Signing out or deleting a draft clears the relevant local clinical queues.
