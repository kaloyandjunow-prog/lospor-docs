---
sidebar_position: 5
title: Data & Research
---

# Data & Research

## What data does LOSPOR collect?

LOSPOR collects structured perioperative data entered by anaesthesiologists:

### Preoperative data
- Patient demographics: age, sex, height, weight, BMI, blood type
- Diagnosis (ICD-10 code + label, searchable by clinical synonym via ICD-10CM enrichment)
- Planned procedure (PCS code + group)
- Comorbidities (ICD-10 codes)
- Risk scores: ASA, RCRI, Apfel, STOP-BANG
- Airway assessment parameters
- Preoperative vital signs
- Laboratory results (LOINC-coded, canonical SI units, reference ranges, abnormal flags)

### Intraoperative data
- Month/year, start time, end time, duration (no exact calendar date stored)
- Anaesthesia technique(s)
- Airway device and tools
- Ventilation mode
- Monitoring modalities
- Vascular access
- Gas management: fresh gas flow (L/min), carrier gas (Air/N₂O), FiO₂ (%)
- Vital signs timetable (BP, HR, SpO₂, EtCO₂ at 5-minute intervals)
- Drugs administered (name, dose, unit, time, **ATC code**)
- Continuous infusions (name, rate, start/end time)
- Volatile agents (name, start/end time)
- IV fluids (type, volume, start/end time)
- Fluid balance summary
- Patient position
- Complications

### Postoperative data
- Aldrete score (all five criteria + total)
- Recovery vitals: systolic BP, diastolic BP, heart rate, SpO₂, temperature, pain NRS, PONV
- Disposition: Ward / PACU / ICU
- Handover instructions

## What is NOT stored?

The following are **never uploaded or stored**:
- Patient name
- Patient ID number / hospital file number
- Exact date of surgery (only month and year)
- Surgeon name, anaesthesiologist name, anaesthesia nurse name
- Any free-text content that triggers the PII detector (EGN, 7+ digit sequences, date patterns, email addresses, two capitalised words)

The printed protocol leaves patient identity fields blank — they are filled in by hand after printing and never sent to the server.

## Research data quality

LOSPOR stores clinical data in two layers:

**Authoritative JSON columns** — the canonical source of truth for everything you entered. These are always complete and used for display, printing, and export.

**Queryable SQL rows** — structured rows derived from the JSON and maintained automatically after every save. These power research queries, OMOP exports, and cross-case filtering without JSON parsing.

| Clinical data | SQL table | Key columns |
|---------------|-----------|-------------|
| Diagnoses | `PreopDiagnosis` | `code` (ICD-10), `label`, `ordinal` |
| Comorbidities | `Comorbidity` | `icd10Code`, `label` |
| Lab results | `LabResult` | `loincCode`, `valueNum`, `unitCanon`, `abnormalFlag` |
| Procedures | `PreopProcedure` | `code`, `group`, `domain` |
| Medications | `Medication` | `atcCode`, `inn`, `nameRaw` |
| Intraop events | `CaseEvent` | `type`, `timestamp`, `atcCode`, `drugId`, `systolic`, `diastolic`, etc. |
| Vascular access | `VascularAccess` | `site`, `size` |
| Selections | `CaseSelection` | `section`, `category`, `value` |

Drug events in `CaseEvent` carry both the ATC code (pharmacological class) and a `drugId` FK to the Drug catalogue, enabling precise drug record linkage. Lab results carry LOINC codes and are normalised to canonical SI units (e.g. Hb in g/L, glucose in mmol/L).

Each case also stores the **institution ID** at creation time, enabling institution-level research queries without relying on the user's current institution (which may change).

## Audit trail and snapshots

Every change to a preoperative or postoperative field is recorded individually in the audit log: what field changed, from what value, to what value, by whom, and when. This supports medico-legal review without exposing patient identity.

When a case is finalised (status: Case Finished), a full-case snapshot is stored as a single immutable record. Research datasets can reference this snapshot to ensure reproducibility — the snapshot is updated if the case is un-finalised and re-finalised.

## Anonymisation

Each case is assigned an automatically generated **case code** (format: `YYYY-NNNN`, e.g. `2026-0001`). This code appears on the printed protocol and is the only identifier stored in the database.

The case is linked to a **user ID** (internal, not exposed in research queries).

## Research access

A **LOSPOR Research Browser** application is currently in development. It will provide:
- Read-only access to the anonymised dataset
- Filtering by procedure type, ASA class, technique, date range, institution code
- Aggregate statistics and distributions
- CSV export of filtered datasets

Access to the research browser will require registration and approval. Researchers will agree to data use terms before accessing the dataset.

:::info Coming soon
The research browser is planned for release in 2026. Until then, researchers interested in the dataset may contact the LOSPOR team directly.
:::

## GDPR considerations

LOSPOR is designed to comply with the General Data Protection Regulation (EU) 2016/679:

- **Data minimisation** — only clinically necessary structured data is collected; patient identity is excluded by design
- **Purpose limitation** — data is collected for personal learning, portfolio, and audit
- **Storage limitation** — data is retained until the user deletes their account
- **Security** — all data is encrypted in transit (HTTPS) and at rest; JWT tokens are revoked on logout with DB-backed revocation
- **EU data residency** — all sub-processors are EU-hosted: Supabase (Frankfurt), Vercel (EU), Mistral AI (France)
- **Server-side PII detection** — free-text fields are checked server-side for common identifiers (EGN, long digit sequences, date patterns, email addresses, name patterns) and rejected with a clear error message

### Your GDPR rights

| Right | How to exercise it |
|-------|--------------------|
| **Access (Article 15)** | Settings → Privacy & Data → Download my data |
| **Erasure (Article 17)** | Settings → Privacy & Data → Delete my account |
| **Other requests** | Email kaloyandjunow@gmail.com |

Institutions self-hosting LOSPOR are responsible for their own GDPR compliance, including maintaining a Data Processing Register and notifying patients if required by local regulations.

## Citing LOSPOR

If you use LOSPOR data in a publication, please cite:

> LOSPOR — Large Open Source Perioperative Register. Available at https://lospor.org. Licensed under AGPL-3.0.
