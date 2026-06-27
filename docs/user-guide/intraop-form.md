---
sidebar_position: 4
title: Intraoperative Form
---

# Intraoperative Form

The intraoperative form is where you document the anaesthesia in real time — or fill it in retrospectively. The centrepiece is the **live intraoperative timetable**.

## Month/year and timing

- **Month / Year** — select the month and year of the procedure. No exact date is stored.
- **Start time** — click **Start Case** to stamp the current time automatically, or type it manually (HH:MM format)
- **End time** — click **End Case** when the procedure finishes, or enter manually

When **Start Case** is clicked, a live orange clock bar appears in the timetable and the case status changes to **In theatre** on the dashboard.

:::tip Midnight crossing
If the case crosses midnight (e.g. starts at 23:30, ends at 01:45), click the **+1 day** button next to the end time to indicate the case ran into the following day.
:::

## Anaesthesia technique

Select one or more techniques:

| Technique | Description |
|-----------|-------------|
| General Inhalation | Volatile agent as primary technique |
| General IV (TIVA) | Total intravenous anaesthesia |
| General Combined | Combination of inhalational and IV |
| Spinal | Single-shot or continuous spinal |
| Epidural | Lumbar or thoracic epidural |
| Combined Spinal-Epidural (CSE) | Combined technique |
| Peripheral Nerve Block | Any peripheral block |
| Local Anaesthesia | Infiltration or topical |
| Sedation | Monitored anaesthesia care |

## Airway management

Based on the selected technique, the airway section shows relevant options:

- **Airway device** — Face mask, Oral airway (OPA), Nasal airway (NPA), LMA, Oral ETT, Nasal ETT, Double Lumen Tube (DLT), Endobronchial tube, Surgical airway
- For ETT: tube size (mm) and cuffed/uncuffed
- For DLT: type, side, and size (Fr)
- **Airway tools** — Direct laryngoscopy, Video laryngoscopy, Fibreoptic bronchoscopy, Bougie, Stylet, Awake intubation, Retrograde intubation
- **Cormack–Lehane grade** — shown when direct or video laryngoscopy is selected
- **Ventilation modes** — VCV, PCV, PRVC, PSV, CPAP, BiPAP, etc.

## Monitoring

Tick all active monitoring modalities:
- Standard: ECG, SpO₂, NIBP, EtCO₂, Temperature
- Extended: IBP, CVP, PA catheter, TEE, BIS, Entropy, NIRS, SSEP/MEP, TOF/NMT, BGL, ABG
- Other: Urinary catheter, Nasogastric tube

## Vascular access

Add each IV line, central line, or epidural catheter:
- Site (peripheral IV, CVC — internal jugular, subclavian, femoral; arterial line — radial, femoral, brachial; epidural)
- Size (G for IV, Fr for central lines)

## The intraoperative timetable

The timetable is the visual heart of LOSPOR. It displays everything that happens during the case on a shared timeline, with columns representing 5-minute intervals.

### Vital signs

Click a column in the **vital signs graph** to enter or edit values for that time point:
- Systolic and diastolic blood pressure (displayed as a red line)
- Heart rate (displayed as a green dashed line)
- SpO₂ (displayed as a cyan line)
- EtCO₂ (optional)

The graph updates in real time as you enter data.

**AI monitor scan:** click the camera icon to upload or photograph your anaesthesia monitor screen. Mistral AI reads the display and extracts visible vital signs values into the entry fields. Review before saving.

:::info Privacy
Monitor images are sent to the configured AI provider for text extraction and are not stored by LOSPOR beyond the request. Avoid uploading images that show patient-identifying information.
:::

### Gas management

Record the fresh gas flow and composition:
- **FGF** — fresh gas flow in L/min
- **Carrier gas** — Air or N₂O (oxygen is always implicit)
- **FiO₂** — inspired oxygen fraction (%)

### Drugs (bolus)

Click **+ Drug** in the timetable to log a bolus drug administration:
- Scenario pills for common workflows such as induction, relaxants, local/regional anaesthesia, opioids, vasoactive drugs, PONV/GI, obstetrics, and rescue drugs
- Favourite drugs selected in Settings
- Browse-all search across the canonical drug catalogue
- Dose and unit (mg, mcg, mL, etc.)
- Route-specific controls where applicable; for example IV lidocaine is entered as a dose, while local/neuraxial/peripheral block lidocaine uses concentration and volume
- The bolus appears as a vertical marker at the selected time point
- Each drug event stores the **ATC code** for the administered drug, enabling research queries by pharmacological class

### Infusions

Add a continuous infusion with start time, end time, drug name, rate, and unit. Mobile/PWA uses the same scenario/favourites/browse pattern as bolus drugs. It appears as a hatched bar spanning the infusion duration.

### Volatile agents

Record the volatile agent (Sevoflurane, Desflurane, or Isoflurane) used during the case. It appears as a shaded bar across the case duration.

### IV fluids

Add fluid boluses or infusions with type (crystalloid, colloid, blood product) and volume. Each appears as a dotted bar in the event strip.

## Position

Select the patient position(s) used during the case: Supine, Prone, Lateral, Gynecological, Trendelenburg, Beach chair, Lithotomy, Jackknife, etc.

## Premedication

Record the premedication given before the procedure (if different from what was prescribed in the preoperative form).

## Fluid balance

At the bottom of the form, a summary of total fluids is automatically calculated from the timetable:
- Crystalloids (mL)
- Colloids (mL)
- Blood products (mL)
- Urine output (mL)

You can also enter these directly.

## Complications

Free text field for intraoperative complications. Common complications (hypotension, bradycardia, bronchospasm, etc.) can be selected from a preset list.

## Saving

The intraoperative form auto-saves continuously. When complete, click **Save & continue** to proceed to the postoperative form.

## Mobile

On mobile, the intraoperative form uses the same tab-based layout (Overview, Anaesthesia, Timetable/Chart). The timetable adapts to screen width automatically — all controls remain fully reachable on a phone screen.

The **Log** tab is designed for fast, thumb-friendly event capture. Vital signs entry opens a dedicated sheet with large input fields. Drug and fluid logging use bottom sheets with preset options and confirmation actions.
