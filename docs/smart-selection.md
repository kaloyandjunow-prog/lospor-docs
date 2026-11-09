---
title: Smart and Legacy selection
---

# Smart and Legacy selection

Several intraoperative screens come in two forms. **Smart** is the faster,
suggestion-aware surface and is the default. **Legacy** is the complete earlier
surface. Both write the **same canonical record**: a clinician can switch at any
time and nothing recorded is lost or reinterpreted.

| Screen | Smart | Preference key |
| --- | --- | --- |
| Airway | The airway tab with per-device tools, the details panel opening under the selected card | `airwayScreen` |
| Vascular access | Line types with the time they were placed; a ward line keeps the time it was given, if any | `vascularScreen` |
| Monitoring | A grouped list, suggestions from the case, due readings, and a reading chip that opens the timetable entry | `monitoringScreen` |
| Equipment | What each item does; suggestions compared with what was actually recorded; preparation markers kept apart from clinical use | `equipmentScreen` |
| Technique | The technique with its finding, the side of a block and the unilateral spinal | `techniqueScreen` |
| Events | A calmer list with **Likely now** and search by the words colleagues use, in English and Bulgarian | `eventsScreen` |
| Fluid status | The Hybrid summary: timetable aggregates read-only, only urine output and blood loss editable | `fluidsScreen` |
| Event log | The filterable Smart Timeline stream | `eventLogScreen` |

Every key holds `"smart"` or `"legacy"`. They live in the account's
`User.preferences` JSON, so the choice follows the clinician across the web, the
phone and the PWA. The API accepts only those two values and keeps the sibling
keys it does not know.

## What stays the same

- **One record.** Smart airway selection writes the canonical device list and its
  legacy compatibility fields in the same save. An explicit empty list clears
  both, so a removed device is not reconstructed on the next load.
- **One list of options.** Smart airway uses the same configured devices and
  instruments as Legacy, not a smaller built-in list. Choosing «Без намеса в
  дихателния път» clears the selected devices and instruments; recording a device
  clears that state.
- **The same events.** Adding a device records the matching intubation,
  reintubation, LMA or DLT event; confirming a line placed by the anaesthesia team
  records the IV line, arterial line, CVC or PICC event. A urinary catheter is its
  own device event.
- **Read-only aggregates.** The fluid summary never edits a total that the
  timetable derives.

## Layout preferences

The case sidebar, the per-stage section and scroll layouts, the timetable layout
(expand or scroll) and whether the vitals chart is expanded are account-wide in
the same way. Legacy browser and device keys are imported once without replacing
sibling settings. The web sidebar is shown on the phone as web and tablet only.

## For developers

- The selection rules (what Smart offers and how it is grouped) are in Core, so
  the web and the phone cannot offer different things. Each client only draws
  them.
- A new Smart surface adds one `…Screen` preference with the values `smart` and
  `legacy`, defaults to `smart`, and keeps its Legacy form working until it is
  retired.
- A Smart screen never writes a field Legacy cannot read.
