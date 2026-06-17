---
sidebar_position: 5
title: Data & Research
---

# Data & Research

## What data does LOSPOR collect?

LOSPOR collects structured perioperative data entered by anaesthesiologists:

### Preoperative data
- Patient demographics: age, sex, height, weight, BMI, blood type
- Diagnosis (ICD-11 code + label)
- Planned procedure
- Comorbidities (ICD-10 codes)
- Risk scores: ASA, RCRI, Apfel, STOP-BANG
- Airway assessment parameters
- Preoperative vital signs
- Laboratory results

### Intraoperative data
- Month/year, start time, end time, duration (no exact calendar date stored)
- Anaesthesia technique(s)
- Airway device and tools
- Ventilation mode
- Monitoring modalities
- Vascular access
- Vital signs timetable (BP, HR, SpO₂, EtCO₂ at 5-minute intervals)
- Drugs administered (name, dose, unit, time)
- Continuous infusions (name, rate, start/end time)
- Volatile agents (name, start/end time)
- IV fluids (type, volume, start/end time)
- Fluid balance summary
- Patient position
- Complications

### Postoperative data
- Aldrete score (all five criteria + total)
- Recovery vitals: temperature, pain NRS, PONV
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
