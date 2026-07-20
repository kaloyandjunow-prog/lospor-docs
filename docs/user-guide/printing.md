---
sidebar_position: 6
title: Protocol & Printing
---

# Protocol & Printing

When a case is **finished** (closed after the postop form), LOSPOR generates a **two-page anaesthesia record** that can be printed or saved as a PDF from a dedicated print page.

## The two-page record

### Page 1 — Intraoperative

The operation is charted **like a classic paper record**:
- **Header** — institution name, month/year, procedure, diagnosis + ICD code, patient demographics (age, sex, blood group, ASA), and blank identity fields (fill in by hand after printing)
- **Key-facts row** — technique, airway, ventilation, agent, position, timing, monitoring, IV access as compact chips
- **Intraoperative timetable** — vitals graph (every recorded point), clinical events flagged on the chart, **numbered drug pins** (① ② ③ …) at the exact administration time, a numeric vitals table (BP/HR/SpO₂/EtCO₂/Temp), and bars for agent, infusions, gas (FGF/FiO₂), fluids, and patient position. A case up to ~5 hours is one full-height chart; **longer cases continue onto a second half-height chart on the same page** ("CONTINUED"), just like a paper chart continuing onto a second grid — nothing is repeated and nothing gets squeezed. The numeric table samples at a comfortable interval per chart (e.g. every 15 min on a 12-hour case) while the graph, drugs and events always keep their exact recorded times.
- **Drug administration log** — every numbered pin resolved: time, drug, dose, plus totals per drug
- **Fluid balance**, **intraop notes**, and blank signature lines

### Page 2 — Pre- and Postoperative

The second page contains:
- **Diagnosis** and **planned procedure** (full text)
- **Risk scores** — ASA, RCRI, Apfel, STOP-BANG
- **Airway assessment** — all parameters
- **Preoperative vitals** — BP, HR, SpO₂, temperature, RR
- **Height / weight / BMI**
- **Comorbidities** — as labelled chips
- **Current medications**
- **Allergies** — including latex allergy flag
- **Laboratory results**
- **Postoperative recovery** — Aldrete score (all criteria + total), recovery vitals (BP, HR, SpO₂, temperature), pain NRS, PONV
- **Disposition** — WARD / PACU / ICU with notes
- **Handover instructions** — full text of all ticked items
- **Signature lines** — anaesthesiologist, anaesthesia nurse, surgeon

## Printing

Printing is available once a case is **finished**. The starting point is the same everywhere — when you close a case LOSPOR prompts **"Print case?"**, and you can also reach it any time from the **Print case** button on a finished case (web: the case list or the case summary; mobile: **long-press** the case in the list, or use the print action on the case screen). What happens next differs by device.

:::info Patient identity
The record leaves patient identity fields blank. Fill in the patient's name and ID number **by hand** after printing. This information is never entered into LOSPOR or stored anywhere.
:::

### On the web

A dedicated print page opens with the two-page record ready, and two actions:

- **Download PDF** — LOSPOR builds the finished **A4 landscape PDF on the server** and hands you the file. It always looks exactly like the printed record, on any device.
- **Print** — opens your browser's print dialog for printing directly to a printer. Set **Paper size** to A4, **Margins** to None, and enable **Background graphics**.

### On a phone

**Printing on a phone never leaves the app — you are never sent to the web app in a browser.**

Tap **Print case** and LOSPOR downloads the ready-made A4 PDF in the background, showing a **"Generating PDF…"** state while the server builds it. When it is ready your phone's normal **share sheet** opens, so you can:

- open the record in your PDF viewer,
- save it to your files,
- send it on (email, chat, hospital app),
- or print it to any printer your phone can reach.

The PDF is generated in the language you are using — if the app is set to Bulgarian, the record's labels arrive in Bulgarian.

## Viewing the chart on a phone

For a **finished** case, tapping the timetable on the case summary opens a **read-only timetable viewer** — the same chart as the printed record (traces, event flags, numbered drug pins, the vitals table and all lanes) with the drug administration log below it. The case stays locked; nothing here can be edited. Cases still in progress open the live intraoperative screen instead.

**Pinch to zoom**, or use the **− / +** buttons, to change how much detail the vitals table shows. Zoomed in you get every 5-minute reading; zoomed out it thins to the coarser sampling used on the printed record, and a badge shows the current interval (for example "q15 min"). The graph traces, drugs, events and lanes always show **every** recorded point at every zoom level — zooming changes readability, never the data. The printed record is unaffected by how you zoom.

## Layout

The record is designed to fit **exactly two A4 pages** — one sheet printed double-sided — for cases up to ~24 hours. Long cases split into two stacked charts (first half / second half) on the intraop page; only truly extreme cases add a continuation page.

## Dark mode

The **case summary and its timetable follow your theme** — dark in dark mode, paper-light in light mode. The printed record and the PDF deliberately always render as a white paper sheet, regardless of your theme setting.
