# Changelog - LOSPOR Docs

## [9.9.6] - 2026-09-12

### Fixed

- **Self-hosting showed the appliance installer running as an ordinary user.**
  `./scripts/install.sh` was written bare. It ends by writing and starting the
  appliance's systemd units, and the scripts that install them refuse to run as
  anyone but root, so the command as documented could not complete. It did not
  stop cleanly at the end either: it broke partway on the first root-owned path
  it reached and reported that path rather than the missing privilege. The
  installer and the update command are now both shown with `sudo`, with the
  reason given. The appliance's own guides carry the same correction in
  lospor-hospital 1.3.3.

## [9.9.5] - 2026-09-08

Aligns the site with the product after a ten-release gap, and corrects two
statements that would have led a reader wrong.

### Fixed

- **The postoperative guide promised automatic closure that no longer
  happens.** It said the case is permanently finalised when the review period
  ends. On the hosted service that is only true while the case is open in front
  of you: the countdown finalises from the screen, so closing the tab leaves the
  case awaiting review until someone returns to it. The guide now names all
  three ways a case actually gets finalised, and says plainly that a hospital
  appliance is different — there a background job closes expired cases every
  five minutes whether or not anyone is looking.

- **Self-hosting omitted a scheduled job, so a self-hoster silently got no
  automatic case closure.** The page listed the retention purge and the research
  export worker and never mentioned `/v1/internal/close-expired-cases`, which
  did not appear anywhere on this site. It was survivable while the hosted
  deployment ran the job; it no longer does. "Data retention" is now "Scheduled
  jobs", listing all three with their cadence and authorization, and explaining
  why the closure sweep needs minutes rather than a nightly run.

### Added

- **Ten releases of changelog.** The site stopped at 9.4.0 while the product
  reached 9.9.5. The entries cover the case-status corrections, the submission
  failures that used to look like successes, the allocation rule that differed
  between web and phone, lab-scan consent moving to the clinical record, and the
  printed record no longer clipping.

## [9.4.0] - 2026-08-29

### Fixed

- The Getting Started guide said institution was optional at registration. It
  is required — the registration schema rejects both an empty institution and
  the no-institution sentinel — so a clinician following the guide was told a
  mandatory choice could be skipped. The guide now states the requirement and
  explains the path when an institution is not listed: register with the
  closest one, then request the correct department from Settings, where an
  administrator reviews it.

### Added

- Public changelog entry for 9.4.0: the paediatric-to-adult correction that
  could strand a case on "saved locally", the refusal wording that borrowed the
  personal-data message, the mode button that did not name its destination, and
  this registration correction.

## [9.3.1] - 2026-08-24

### Added

- Public changelog entries for 9.3.0 and 9.3.1: the 1.2.0 wave (Bulgarian-first
  localization, Hospital username sign-in, administrator two-factor sign-in,
  dose guidance no longer reading as a recommendation, the bilingual audit
  vocabulary, account suspend/delete/restore, versioned Terms/Privacy
  acceptance, and time-boxed research self-authorization) and the fixes that
  followed it (the offline "unsynced" vs "could not be saved" wording, and the
  exported PWA's API proxy).

## [9.1.1] - 2026-08-17

### Changed

- Version alignment with the 9.1.1 API fix.

## [9.1.0] - 2026-08-16

### Changed

- `data-research.md` describes the OMOP export as it now stands: care site as
  its own table, person and observation period, every planned procedure and the
  airway placement act, the reference range and source text on measurements, and
  drug exposure end dates.
- Documented that a clinical yes/no question is exported for a recorded "no" as
  well as a "yes", and that no row means the question was never asked — a
  different claim about a patient than a negative finding.
- Documented that an allergy is exported as an observation and never as a drug
  exposure.

## [9.0.0] - 2026-08-11

### Added

- A 9.0.0 entry on the public changelog page covering what changed for the
  people using the system: paediatric dose conflicts being stated rather than
  resolved by sort order, reopened cases keeping what was saved, an unassessed
  recovery no longer displayed as the worst possible score, the benchmark
  screen offering only what it can calculate, and the research export writing
  numbers as numbers.
- Two corrections flagged explicitly for anyone who has already planned an
  analysis: the pain score that was exported under the OMOP concept for body
  temperature, and seventeen documented ranges that were narrower than the
  ranges the software accepts.

## [8.5.0] - 2026-08-07

### Changed

- The public changelog covers 8.5.0: intraoperative tab switching, the
  preoperative form no longer slowing as it fills, saving no longer reporting
  "Offline" while online, background sync that cannot silently stop, and the
  diagnostics screen.
- The autosave page gains a section on a poll that never answers, and corrects
  the network timeout: it remains eight seconds. A three-second limit was tried
  and reverted, because a healthy save over mobile data can exceed it and the
  abort was then reported to the clinician as being offline.

## [8.4.0] - 2026-08-06

### Added

- **Working offline** — a new page stating plainly what can be done with no
  connection and what cannot: case documentation and diagnosis, procedure and
  drug search all continue; signing in, finalising and anything that queries
  other data do not. It also covers the version stamp carried by the bundled
  vocabulary and why a code chosen offline records which copy produced it.

### Changed

- The autosave page describes what happens when the server cannot be reached:
  the shortened timeout, writing straight to the queue after a failure, and why
  an unsent save is queued rather than lost.

## [8.3.3] - 2026-08-06

### Added

- Pediatric mode gains a **Premedication** section: how a dose is resolved from
  the child's weight and age, the four outcomes a drug and route can produce
  (calculated, withheld, manual, needs a weight), the capping and rounding
  rules, and which weight basis is used. This shipped in 8.3.2 with no
  documentation at all.

### Changed

- The public changelog covers 8.3.2 and 8.3.3, including the web app having
  previously offered children adult premedication doses.

## [8.3.2] - 2026-08-06

### Changed

- Version aligned with the 8.3.2 release train. No documentation changes.

## [8.3.0] - 2026-08-05

### Changed

- Self-hosting is rewritten as a deployment guide built around the appliance,
  rather than instructions that started three services with `npm run dev`. It
  covers the environment variables a real installation needs — including
  `PEDIATRIC_MODE_ENABLED` — first-administrator bootstrap, and backup and
  restore as a procedure rather than a sentence.

## [8.2.1] - 2026-08-05

### Changed

- Version alignment with the 8.2.1 release train.

## [8.2.0] - 2026-08-05

### Fixed

- Two high-severity advisories in transitive dependencies: `brace-expansion`
  (denial of service via unbounded intermediate arrays) and `fast-uri` (host
  confusion via a backslash authority introducer). Lockfile only; no direct
  dependency changed. `npm audit` reports zero vulnerabilities.

## [8.0.0] - 2026-08-04

First stable release, documenting pediatric clinical mode and the clinical
ruleset hierarchy.
