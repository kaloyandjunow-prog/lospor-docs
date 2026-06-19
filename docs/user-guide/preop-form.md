---
sidebar_position: 3
title: Preoperative Form
---

# Preoperative Form

The preoperative form captures all pre-anaesthesia assessment data. It is the first step in every case.

## Mobile section dashboard

On mobile, the preoperative form opens with a **section dashboard**. It shows seven sections — Patient, Case, Meds & Safety, Airway, Vitals, Risk, and Labs — with a completion indicator for each. Tap any section to open its focused editor. Use **Back to sections** to return to the overview.

A sticky **section rail** at the top lets you jump between sections without going back to the dashboard. A side scroll indicator marks your position in longer sections.

## Patient demographics

Enter the patient's:
- **Age** (years)
- **Sex** (Male / Female / Other)
- **Height** (cm) and **Weight** (kg) — BMI is calculated automatically
- **Blood type** and **Rh factor** (optional)

**IBW (Ideal Body Weight)** and **ABW (Adjusted Body Weight)** are calculated automatically from height, weight, and sex. These are important for drug dosing in obese patients.

### Mobile numeric entry

On mobile, numeric fields use different controls depending on clinical context:

- **Age, height, weight, and airway distances** — an iOS-style wheel picker for fast scrolling, with an optional custom keypad for precise entry.
- **Vitals (blood pressure, heart rate, SpO₂, etc.)** — minus/plus steppers with a thin slider, plus a custom keypad accessible by tapping the value.

Both comma (`8,5`) and dot (`8.5`) decimals are accepted.

## Case details

- **Diagnosis** — search by ICD-10 code, English label, Bulgarian label, or clinical synonym. The local ICD-10 database is enriched with ICD-10CM clinical synonyms (e.g. searching "heart attack" returns I21 Acute myocardial infarction). Results show the clinical group name as the primary label and the ICD code below it.
- **Planned procedure** — search for the surgical procedure. Results show the procedure group as the primary label and the procedure code and domain below it.
- **Team notes** *(optional)* — free text for roles, theatre number, or any case-specific reminders. Do not enter names or ID numbers here.

On mobile, both searches use **inline dropdown autocomplete** — results appear below the search field without opening a separate screen.

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
| Haematology | Hb (g/L), Hct (ratio), WBC, Platelets, MCV, full differential |
| Coagulation | PT/INR, aPTT, Fibrinogen, D-dimer |
| Electrolytes | Na⁺, K⁺, Cl⁻, Ca²⁺, Mg²⁺, Phosphate |
| Biochemistry | Creatinine, eGFR, Glucose (mmol/L), HbA1c, Lactate |
| Liver | ALT, AST, ALP, GGT, Bilirubin, Albumin |
| Cardiac | Troponin, CK-MB, BNP, NT-proBNP |
| Blood Gas | pH, PaO₂, PaCO₂, HCO₃⁻, BE, SaO₂ |
| Thyroid | TSH, Free T4, Free T3 |
| Inflammatory | CRP, ESR, Ferritin, Procalcitonin |

**To add a result manually:** click a category to expand it, click a test name to add it to the results table, then enter the value. The unit is pre-filled automatically.

**To search:** type in the search box above the categories — the list filters in real time.

**Reference ranges:** each result is compared to a standard reference interval. Values within range are shown in green; out-of-range values are flagged in amber with the value bolded. The flag is informational — clinical interpretation is always the clinician's responsibility.

### AI lab scan

Click **Scan lab report** to upload a photo or scan of a printed laboratory result. Mistral AI reads the image and extracts test names, values, and units into a preview panel. Check the results you want to import and click **Add selected**. Tests already in your list are skipped automatically.

The AI scan recognises only tests in the LOSPOR catalogue and normalises all values to canonical units (e.g. Hb in g/L, glucose in mmol/L). Any result the AI extracts that does not match a catalogue entry is silently discarded — only recognised, correctly-named results are shown in the review panel.

On mobile, **Scan lab report** supports both camera capture and gallery upload. Extracted values are shown in a review sheet before anything is added to the case. Manual lab search and value entry remain available.

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

The preoperative form auto-saves as you type. When all mandatory fields are complete, click **Save & continue** or **Continue to intraoperative** to move to the intraoperative form. If required fields are missing, the app shows which fields need attention.
