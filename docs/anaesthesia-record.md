---
title: The anaesthesia record
---

# The anaesthesia record

The case summary on the web, the printed record, the server PDF and the case
summary on the phone and in the PWA are one document, the **anaesthesia
record**. They are drawn from the same Core models, so the screen and the paper
cannot disagree. The older two-sheet print, with its fixed landscape pages and
continuation sheets, is gone.

## What is on the record

1. **A portrait first page.** The patient, risk, airway assessment, history and
   allergies, airway, vascular access and technique, then the **event log** and
   the **vitals every five minutes**.
2. **One landscape page with the whole timetable.** The vitals graph, a lane for
   every drug with a diamond and the amount for each dose, bars for infusions,
   agents, gas (FGF) and fluids, and the episodes as shaded bands. The chart is
   never split by time, however long the case.
3. **A closing portrait page.** The episodes with what was given during each,
   drug totals, fluid balance, intraoperative laboratory results, recovery, and
   then the patient's name and ID with room to write, and the signatures.

The record is titled with the hospital's name and is light paper in every theme.
Pages grow with the case; nothing is cut off. Name and ID stay blank on purpose:
they are written by hand after printing.

### The event log

Every charted entry in time order, in the case's time zone: drugs, infusions,
fluids, agents, gas (FGF), jet ventilation, position, clinical events and
complications. Vitals are in their own table and a hidden "Not now" answer to a
prompt is never listed.

- A **deleted entry stays**, struck through, at the minute it was charted for,
  with the minute it was deleted. The saved events keep no reason for a
  deletion, so none is printed.
- An entry made from a **treatment card** carries the card's name.
- A complication shows its time and, for an episode, its end.

If a deletion is undone, the entry returns as a new one, so the log shows the
deleted original and the restored entry.

### The timetable

One lane per drug, in the order each was first given, with every dose. A dose's
label sits beside its diamond, or on the track above or below it when a
neighbour is in the way; if no track has room the label is dropped (the log still
has the dose). Infusions and agents are cut where the rate or concentration
changed, and each piece carries the value in force. One lane per fluid holds its
bags. Episodes are bands that run through the graph and the lanes.

Column times come from the saved start instant and the case's time zone. A case
from before the start instant was kept starts at its first entry.

### Titles and wording

The title is the hospital's own name, as in "E2E Test Hospital · Anaesthesia
record" or «… · Анестезиологичен протокол». On a Hospital appliance an
administrator changes it in Status (see [Status](./appliance/status-monitor.md));
it is the institution's name, so it changes wherever the institution is named,
finished records included. The online demo shows the account's institution.

All fixed words come from one table in Core (`@lospor/core/record-labels`) in
English and Bulgarian. Some of the agreed Bulgarian: **Дневник** (the event
log), **Времева линия** (the timetable), **Съдов достъп**,
**Осигуряване на дих. пътища**, **Възстановяване от анестезия**. The gas lane is
«FGF» in English and «Поток на свежи газове» in Bulgarian. Units stay in
English.

## How it is built

| Core module | What it holds |
| --- | --- |
| `record-labels` | The fixed words, English and Bulgarian |
| `record-log` | The event log (deleted entries included) and the episodes with what was given |
| `record-timetable` | The whole-case timetable as data: vitals, lanes, bars, episode bands |
| `record-chart-layout` | That timetable as drawing instructions: rectangles, lines, paths and text |

The web draws the instructions as SVG and the phone with `react-native-svg`, so
a label never lands in a different place on one client. Core knows no React.

On the web the record is `src/components/record`. The summary page adds the
review bar above it; the print page shows the record alone. The page rules
(portrait pages, one landscape page, a footer with the hospital and
"page N of M") are in CSS, and the server PDF uses them.

## Reading the case

| Request | Returns |
| --- | --- |
| `GET /v1/cases/{id}?deleted=1` | The full case plus `deletedEvents`: the deleted entries as they were, each with `deletedAt` (absent on an entry deleted before 9.13.0). Of a logical event only the latest version counts, and an entry that is active again is not listed. |
| `GET /v1/cases/{id}?view=timetable` | The narrow read for the timetable viewer: id, case code, status, clinical mode, the planned procedure's name and the chart with its start, end, legacy start and zone. Add `deleted=1` for `deletedEvents`. Same read rule as the full read. About 13 KB against 148 KB for a long demo case. |
| `GET /v1/cases/{id}/print-data` | The case for the print page, always with `deletedEvents`. |
| `GET /v1/cases/{id}/pdf` | The record as an A4 PDF rendered in headless Chrome: portrait pages with one landscape page for the timetable. |

The PDF waits for the record to be on the page and takes its page sizes from the
print CSS, so it needs no landscape flag.

## On the phone

The case summary shows a timetable card, the event log, the vitals behind a
**View table** button (a hundred rows are too many for a phone screen) and the
episodes. The read-only **timetable viewer**, opened from the Chart button on the
intraoperative screen and from a finished case, draws the same chart for the
whole case; pinch or − / + widens it and it scrolls sideways. Zoom never hides
data. It reads only what it draws, with the narrow request above.

## Laboratory results

Only the intraoperative results are printed, grouped by draw, each headed with
its time. The preoperative panel is the hospital's own and is not printed again.
A result with no time is its own group. When results are imported from the
hospital system, a result the hospital sent no time for can take the moment it is
added (`undatedLabsAt` in Core's `applyEhrSelections`); the preoperative panel
stays undated.

## Developer notes

- Do not put a fixed height or `overflow: hidden` on a record page.
- The print CSS makes every ancestor of the record a plain block while printing.
  Pages of different sizes are only laid out at their own width when no ancestor
  is a flex container.
- A new field belongs in the model first (Core), then in each client's drawing.
