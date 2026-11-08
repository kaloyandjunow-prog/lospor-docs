---
title: Intraoperative suggestions (SPS)
---

# Intraoperative suggestions (SPS)

The Smart Prediction System (SPS) helps document and treat during a case. It
**suggests; it never writes a record by itself.** Every entry comes from a
clinician action. The rules live in Core (`@lospor/core/intraop-suggestions`), so
the web app and the phone ask the same things and write the same entries.

## What it offers

| Group | What the clinician sees |
| --- | --- |
| **Treatment cards and checklists** | After a complication, a card with the doses for it, prefilled for this patient: the adult dose, or a weight-based dose for a child, capped, and empty when there is no weight. Branch choices (Unstable / Stable, Shockable / Non-shockable), rows that appear under a condition, a tick on rows charted since the onset, running totals. Cardiac arrest, LAST, malignant hyperthermia, anaphylaxis and latex, massive haemorrhage and hyperkalaemia are checklists. |
| **Reverse questions** | After a rescue drug, fluid or shock, a question: log the complication at that time? Thirteen rules, for example lipid emulsion (LAST), dantrolene, adenosine, shocks, a fourth red-cell unit within an hour or blood loss over 1,500 mL, rescue sugammadex, 1 mg adrenaline, naloxone or flumazenil. Quiet when the complication is already logged within 30 minutes; only the newest trigger asks. |
| **Reading questions** | From SpO₂ under 90 %, EtCO₂ over 60 mmHg, temperature under 36.0 °C, an EtCO₂ fall with an airway in, the malignant hyperthermia pattern, and residual blockade around extubation. They start an episode on a yes, closed at the first reading back or the case end. |
| **Laboratory questions** | From intraoperative laboratory results. |
| **Reminders** | Local anaesthetic given against the maximum by ideal weight, a malignant-hyperthermia-history warning before a volatile agent or suxamethonium, a latex banner, PONV prophylaxis at procedure end, a glucose check after two hours without a result, and Likely now. |
| **Timed follow-ups** | Cardiac arrest (rhythm check every 2 minutes, adrenaline, amiodarone, child doses by weight), LAST (repeat bolus, infusion), anaphylaxis, malignant hyperthermia (dantrolene every 10 minutes with the total in mg, mg/kg and the vials to draw) and the tourniquet (90/120 minutes, 60/75 for children, per site). Done on a checklist stops its timers. |

Everything waits in **one list**, "Waiting for your answer": cards wait until
something from them is given, then the questions, readings, labs, reminders and
due follow-ups. A card row opens its dosing controls in place. A card's gas
change or shock keeps the card's tag, so the export can flag it.

### Likely now and learned succession

The engine learns what usually comes next from how events were logged on the
hospital's own cases, starting from a seed set, and offers the one or two events
most likely now that are not yet charted. Structured airway and vascular records
count as evidence without double-counting an event they already explain.
**Dismiss** is a definitive, case-scoped answer; an ordinary clinical question
keeps **Not now**, which holds for 30 minutes.

## Who can switch it off

1. **Status** (hospital level): a master switch, a switch for each group and for
   every single automation. A group off switches all of its lines off. See
   [Intraoperative suggestions control](./appliance/intraoperative-suggestions-control.md).
2. **The clinician** (Settings > Automation): each group the hospital switched on
   is on until the clinician turns it off for themselves; the vitals questions
   have a switch per question (hypotension, hypertension, bradycardia,
   tachycardia). The whole set is sent each time, so one switch never clears
   another.

With nothing configured (the online demo has no Status) the defaults apply. A new
context link starts off for a clinician until they opt in.

## What it writes

An accepted suggestion writes the same events as charting by hand, with a
`suggestion` field naming the rule or card row it came from (for example
`card:Hypotension:ephedrine`). The field is exported as a flag so research can see
how often suggestions are taken. Doses charted afterwards during an arrest keep
approximate times and are spread inside the arrest when ROSC or Death is
recorded.

A dose written from one complication's card is never counted as a step of
another's.

## Where the data goes

- `GET /v1/intraop/automation` returns the settings and, only when the vitals
  questions are on, per-band reading counts for them.
- The API keeps a running tally of finalised readings for the vitals limits
  (`VitalStatTally`): finalising a case adds its readings and undoing
  finalisation takes them back, so opening the screen costs the same whatever
  the size of the database.
- Status shows, per automation, how each was received (accepted, dismissed, not
  now), read from the saved chart.

## Developer notes

- A new automation is added once, in Core's automation list. Nothing else needs
  to know it exists to list it in Status or Settings.
- A wiring test checks that every drug, fluid, infusion, event, complication,
  lab, route and automation line a card names exists. Add a card, then run it.
- Property tests cover the vial plan, the arrest-dose spread, succession
  learning and the vitals episodes.
