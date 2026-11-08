---
title: Intraoperative events and entries
---

# Intraoperative events and entries

The intraoperative chart is the saved **event log**. Everything below is an event
in that log; the timetable, the record and the export are projections of it. The
timeline rules (`@lospor/core/intraop-commands`) are shared by the web app, the
phone and the API, so an entry is accepted or refused the same way everywhere.

## Complications and shocks

- A **complication** is an event with its own time and an optional end. Where it
  came from is kept: the timeline, a question from the vitals, a question from
  SpO₂, EtCO₂ or temperature, or a suggestion card. A moment has no end; an
  episode from the vitals stays open until a reading comes back or the case ends.
- A **shock** (`defibrillation`) carries its energy in joules (1–360), whether it
  was synchronised, and the label Defibrillation or Cardioversion. A child's
  energy is prefilled from the RCUK 2025 reference.
- Complications and shocks are markers in the events lane, so a chart edit moves
  or deletes the event itself.
- A "Not now" to a question is a hidden `prompt_answer`. It is never drawn and
  never exported.

### The energy knob

The shock dialog turns a dial in the skin each clinician picks under
**Settings > UI**: **A**, a defibrillator knob over a ticked scale; **B**, a metal
knob in a ring of lights (one per 10 J); **C**, a selector that snaps to its
stops. Every skin works by finger, by mouse and by keys, and the ±1 / ±10
buttons set any value from 1 to 360 J. The mapping is in Core, so the web and the
phone draw the same dial.

## Vitals questions

Questions from the readings (hypotension, hypertension, bradycardia,
tachycardia) use age bands and fixed PALS 2020 rules for the low and fast limits.
Hypertension has no fixed limit: it is judged against limits taken from the
hospital's own readings per band and sign, and against a baseline from the first
reading. That baseline uses the higher of the cuff and the arterial line, the
same side hypertension is judged on.

Each question has a deterministic id, so a second screen or a retry cannot ask
twice. An episode closes at the first reading back inside both limits, or at the
case end. The hospital's limits come from **finalised cases only**; a case in
progress never feeds the limits it is measured against.

## Ending a case

**End case** stops everything that is running (infusions, agents, gas, jet
ventilation) and closes open vitals episodes. **End at** chooses another end
time and asks, in its own sheet, about entries made after it. Changing the end
of an ended case needs a coded reason and is audited
(`CASE_INTRAOP_END_CORRECTED`). A **death** charted on the screen sets the
postoperative destination to Deceased and offers End case as its own prompt; a
death that was already on the case when the screen opened asks nothing.

## Chart entries

| Entry | What is recorded |
| --- | --- |
| **Jet ventilation** | Its own lane, like gas: `jet_start`, `jet_change`, `jet_stop` with driving pressure (bar), rate (/min) and FiO₂. The log reads "Jet 2 bar · 150/min · FiO₂ 100 %". A second start is refused while one runs; End case stops it. On the rows it is a running bar. |
| **Tourniquet** | A body picker drawn for the age band (infant, child, adult woman, adult man) with a cuff spot on each upper arm, forearm, thigh and calf. The limb travels on the event (`site`), so "Tourniquet on" keeps the side. The timed follow-ups use it (see [suggestions](./intraoperative-suggestions.md)). |
| **Fresh gas flow** | 0–20 L/min on the slider, typed to 100. Carrier gas is air or N₂O (O₂ implicit) with FiO₂. |
| **Arterial line** | Invasive pressure (systolic, diastolic, mean) is stored beside the cuff and never in place of it. The cuff is called **NIBP** once the arterial line reads beside it. Both have lanes on the web and on the phone. |
| **BIS and TOF** | Read from a monitor photo (TOF corrected to a ratio) with the reading's time. |
| **Airway devices** | One list of device entries; a failed attempt or a replaced device stays on the list with its time ("неуспешен опит", "подмяна"). Failed vascular lines stay too. |
| **Urinary catheter** | Its own device event, with an insertion concept; it does not suggest itself. |
| **Technique sides** | The side of a block and of a unilateral spinal (with the baricity preset). |
| **Sedation** | A `Sedation started` event gives the chosen sedation technique its clinical time. |

## Event types added in this release

`complication`, `defibrillation`, `prompt_answer`, `jet_start`, `jet_change`,
`jet_stop`. Events also gain `suggestion` (the rule or card row an entry came
from), `site` (the tourniquet limb), `timeApproximate` (an arrest dose charted
afterwards) and the readings and suggestion complication sources.

## The export

The research export (OMOP) carries complication start and end times in
`CONDITION_OCCURRENCE`, invasive blood-pressure concepts, technique-side
modifiers, catheter concepts, the drug moment and standard route on drug
exposures, and a flag on an entry made from a treatment card. See
[Data & Research](./data-research.md).
