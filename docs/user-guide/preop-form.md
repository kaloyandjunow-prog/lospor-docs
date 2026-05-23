---
sidebar_position: 3
title: Preoperative Form
---

# Preoperative Form

The preoperative form captures all pre-anaesthesia assessment data. It is the first step in every case.

## Patient demographics

Enter the patient's:
- **Age** (years)
- **Sex** (Male / Female / Other)
- **Height** (cm) and **Weight** (kg) — BMI is calculated automatically
- **Blood type** and **Rh factor** (optional)

**IBW (Ideal Body Weight)** and **ABW (Adjusted Body Weight)** are calculated automatically from height, weight, and sex. These are important for drug dosing in obese patients.

## Case details

- **Diagnosis** — search by ICD-11 code or free text. The ICD-11 WHO classification is available in English and Bulgarian.
- **Planned procedure** — the surgical procedure to be performed
- **Team notes** *(optional)* — free text for roles, theatre number, or any case-specific reminders. Do not enter names or ID numbers here.

## Comorbidities

Select active comorbidities from the ICD-10 list. Multiple comorbidities can be added. They appear as chips that are displayed on the printed protocol.

## Safety fields

- **Allergies** — tick if the patient has known allergies, then describe them in the text field
- **Latex allergy** — separate checkbox due to its anaesthetic relevance
- **Current medications** — free text
- **Family anaesthesia problems** — tick if there is a family history of malignant hyperthermia or other relevant conditions

## Airway assessment

The airway section covers all standard pre-anaesthesia airway evaluation parameters:

| Field | Description |
|-------|-------------|
| **Mallampati class** | I–IV, selected visually |
| **Mouth opening (inter-incisor distance)** | in cm |
| **Thyromental distance** | in cm |
| **Neck mobility** | Full / Limited / Fixed |
| **Upper lip bite test (ULBT)** | Class I / II / III |
| **Cormack–Lehane grade** | I / IIa / IIb / III / IV |
| **Difficult airway history** | Flag + free text for details |

## Preoperative vitals

Record the patient's vital signs at the time of assessment:
- Blood pressure (systolic / diastolic, mmHg)
- Heart rate (bpm)
- SpO₂ (%)
- Temperature (°C)
- Respiratory rate (/min)
- ECG rhythm

## Risk scores

**ASA classification** (required) — I through VI, with an emergency modifier (ASA-E).

The following scores are **calculated automatically** as you fill in the relevant sections of the form:

| Score | What it predicts |
|-------|-----------------|
| **RCRI** (0–6) | Major adverse cardiac events |
| **Apfel** (0–4) | Postoperative nausea and vomiting (PONV) |
| **STOP-BANG** (0–8) | Obstructive sleep apnoea risk |

## Laboratory results

The Labs section contains a catalogue of 100+ perioperative-relevant tests organised across nine categories:

| Category | Examples |
|----------|---------|
| Haematology | Hb, Hct, WBC, Platelets, MCV, full differential |
| Coagulation | PT/INR, aPTT, Fibrinogen, D-dimer |
| Electrolytes | Na⁺, K⁺, Cl⁻, Ca²⁺, Mg²⁺, Phosphate |
| Biochemistry | Creatinine, eGFR, Glucose, HbA1c, Lactate |
| Liver | ALT, AST, ALP, GGT, Bilirubin, Albumin |
| Cardiac | Troponin, CK-MB, BNP, NT-proBNP |
| Blood Gas | pH, PaO₂, PaCO₂, HCO₃⁻, BE, SaO₂ |
| Thyroid | TSH, Free T4, Free T3 |
| Inflammatory | CRP, ESR, Ferritin, Procalcitonin |

**To add a result manually:** click a category to expand it, click a test name to add it to the results table, then enter the value. The unit is pre-filled automatically.

**To search:** type in the search box above the categories — the list filters in real time.

**Reference ranges:** each result is compared to a standard reference interval. Values within range are shown in green; out-of-range values are flagged in amber with the value bolded. The flag is informational — clinical interpretation is always the clinician's responsibility.

**AI lab scan:** click **Scan lab report** to upload a photo or scan of a printed laboratory result. Mistral AI reads the image and extracts test names, values, and units into a preview panel. Check the results you want to import and click **Add selected**. Tests already in your list are skipped automatically.

:::info Privacy
Lab images are sent to Mistral AI (EU-hosted) for text extraction. Avoid uploading images that show patient names or ID numbers. A notice is displayed above the upload button as a reminder.
:::

All entered lab results appear in the printed protocol.

## Premedication

Record evening and morning premedication if prescribed.

## AI pre-operative advisor

At the bottom of the preoperative form, you can optionally enable the **AI clinical analysis** for this case. It is **disabled by default**.

When enabled, click the **AI Clinical Analysis** button to receive a structured pre-operative assessment covering ASA classification, technique recommendation, airway management, preparation, and drug considerations.

:::info Privacy
Only structured clinical fields are sent to the AI provider (Mistral La Plateforme, EU-hosted). Free-text fields (team notes, airway notes, family history details) are never forwarded. Your consent is recorded in the audit log.
:::

## Saving

The preoperative form auto-saves as you type. When all mandatory fields are complete, click **Save & continue** to move to the intraoperative form. Mandatory fields are: age, sex, height, weight, diagnosis, planned procedure, and ASA score.
