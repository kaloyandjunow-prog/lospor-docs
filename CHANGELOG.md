# Changelog - LOSPOR Docs

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
