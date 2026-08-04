# Changelog - LOSPOR Docs

## [8.2.0] - 2026-08-05

### Fixed

- Two high-severity advisories in transitive dependencies: `brace-expansion`
  (denial of service via unbounded intermediate arrays) and `fast-uri` (host
  confusion via a backslash authority introducer). Lockfile only; no direct
  dependency changed. `npm audit` reports zero vulnerabilities.

## [8.0.0] - 2026-08-04

First stable release, documenting pediatric clinical mode and the clinical
ruleset hierarchy.
