# Intraoperative suggestions control on a Hospital appliance

Status has one page, **SPS — Smart Prediction System** (`/status/control/intraop`,
on the Clinical side of the control pages), for everything the hospital decides
about the intraoperative suggestions. What the suggestions are, and what they
never do, is described in [Intraoperative suggestions](../intraoperative-suggestions.md).

Like every Status control, a change needs the appliance-operator password again
and a reason of at least ten characters, and is audited. Open records pick the
settings up the next time they are opened.

## The master switch

**Use SPS.** Off, there are no questions and no suggestions anywhere, whatever is
chosen below. The online demo has no Status; it runs with everything on.

## Groups and single automations

The groups are treatment cards, reverse questions, reading questions, laboratory
questions, reminders and timed follow-ups. Each has a switch, and a group off
switches all of its lines off. Open a group to see its lines (for example one per
treatment card, one per reverse rule); each line has its own switch, and a line
that is on runs only while its group is on.

Beside each line Status shows **how often it was taken up and how often put
away**, over the last days and cases the page names. A line that is mostly put
away may be noise: switch it off here. Reminders and follow-ups count only when
put away. The figures are read from the saved charts and carry no patient data.

Clinicians can also turn a group off for themselves in Settings; Status decides
what they can choose from.

## Learned succession

A table lists what usually comes next after an event, by technique, learned from
how events were logged at this hospital and starting from a seed set: the event,
what follows, and the counts behind it. It is read-only. Use it to see why Likely
now offers what it does; to stop it offering something, switch that line off.

## Questions from the vital signs

- **Ask about unusual heart rate and blood pressure** turns the vitals questions
  on or off.
- A reading is unusual when it falls in the lowest or highest share of **this
  hospital's own readings** for the patient's age band. A table sets the share per
  band and sign (low and high end); smaller shares ask less often.
- **Cases a band needs** before its own statistics are used. Until then only the
  fixed rules ask.
- **Hypertension** is judged this far above the patient's baseline (systolic or
  mean), where the baseline is the first reading, taking the higher of the cuff
  and the arterial line.

The counts come from **finalised cases only**, kept as a running tally, so a case
in progress never feeds the limits it is measured against.

## Monitor readings due

Minutes after a monitor's last reading before the Monitoring screen marks the next
as due, per monitor, from 1 to 120.

## Dantrolene vials in stock

The malignant hyperthermia card draws the vials to open. Tick the vial sizes the
hospital stocks (a mix is normal, for example 20, 120 and 250 mg). The card plans
each dose on its own from those sizes with the fewest vials, so nothing is opened
that is not needed: 280 mg from 250 + 20 is one 250 and two 20s. At least one
size is required.

## Audit

Every change asks for a reason and is audited like the other Status controls. Patient data and case codes are never part of an audit entry.
