---
sidebar_position: 5
title: Data & Research
---

# Data & Research

LOSPOR v3.0 stores perioperative data for clinical documentation, audit, personal portfolio, and de-identified / pseudonymised research datasets. The web app owns the canonical PostgreSQL/API contract; mobile and PWA clients map their payloads into the same field names and libraries before persistence.

## What data does LOSPOR collect?

### Preoperative data
- Demographics: age, sex, height, weight, BMI, blood group, Rh factor.
- Diagnosis: ICD-10 code with English and Bulgarian labels.
- Planned procedure: procedure code/group/domain and description.
- Comorbidities: ICD-10-coded tags with English/Bulgarian labels.
- Medication history and medication allergy rows, including `Medication.kind = CURRENT` or `ALLERGY`.
- Risk scores: ASA, RCRI, Apfel, STOP-BANG, and their component inputs.
- Airway assessment: Mallampati, mouth opening, thyromental distance, neck mobility, ULBT, Cormack-Lehane, difficult-airway history, and airway features.
- Free-text clinical notes where needed: team notes, physical exam report, difficult-airway notes. These are character-limited and PII-checked server-side.
- Vitals: BP, HR, SpO2, temperature, respiratory rate, including unable-to-obtain flags where available.
- Laboratory results: canonical lab name, value, parsed numeric value, canonical unit, LOINC code, reference range, abnormal flag, source, and timestamp where available.

### Intraoperative data
- Timing: month/year, start time, end time, duration.
- Techniques, position, airway devices/tools, ventilation modes, monitoring modalities.
- Vascular access rows with site, size, unit, depth, lumens, and pre-existing flag.
- Premedication rows for evening/morning entries.
- Append-only event timeline: vitals, serum/peripheral glucose, bolus drugs, infusion starts/rate changes/stops, fluid starts/stops, inhalational agent starts/stops, fresh gas flow changes, and clinical events.
- Fresh gas flow over time: FGF L/min, carrier gas, FiO2, calculated FiAir, and calculated FiN2O. FiO2 is clamped to 21-100%; O2-only is FiO2 100%.
- Fluids, urine, blood products, complications, and event notes.

### Postoperative data
- Aldrete score components and total.
- Recovery vitals: systolic BP, diastolic BP, heart rate, SpO2, temperature.
- Pain NRS, PONV, disposition, handover checklist, complications, and notes.

## What is not stored?

The following are intentionally never uploaded or stored:
- Patient name.
- Patient national ID / EGN.
- Hospital file number or patient ID number.
- Exact date of surgery; month/year and clinical timestamps are used instead.
- Surgeon, anaesthesiologist, or nurse names as structured fields.
- Free text that triggers the server-side PII detector.

The printable protocol leaves patient identity fields blank. Clinicians fill those fields by hand after printing if needed for the local paper record.

## Canonical libraries

LOSPOR v3.0 uses shared backend libraries rather than app-specific hardcoded lists.

| Library | Source of truth | Used for |
|---|---|---|
| ICD-10 | `Icd10Code`, `Icd10Synonym` | diagnoses and comorbidities |
| Labs/LOINC | `LabLoinc` and canonical lab code | AI scan, manual labs, export |
| Drugs/ATC/INN | `Atc`, `Drug`, option-library drug rows | medication history, allergies, intraop drugs/infusions |
| App options | `OptionLibrary` | techniques, airway, ventilation, monitoring, position, fluids, events, disposition, handover, numeric ranges |
| Athena/OMOP vocabulary | `OmopConcept`, `OmopVocabulary`, relationships, ancestors, synonyms | local standard concept resolution |
| Concept map | `ConceptMap` | source code/label preservation, mapping method/confidence, review state, and OMOP concept IDs where known |

ICD-10 English and Bulgarian labels are metadata for the same ICD code. They are not duplicate clinical concepts.

## Research data layers

LOSPOR keeps compatibility JSON/cache data for the apps, but research queries should use normalized rows where available.

| Clinical data | SQL table | Research columns |
|---|---|---|
| Diagnoses | `PreopDiagnosis` | ICD code, labels, source vocabulary/code, OMOP concept ID if mapped |
| Procedures | `PreopProcedure` | code, group, domain, source mapping |
| Comorbidities | `Comorbidity` | ICD-10 code, labels, source mapping |
| Labs | `LabResult` | valueNum, unitCanon, LOINC, ranges, abnormal flag, source mapping |
| Medications/allergies | `Medication` | kind, drugId, INN, ATC, dose, route, source mapping |
| Vascular access | `VascularAccess` | site, size, unit, depth, lumens, pre-existing flag |
| Premedication | `PremedicationAdministration` | phase, raw name, INN, ATC, dose, route |
| Complications | `CaseComplication` | section, label, note, timestamp, source mapping |
| Selections | `CaseSelection` | section, category, value, source mapping |
| Intraop timeline | `CaseEvent` | event type, timestamp, typed vitals/gas/drug/fluid/agent columns, provenance |
| Missingness | `ClinicalFieldStatus` | fieldKey, presence, source, sourceVersion |

`CaseEvent` is append-only. Edits supersede older rows and deletes tombstone rows, so the current chart can be projected from active rows while preserving history for audit.

## Missingness and provenance

Research exports must distinguish blank data from negative data. `ClinicalFieldStatus` records whether key fields are:

- `PRESENT`
- `ABSENT`
- `UNKNOWN`
- `NOT_APPLICABLE`
- `NOT_DOCUMENTED`

Normalized rows also carry source/provenance metadata such as user input, web/mobile source, AI scan, backfill, migration, or relational sync where available. v3.0 field-status coverage is intentionally broad so normalized rows can serve as the research/export authority while UI JSON remains a compatibility cache.

## OMOP export

The OMOP export is an OMOP CDM v5.4-oriented research export. It now reads normalized rows and active event rows instead of raw legacy blobs.

The export includes:
- visit occurrence with institution/care-site source value
- condition occurrence from diagnoses and comorbidities
- procedure occurrence from planned procedures and vascular access
- measurement rows for preop/postop vitals, labs, intraop vitals, glucose, and gas settings
- drug exposure rows for medications, bolus drugs, premedication, agents, and infusions where applicable
- observations for ASA, scores, selections, complications, handover, disposition, and other app-local concepts

Known OMOP concept IDs are stored/exported where confidently mapped. Filtered Athena CSV import can enrich LOINC, ICD-10, and ATC mappings through local OMOP vocabulary tables without storing the full Athena bundle. Otherwise LOSPOR exports source vocabulary, source code, and source labels with an explicit source-only/unmapped status. Fake OMOP IDs are not used.

Each export includes a manifest with app/schema version, concept-map version, row counts, mapping summary, de-identification notes, and quality warnings. App exports warn rather than block when source-only mappings, missing field-status rows, exact timestamps, or institution linkage are present.

## De-identification / pseudonymisation

Each case receives a generated case code such as `2026-0001`. This is the visible case-level pseudonym used in the UI and exports.

Internally, LOSPOR stores operational linkage needed for access control, audit, governance, and research quality: user ID, institution ID, timestamps, role/audit information, and finalisation snapshots. These are not patient identifiers, but they mean LOSPOR data should be described as de-identified / pseudonymised, not fully anonymised.

## Data quality tools

The v3.0 backend includes tooling for release and research checks:

- `scripts/seed-vocabularies.ts` seeds ICD-10, ICD-10CM synonyms, ATC, and Drug rows.
- `scripts/seed-athena-vocabularies.ts --filtered-lospor` imports only LOSPOR-needed local Athena/OMOP rows for vocabulary-backed mapping.
- `scripts/seed-lab-loinc.ts` seeds the canonical lab/LOINC catalogue.
- `scripts/seed-option-library.ts` seeds shared app option libraries.
- `scripts/seed-concept-maps.ts` seeds local bilingual concept maps and enriches them from Athena when available.
- `scripts/backfill-relational.ts` rebuilds normalized rows and typed event columns from existing cases.
- `scripts/data-quality-report.ts` reports relational drift, unmapped/source-only concepts, invalid ranges, impossible timestamps, and missing key research fields.
- `scripts/wipe-dev-clinical-data.ts` can wipe dev clinical data while preserving accounts, institutions, vocabularies, option libraries, and configuration.

## Research access

A LOSPOR Research Browser is planned. Until then, research exports should be generated by approved administrators using the web export tools and the data quality report.

## Citing LOSPOR

If you use LOSPOR data in a publication, cite:

> LOSPOR - Large Open Source Perioperative Register. Available at https://lospor.org. Licensed under AGPL-3.0.
