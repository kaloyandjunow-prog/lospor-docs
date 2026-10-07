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
- **Deleting a start deletes its rate changes and its stop with it.** On the
  phone, a delete offers **Undo** in the bar above the timetable, as an add
  does; Undo puts the entry back at the same time, a start with its changes and
  stop. On the web, **Ctrl+Z** undoes the last change, a delete included.
- **"Now" is the server's time, not your device's.** A phone or computer whose
  clock is a few minutes off still puts the now line, and what is planned or
  given, where they belong. A time you pick is never changed.

### Planned entries

You can enter a drug, an event, a start, a rate or gas change, or a stop for a
later time, for example a block planned ten minutes ahead. It is shown as a
marker (dashed) and counts for nothing, in no total, until its time comes;
then it counts as given from its own minute. A stop planned for later is
marked on the running bar.

To plan a change to something already running, open a later row: what will
still be running then is shown there, dashed (on the web, the running bar
continues past now). Choose it to change its rate or settings, or stop it, at
that row. This changes the same infusion; do not start the drug again, which
would add a second infusion counted alongside the first. Nothing runs on past
a planned stop or after the case has ended. A planned change names its time
("Propofol · at 14:35"), and a closed row shows what is planned there.

### A stop entered ahead of its time

Stopping something for a time still to come (you expect the infusion to run
for another half hour) keeps the bar running until then. When that time
comes you are asked, above the chart and in the stop's own row:

- **Stopped** — it stopped at that time.
- **Still running** — the stop is taken back and the bar runs on.

The question stays until it is answered. End case asks it too, and a case
cannot be finalised while one is open. Moving the stop to a new time asks
again when that time comes.

### Ending and resuming the case

**End case** lists everything still running. For each, choose **Stop** (it
stops at the end time) or **Continue postoperatively** (it keeps running into
recovery, and every total, such as fluid volumes and infusion amounts, is
counted only up to the end time). Any planned entry still after the end must
be marked **Happened** (moved to the end) or **Didn't happen** (deleted), and a
stop entered ahead that is still unanswered is asked about there too; the case
cannot be finalised while one remains.

Before it ends anything, **End case** checks the intraoperative record the way
finalisation will. Anything that would stop the case from being finalised,
such as a missing technique or no vital signs on the chart, is listed first,
each with a link to where it is fixed, and the case is not ended until it is
put right. Items that only deserve a look ask once and let you end the case.

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

If the same entry was changed on two screens (one of them offline), the change
made last wins, whichever reaches the server first. The other is listed as
refused, saying so.

### Whether each entry is saved

Every item on the chart says whether it has reached the server: a small clock
while it waits or is being sent, nothing once it is saved, and a red cross if
the server refused it. Changes are sent in the order you made them, so a
deletion never arrives before the entry it deletes.

A refused change is listed above the chart, with its time, what it was and
why (for example, a later change made on another screen), until you mark it
**Seen**. While part of a total has not reached the server yet, the total is
shown with "≈"; the number itself does not change.

### Vital signs

Click a column in the **vital signs graph** to enter or edit values for that time point:
- Systolic and diastolic blood pressure (displayed as a red line)
- Heart rate (displayed as a green dashed line)
- SpO₂ (displayed as a cyan line)
- EtCO₂ (optional)

The graph updates in real time as you enter data.

**Values worth a second look** are marked in amber with a short note, without blocking the save: systolic pressure below 60 or above 300 mmHg, diastolic above 150 mmHg, heart rate below 40 or above 250, SpO₂ below 80 %, EtCO₂ below 25 or above 60 mmHg (3.3 and 8 kPa), and temperature below 28 or above 41 °C.

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

**Totals** use the patient's own measurements. A per-kg drug is counted on the
ideal body weight or the actual weight, as the hospital's drug library sets
for that drug; the choice is recorded when the infusion starts, so a later
change to the library does not alter what was given. A per-m² drug is counted
on body surface area. A total counts the minutes the infusion actually ran and
adds mg and mcg together. If a drug set to ideal weight has only the actual
weight to go on, the total says so with "(TBW)". The same total is shown on
the phone, the web and the printed record.

### Recorded allergies

A bolus or an infusion is checked against the allergies recorded in the
preoperative form, whether typed there or accepted from the hospital system.
If the drug matches one, LOSPOR asks before it is charted, naming the allergy
and how it matches: **the same drug**, **the same drug class** (for example
ampicillin with a penicillin allergy) or **a possible cross-reaction** (for
example a cephalosporin with a penicillin allergy, or between neuromuscular
blockers).

- **Give anyway** charts the dose with a note that you saw the allergy. A
  repeat of that dose keeps the note.
- **Don't give** charts nothing. A declined infusion is never shown as
  running.

The question comes only for a dose that can be charted: on a case that has
not been started yet, the dose is refused first with "start the case first".
On the phone the question opens as a sheet with the same two buttons; closing
the sheet any other way counts as **Don't give**.

The check never blocks: the decision is yours. Allergies it cannot recognise
(an unfamiliar name with no drug code) are listed as **not checked
automatically**, beside the preoperative summary on the web and on the
Equipment tab on the phone. A dose that matches an allergy and has no note
appears as an item worth a look before finalisation.

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
