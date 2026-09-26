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

### How times are recorded

The chart is built from the entries you save, and every screen, the printout
and the research export read it the same way.

- **An entry takes the time of the row you make it in.** In the row the orange
  "now" line is in, the exact minute is recorded; in any other row, the start
  of that row. A stop entered in the 21:30 row records 21:30, even if you tap
  it at 22:19.
- **A running infusion, fluid or agent ends at the "now" line**, not a row
  beyond it, and its total counts only the time it actually ran.
- **Entries that cannot be right are refused, with a message:** a stop before
  its start, a change or stop of something that is not running, a stop placed
  before a later change of the same item, and vital signs in the future.
  Restarting something you stopped is fine.
- **Deleting a start deletes its rate changes and its stop with it.**

### Planned entries

You can enter a drug, an event, a start or a stop for a later time, for
example a block planned ten minutes ahead. It is shown as a marker (dashed on
the web) and counts for nothing until its time comes; then it counts as given.
A stop planned for later is marked on the running bar.

### Ending and resuming the case

**End case** lists everything still running. For each, choose **Stop** (it
stops at the end time) or **Continue postoperatively** (it keeps running into
recovery, and every total, such as fluid volumes and infusion amounts, is
counted only up to the end time). Any planned entry still after the end must
be marked **Happened** (moved to the end) or **Didn't happen** (deleted); the
case cannot be finalised while one remains.

**Resume** is offered for 30 minutes after the end, also when the case is
opened again later, and offers to take back the stops End case made.

A case started 48 hours ago that was never ended, has had nothing saved to it
for 48 hours and is not open on any screen ends on its own, at its last
recorded entry. It says so when you open it, and **Resume** takes the end back
at any time. A case charted afterwards, with a start typed days back, is never
ended while you work on it.

### A case open on another screen

One screen edits a case at a time. Any other screen with the case open says
who is editing it and saves nothing, including chart entries and vitals
autofill; choose **Take over editing** to change the case there.

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

### Pediatric safeguards

Pediatric cases never inherit adult drug doses, infusion rates,
concentrations, fluid quick values, gas settings, volatile-agent settings,
equipment calculations, or ventilation settings. Manual charting remains
available. A suggested value is shown only when its exact pediatric profile
has completed clinical review.

See [Pediatric mode](../pediatric-mode.md).

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

Two or more agents can run at once, each on its own bar (its own lane on the web). Starting an agent while another runs asks whether to **switch** (the other is stopped at the same time) or **run both**.

### IV fluids

Add fluid boluses or infusions with type (crystalloid, colloid, blood product) and volume. Each appears as a dotted bar in the event strip.

Pick the product itself and, where offered, its strength (saline 0.9% or 3%, HES 6% or 10%, mannitol 10% or 15%): the research export codes each fluid by exactly that, so a litre of saline and a litre of Hartmann's are told apart. Blood products are entered one unit at a time, by volume; each unit is exported as the product given and its transfusion.

## Position

Select the patient position(s) used during the case: Supine, Prone, Lateral, Gynecological, Trendelenburg, Beach chair, Lithotomy, Jackknife, etc.

## Premedication

Record the premedication given before the procedure (if different from what was prescribed in the preoperative form).

Each drug has its own dose, range and step for each route. Changing the route replaces the dose with that route's own, even a dose you typed: oral and intravenous doses of the same drug differ up to tenfold. Adult ketamine is recorded as the calculated mg from the recorded weight. Home medicines (warfarin, insulin, levothyroxine, a clonidine patch) start empty, as prescribed. A tablet strength the stepper cannot reach can always be typed.

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

The intraoperative form auto-saves continuously. Vital signs entered in the timetable are stored the same robust way on web and mobile — each 5-minute column is persisted as its own record the moment you finish typing it, so nothing depends on leaving the page open. If the connection drops, changes queue locally and sync automatically when it returns.

Each section is sent only when something in it changes. Premedication saves as
you add, remove or mark it N/A. Urine output and blood loss save shortly after
you enter them, and at once when you leave the tab or the form. Opening the
form or switching tabs sends nothing.

When complete, click **Save & continue** to proceed to the postoperative form.

## Mobile

On mobile, the intraoperative form uses the same tab-based layout (Overview, Anaesthesia, Timetable/Chart). The timetable adapts to screen width automatically — all controls remain fully reachable on a phone screen.

This live screen is for cases **in progress**. Once a case is finished it is locked, and opening its timetable from the case summary shows a **read-only viewer** instead — the printed record's chart, with pinch-to-zoom. See [Protocol & Printing](./printing.md#viewing-the-chart-on-a-phone).

The **Log** tab is designed for fast, thumb-friendly event capture. Vital signs entry opens a dedicated sheet with large input fields. Drug and fluid logging use bottom sheets with preset options and confirmation actions.
