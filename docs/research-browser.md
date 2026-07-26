---
sidebar_position: 5
title: Research Browser
---

# LOSPOR Database Research Browser

LOSPOR Database is a standalone read-only product for perioperative research,
quality improvement, local audit, and benchmarking. It has its own repository
and deployment (`lospor-browser`) and uses the versioned LOSPOR API. It never
connects directly to PostgreSQL and never accepts arbitrary SQL.

## Capabilities

- build structured cohorts from demographics, ICD-10 diagnoses and
  comorbidities, procedures, techniques, airway management, medications,
  complications, outcomes, and completeness;
- compare two cohorts using the same semantic metrics;
- inspect pseudonymous cases without clinician identities, free-text notes, or
  exact case dates;
- review terminology mapping, finalization snapshots, field completeness,
  relational drift, and impossible timelines;
- benchmark authorized institutions and periods with small-cell suppression;
- save private or institution-shared cohorts;
- create complete CSV, JSON, and permission-controlled OMOP exports with row
  counts, SHA-256 checksums, history, and audit records; and
- manage explicit researcher scope and export permissions.

The interface is available in English and Bulgarian.

## Access model

- `ADMIN` can query all institutions, manage research grants, and create OMOP
  exports.
- `HEAD_OF_DEPT` can query and export the head's institution.
- `RESEARCHER` requires one or more active `ResearchAccessGrant` records.
- Ordinary clinical members cannot enter the Research Browser.

Aggregated benchmark cells containing one to four cases are suppressed. Case
inspection is limited to the same authorized scope and returns a safe
projection rather than the operational clinical record.

## Data sources

The first provider reads normalized LOSPOR clinical tables through Prisma.
The public research contract names its source and is provider-independent. A
future central OMOP database can implement the same contract without changing
the standalone interface.

## Local development

The default ports are:

- clinical web: `3000`
- API: `3002`
- Research Browser: `3003`

Configure `lospor-browser/.env.local`:

```env
LOSPOR_API_INTERNAL_URL=http://127.0.0.1:3002
NEXT_PUBLIC_DATABASE_URL=http://localhost:3003
LOSPOR_DATABASE_ORIGIN=http://localhost:3003
```

Apply the API migration containing `ResearchAccessGrant`, `ResearchCohort`, and
`ResearchExport` only to the intended development database. Then start:

```bash
cd lospor-api
npm run dev

cd ../lospor-browser
npm run dev
```

Production should deploy the browser at `database.lospor.org`, set
`LOSPOR_DATABASE_ORIGIN=https://database.lospor.org`, and proxy `/api/*` to
`api.lospor.org/v1/*`. The API must set
`LOSPOR_DATABASE_URL=https://database.lospor.org` and include that origin in
`CORS_ALLOW_ORIGINS`. Production cookie writes accept only configured origins;
the private-LAN port `3003` exception exists only in development.

## Governance

Research queries, comparisons, case inspection, benchmarks, cohort changes,
grants, and exports are recorded in the API audit log. Export history stores
the complete cohort definition, result count, status, and checksum. Files are
regenerated from that immutable request metadata rather than relying on a
serverless filesystem.
