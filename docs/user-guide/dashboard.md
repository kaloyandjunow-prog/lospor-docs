---
sidebar_position: 2
title: Dashboard
---

# Dashboard

The dashboard is your home screen in LOSPOR. It gives you a quick overview of your activity and provides access to all cases you are allowed to see.

By default, the dashboard shows **All cases** in reverse chronological order. Members see their own cases. Heads of department see cases in their institution. Admins can see all cases.

## Statistics

At the top of the dashboard, three cards show:

- **Total cases** — all cases you have recorded
- **This month** — cases recorded in the current calendar month
- **ICU admissions** — cases where the postoperative disposition was ICU

Heads of department see statistics for the **entire institution**, not just their own cases.

The statistics are clickable. Clicking a statistic filters the case list to that scope; for example, clicking **This month** shows cases recorded in the current month.

## Case scopes

The dashboard also provides quick scopes:

- **All** - every accessible case, newest first
- **Today** - cases created today
- **Month** - cases from the current calendar month
- **Active** - cases that are not complete
- **Drafts** - cases still in draft/preop
- **Awaiting postop** - intraop completed but postop not submitted
- **Complete** - finalised/completed cases
- **Handovers** - cases with pending transfer state

On mobile these scopes appear as a horizontal rail under the statistics. On web they appear as clickable scope chips.

## Case list

Below the statistics, all your cases are listed in reverse chronological order. Each row shows:

- **Procedure name** — the planned procedure from the preoperative form
- **Status badge** — the current state of the case (see below)
- **Diagnosis** — the working diagnosis
- **ASA badge** — ASA classification (colour-coded: I–II green, III amber, IV–VI red)
- **Disposition badge** — WARD / PACU / ICU if the case is complete
- **Case code** — the unique identifier (format: YYYY-NNNN, e.g. `2026-0042`)

Click any row to open or continue the case.

### Case statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Case created but minimal data entered |
| **In consultation** | Preoperative form started (diagnosis entered) |
| **Awaiting allocation** | Preoperative form complete, not yet in theatre |
| **In theatre** | Intraoperative form opened, case started |
| **Awaiting post-op** | Intraoperative record complete, post-op not yet filled |
| **Awaiting review** | Post-op submitted; within the 30-minute review window |
| **Case finished** | All three forms complete and review window closed |

## Ongoing cases

The **Ongoing cases** button in the top navigation bar shows a badge with the count of your active (non-complete) cases. Clicking it opens a dropdown with quick links to continue each case.

## Pending handovers

If a colleague has sent you a case to take over, a yellow banner appears at the top of the dashboard with **Accept** and **Decline** buttons. See [Case handover](/user-guide/handover) for details.

## Starting a new case

Click **New case** in the top navigation bar, the mobile new-case toolbar icon, or the **New case** button in the empty state of the case list. This opens the case creation workflow starting with the preoperative form.
