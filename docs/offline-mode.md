---
title: Working offline
---

# Working offline

An operating theatre is not a place with reliable Wi-Fi. LOSPOR is built so a
case can be documented without a connection and reconciled afterwards, rather
than requiring the network at the moment a drug is given.

This page states plainly what works with no connection, what does not, and what
the application will tell you when it is running on its own.

## What works with no connection

**Documenting a case.** Preoperative, intraoperative, and postoperative entry all
continue. Every change is written to durable storage on the device before any
network request is attempted, so a save that cannot be sent is queued, not lost.
Losing power or closing the application mid-edit does not discard the entry.

**Diagnosis and procedure search.** The application carries its own copy of the
ICD-10 vocabulary — every code, with Bulgarian and English labels — and of the
procedure list. Searching offline uses the same ranking as the server, so the
results are the same results, not an approximation.

**Drug, infusion, and fluid selection.** The intraoperative option library keeps
an offline copy for the same reason, and says when it is being used.

**Queued work is visible.** Settings → Diagnostics shows how many edits are
waiting to be sent, and whether the application can currently reach the server.

## What does not work offline

**Signing in.** Authentication requires the server. A session already signed in
continues to work offline, but a first sign-in on a new device does not.

**Anything that asks the server a question about other data** — the case list
beyond what has already been loaded, audit logs, the administrative console,
research and export tools, and AI laboratory extraction.

**Finalising a case** sends the completed record for validation, so it needs a
connection. A case documented offline finalises once the connection returns.

## What the application tells you

An offline application that stays silent is worse than one that is simply
unavailable, because silence is read as fact. Two states are now explicit:

- **"Offline — searching the copy on this device"** appears above diagnosis and
  procedure results that came from the device rather than the server. Previously
  a failed search returned an empty list, which reads as *"there is no such
  diagnosis"* rather than *"there is no network"* — a materially different and
  much more misleading statement.
- **"Offline — search unavailable for this field"** appears where no offline copy
  exists, so an empty list is never mistaken for an answer.

Saving states — saved, queued, conflicted — are shown as they always were.

## The vocabulary on the device

The bundled vocabulary is fixed when a version of the application is built. It
carries a version stamp, and any diagnosis or procedure chosen from it records
that stamp alongside the code.

This matters because a code is stored as text: nothing rejects a code that has
since been retired or renamed on the server. Without the stamp, a case coded
from an old copy would be indistinguishable from one coded from the current
vocabulary. With it, such cases can be found and reviewed. The version in use is
shown in Settings → Diagnostics.

When the application can reach the server it always prefers the live search, so
the device copy is a floor rather than a ceiling.

## How queued work is sent

Queued edits are retried when the application is reopened, when it returns to
the foreground, and periodically while it runs. If the server cannot be reached,
the application stops attempting the network for a short interval and writes
straight to the queue instead — so a lost connection costs one delay rather than
one delay per save. It resumes as soon as a request succeeds.

Where an edit conflicts with a newer change made elsewhere, it is held and
reported rather than overwriting the newer record.

## Limits worth knowing

- Offline procedure search matches on the procedure group, its domain, and the
  wording of the codes within it. A multi-word phrase may match online and not
  offline, because the offline copy stores the vocabulary of each group rather
  than every code's full description.
- Medication search has no bundled copy of its own; the intraoperative option
  library covers drug selection during a case.
- The diagnostics figures are held in memory and reset when the application
  restarts. They are there to answer "is it slow, and by how much" in the moment,
  not to keep a history.
