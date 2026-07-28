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
- export all matching pseudonymous summary rows as CSV/JSON, or create
  permission-controlled OMOP exports, with row counts, SHA-256 checksums,
  immutable artifacts, history, and audit records; and
- manage explicit researcher scope and export permissions.

The interface is available in English and Bulgarian.

## Access model

- `ADMIN` can query all institutions, manage research grants, and create OMOP
  exports.
- `HEAD_OF_DEPT` can query and export the head's institution.
- `RESEARCHER` requires one or more active `ResearchAccessGrant` records.
- Ordinary clinical members cannot enter the Research Browser.

Permissions keep separate institution scopes for aggregate queries, case
inspection, standard export, and OMOP export. A grant for one institution never
widens a different action into another institution. Aggregate-only users see
protected count ranges and never receive case rows. Small valid denominators,
rare positive outcomes, and rare complementary outcomes are suppressed across
queries, comparisons, benchmarks, distributions, and quality reports. Case
inspection returns a safe projection rather than the operational clinical
record.

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
the normalized cohort definition, exact action scope, source cutoff and
version, transactionally captured case revisions, revision-manifest hash,
generation timestamp, row count, immutable artifact key, and artifact checksum.
If a captured case changes before generation, the export fails rather than
claiming that a partial file is complete. Downloads retrieve the stored
artifact; they never rerun the query against the current database. Only
finalized-case cohorts may be exported. Manifest v2 includes parent clinical,
event, relational, and section revisions, so child-row changes are detected.

Download files are retained for 30 days by default. The Browser shows the
expiry time, disables expired or unavailable downloads, and keeps the checksum,
row count, and generation history visible after the artifact is deleted.

CSV and JSON research exports contain every matching pseudonymous summary row,
but they are not a copy of every clinical variable in the source case. OMOP
exports contain the mapped research tables described in their manifest.

Local and self-hosted installations may use private filesystem artifact
storage. Serverless deployments must use an S3-compatible private bucket; the
API refuses filesystem research storage on Vercel.
