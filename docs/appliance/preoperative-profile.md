# Preoperative questions

LOSPOR ships one catalogue of preoperative questions, versioned with the
Hospital release. Each appliance has one profile that says which of those
questions its clinicians are asked, in what order, and which are required.
Status changes that profile in place. There is no second definition source and
there are no profile versions.

## The catalogue

The catalogue has 75 questions:

- the 30 **baseline** questions (`BASE_*`) behind the standard form controls:
  allergies, family and personal anaesthetic history, dentition, habits, the
  RCRI, Apfel, STOP-BANG and POVOC factors, and the COLDS switch; and
- 45 **additions** for adults and children, for example recent respiratory
  infection, exercise tolerance, falls, venous thromboembolism, abnormal
  bleeding, transfusion history, dysphagia, pacemaker or ICD, pregnancy,
  breastfeeding, prematurity, oxygen dependence and difficult venous access.
  Several have follow-up questions that are asked only after a Yes.

Each question has a fixed form section, a population (adult, pediatric or
both), its answer options and its research code. None of this can be edited on
the appliance. A new question or a changed definition needs a software
release.

On a new installation the baseline questions are on, the additions are off,
and no question is required.

## What an administrator can change

From **Status → Hospital controls → Clinical**, an administrator can:

- switch a question on or off, including a baseline question;
- make a switched-on question required or optional;
- change the order, by dragging or with the up and down buttons; and
- preview the form in use.

Saving needs the administrator password and a reason, and is audited. The API
refuses an incomplete catalogue, duplicate positions, unknown questions, and a
question that is required while switched off.

## What clinicians see

The web app and the phone app, in both the tabbed and the scrolled layout,
follow the profile:

- a switched-on addition appears as a Yes/No row in its own form section, in
  the administrator's order, with Unknown or N/A where the question allows it;
- a follow-up appears only when the question above it is answered Yes;
- a required question carries an asterisk;
- a suggestion drawn from the imported hospital record can be accepted or
  rejected, and is offered only while the question is unanswered; and
- a switched-off baseline control is hidden, and a risk score that needs a
  switched-off answer says it is not available rather than showing a number
  that understates the risk.

The phone keeps the last profile it received, so the form stays the same
offline.

## Switching a question on or off

A change applies to every case from its next load, including cases in
progress:

- a case starts asking a question that was switched on, and records it as not
  asked until someone answers;
- a case stops asking a question that was switched off. An answer already
  given is kept and exported; an unanswered one leaves no row; and
- a finalized case is never changed.

A draft always saves, whatever is unanswered. Required questions are checked
when the clinician continues to the intraoperative record: the app lists the
required questions still unanswered and stays on the preoperative form.

## Research

Every question is stored as one answer row per case, and research and OMOP
export read those rows. See [Data & Research](../data-research.md#preoperative-questions).
