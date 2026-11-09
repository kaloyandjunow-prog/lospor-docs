---
sidebar_position: 6
title: Protocol & Printing
---

# Protocol & Printing

:::info Current guide
This legacy page has moved. Read the current [Printing guide](https://guide.lospor.org/clinician/printing), including the difference between demo PDF and Hospital browser printing.
:::

When a case is **finished** (closed after the postop form), LOSPOR generates the **anaesthesia record** that can be printed or saved as a PDF from a dedicated print page. The record is the same document as the case summary on screen. See [The anaesthesia record](../anaesthesia-record.md) for how it is built.

## The record

The record grows with the case: pages are never cut off. It is titled with the hospital's name and has three parts.

### Portrait first page

- **Header** — the hospital, procedure, diagnosis + ICD code, the day of the case and the case code
- **Patient and risk** — age, sex, blood group, height, weight, BMI, ASA, RCRI, Apfel, STOP-BANG, times
- **Airway assessment, history and allergies** — all parameters, comorbidities, current medications, allergies including latex
- **Airway, vascular access, technique and position** — devices and lines, with a failed attempt or a replacement kept and marked
- **Event log** (Дневник) — every charted entry in time order: drugs, infusions, fluids, agents, gas, events and complications. A **deleted entry stays**, struck through, with the minute it was deleted
- **Vitals** every five minutes (BP, HR, SpO₂, EtCO₂, temperature), a reading below 90 systolic in red

### One landscape page — the timetable

The whole case on one chart, however long: the vitals graph, a **lane for every drug** with a diamond and the amount for each dose, bars for infusions, agents, gas (FGF) and fluids, the patient's position, and the episodes as shaded bands. A target-controlled infusion shows its target and model ("Ce 4 mcg/mL · Schnider").

### Closing portrait page

- **Episodes** with what was given during each
- **Drug totals** per drug on the patient's weights, and the mL each infusion gave where its syringe is known; an infusion whose stop is still unconfirmed says so beside its total
- **Fluid balance** and the intraoperative **laboratory results**
- **Recovery** — Aldrete (all criteria + total), recovery vitals, pain, PONV, disposition and the handover instructions
- **Name and ID** of the patient, left blank with room to write by hand, and the **signature lines** — anaesthesiologist, anaesthesia nurse, surgeon

## Printing

Printing is available once a case is **finished**. The starting point is the same everywhere — when you close a case LOSPOR prompts **"Print case?"**, and you can also reach it any time from the **Print case** button on a finished case (web: the case list or the case summary; mobile: **long-press** the case in the list, or use the print action on the case screen). What happens next differs by device.

:::info Patient identity
The record leaves patient identity fields blank. Fill in the patient's name and ID number **by hand** after printing. This information is never entered into LOSPOR or stored anywhere.
:::

### On the web

A dedicated print page opens with the record ready, and two actions:

- **Download PDF** — LOSPOR builds the finished **A4 PDF on the server** (portrait pages, one landscape page for the timetable) and hands you the file. It always looks exactly like the printed record, on any device.
- **Print** — opens your browser's print dialog for printing directly to a printer. Set **Paper size** to A4, **Margins** to None, and enable **Background graphics**.

### On a phone

**Printing on a phone never leaves the app — you are never sent to the web app in a browser.**

Tap **Print case** and LOSPOR downloads the ready-made A4 PDF in the background, showing a **"Generating PDF…"** state while the server builds it. When it is ready your phone's normal **share sheet** opens, so you can:

- open the record in your PDF viewer,
- save it to your files,
- send it on (email, chat, hospital app),
- or print it to any printer your phone can reach.

The PDF is generated in the language you are using — if the app is set to Bulgarian, the record's labels arrive in Bulgarian.

## The preop summary and written consent

When the hospital switches them on (see
[Preop summary and consent](../appliance/preop-documents.md)), the preop
summary page can print an A4 portrait sheet, and with it the hospital's
written consent for anaesthesia.

- **On the web**, **Print** opens the print page, with **Download PDF** and
  **Print** as for the record.
- **On a phone**, the PDF is built on the server and opens in the share
  sheet.

The hospital chooses one of five layouts:

| Layout | What prints |
|--------|-------------|
| **A** | The ward's Document №2, sections I to V, with every answer LOSPOR holds printed in and the rest left for the pen; the consent follows in full |
| **B** (default) | A summary for the colleague taking over, then the whole consent in two columns |
| **C** | The consent describes only the techniques you tick before printing, and general anaesthesia as the fallback, each with a box for the patient's initials |
| **D** | A dense summary on the front, the consent as a word-for-word table on the back (double-sided) |
| **E** | The hospital's copy with the summary and signatures, and a large-print page with the fasting instructions and the full consent for the patient to take home |

Every layout:

- **Questionnaire:** prints the whole questionnaire with every answer, "no"
  and unanswered included.
- **Planned anaesthesia:** prints it, when recorded.
- **Fasting:** for a child, the fasting hours assigned at the visit.
- **Signers:** the consent names who signs, by the patient's age (Закон за
  здравето чл. 87). Under 14 a parent signs; from 14 to 18 the patient and a
  parent both sign.
- **Identity:** as on the record, the patient's name and ID are left blank
  for the pen.

Each consent print is recorded on the case, with the version and fingerprint
of the text on the sheet, its layout and, for layout C, the techniques it
described. A finalised case takes no new print record.

## Viewing the chart on a phone

The case summary shows the same record as the printed one: a timetable card, the event log, the **vitals every five minutes behind a View table button**, and the episodes. For a **finished** case, tapping the timetable card opens the **read-only timetable viewer**: the whole case on one chart (the vitals graph and a lane for every drug), with the episodes, the event log and the vitals table below it. The same viewer opens from the **Chart** button on the intraoperative screen of a case in progress. The case stays locked; nothing here can be edited.

**Pinch to zoom**, or use the **− / +** buttons, to widen the chart; it scrolls sideways. Zoom changes readability, never the data: every recorded dose, bar and reading is always drawn.

## Language

A record printed from a Bulgarian screen is in Bulgarian: the month, headings,
duration, page numbers, the footer date and the fluid balance (кристалоиди,
колоиди, биопродукти, диуреза, кръвозагуба). Units and drug names stay as they
were charted. Every time on the record, the footer date included, is in the
case's own time zone, whatever the printing computer's.

## Layout

The record is portrait A4 with **one landscape page** for the timetable. Pages grow with the case; there is no fixed number of sheets, and nothing is clipped.

## Light paper

The record is **always white paper**, on screen and in the PDF, whatever your theme. The review bar above the summary follows your theme.
