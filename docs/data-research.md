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
- Date, start time, end time, duration
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
- Time in recovery room
- Disposition: Ward / PACU / ICU
- Handover instructions

## What is NOT stored?

The following are **never uploaded or stored**:
- Patient name
- Patient ID number / hospital file number
- Surgeon name
- Anaesthesiologist name (only the user account that created the record is linked)
- Anaesthesia nurse name

When the protocol is printed, the patient's name and ID number are entered locally in the browser and printed directly — they are never sent to the server.

## Anonymisation

Each case is assigned an automatically generated **case code** (format: DDMMYYYY-NN). This code appears on the printed protocol and is the only identifier stored in the database.

The case is linked to a **user ID** (internal, not exposed in research queries) and an **institution ID** (anonymised as a code in research outputs).

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

## GDPR compliance

LOSPOR is designed to comply with the General Data Protection Regulation (EU) 2016/679:

- **Data minimisation** — only clinically necessary data is collected; patient identity is excluded
- **Purpose limitation** — data is collected for clinical documentation and quality improvement
- **Storage limitation** — data is stored only as long as clinically and legally required
- **Security** — all data is encrypted in transit (HTTPS) and at rest (Supabase encryption)
- **EU data residency** — data is stored in the EU (Supabase Frankfurt region)

Institutions self-hosting LOSPOR are responsible for their own GDPR compliance, including maintaining a Data Processing Register and notifying patients if required by local regulations.

## Citing LOSPOR

If you use LOSPOR data in a publication, please cite:

> LOSPOR — Large Open Source Perioperative Register. Available at https://lospor.org. Licensed under AGPL-3.0.
