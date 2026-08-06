---
title: Pediatric mode
---

# Pediatric mode

Pediatric mode is an unreleased, development-only workflow for patients from
birth to under 18 years. It uses the same web, PWA, and Android applications
and the same login as adult LOSPOR, but each case has an explicit clinical
mode: **Adult** or **Pediatric**.

Production pediatric writes remain disabled until the complete clinical rule
manifest has been reviewed and released. Adult cases continue to use the
existing workflow.

## Patient age

LOSPOR records age at the procedure without storing date of birth:

- exact value in days, months, or years;
- an approximate chronological age in days for consistent research filters;
  and
- the pediatric clinical-rule version used for the case.

LOSPOR deliberately does not collect prematurity status, gestational age, or
postmenstrual age. Age-dependent rules use chronological age and recorded body
size only.

An age below 18 cannot be saved as an adult case. The clinician must switch the
case to pediatric mode or correct the age. A pediatric case cannot be saved
with an age of 18 years or older.

## Preoperative workflow

Pediatric preoperative assessment retains ASA physical status and adds:

- POVOC risk;
- conditional COLDS respiratory risk;
- age-aware soft vital-sign references;
- APAGBI fasting assessment;
- Mosteller body surface area;
- NICE maintenance-fluid calculation; and
- RCUK resuscitation calculation.

Adult-only RCRI, Apfel, and STOP-BANG scores are hidden and cleared in
pediatric mode.

Reference ranges from an uploaded laboratory report take precedence over
default catalog ranges. AI may extract structured values from a report, but
pediatric AI treatment and dosing advice is blocked.

## Intraoperative safeguards

Manual documentation remains available for drugs, infusions, fluids, gases,
agents, airway equipment, and ventilation. Pediatric mode never reuses adult
defaults.

Clinical suggestions come from the institution's effective rule set:

- a selected personal Pediatric ruleset, when present;
- otherwise the selected institution Pediatric ruleset; or
- otherwise the selected platform Pediatric ruleset.

Each level is a complete published ruleset. LOSPOR does not merge rules from
several levels, and Pediatric never falls back to Adult.

For a pediatric bolus, one matching drug/indication/route/age profile is
selected automatically. If several profiles match, the clinician must choose
the indication and route. If no approved profile applies, LOSPOR labels the
entry as manual and allows an independently verified dose. Equipment
suggestions use the same effective rule set and the exact recorded age and
weight.

Web, PWA, and mobile use the same Core resolver. A successfully downloaded
approved rule set is cached for offline work and is visibly labelled when the
cached copy is being used. The cache is cleared on logout so a shared device
cannot expose one institution's preset to the next user.

A drug event produced from a profile stores the clinical rule key, rule
version, and any optional source identifiers in the existing event metadata.
This preserves which approved rule was used without adding a separate event
table or requiring a reference.

The initial Pediatric selection is intentionally empty. Until the platform
owner populates and publishes reviewed profiles, the application continues to
show safe manual-entry paths rather than inventing pediatric defaults.

## Premedication

Premedication is dosed from the child's own weight and age. The premedication
catalogue itself holds fixed adult amounts — midazolam 7.5 mg, paracetamol 1 g —
with no weight term at all, so it cannot be shown to a child unchanged. Every
entry is rebuilt before it is offered.

A drug and route resolves to exactly one of four outcomes, and the distinction
between them is the point:

- **A calculated dose**, with the arithmetic that produced it shown beside it —
  `0.5 mg/kg × 14 kg`, and the cap when the cap applied. The number can be
  checked at a glance rather than trusted.
- **Withheld**, with the reason, where the drug should not be given to a child at
  all: codeine at any pediatric age, aspirin under sixteen, tramadol under
  twelve, ibuprofen under three months. These stay visible and disabled rather
  than disappearing from the list, because "not for this child, and here is why"
  is more useful than an absence.
- **Manual entry**, where no pediatric rule covers that drug or route. LOSPOR
  does not fall back to the adult amount; the clinician enters a verified dose.
- **A request for a weight**, where a rule exists but the weight to apply it to
  has not been recorded. No dose is shown and none is assumed.

Doses are capped at the usual adult dose, so the arithmetic can never exceed
what an adult would receive, and are rounded to an amount that can actually be
given. Where a drug has a practical minimum — atropine is not given below
100 mcg — a computed dose below it is raised, never above the cap.

Weight-based dosing uses actual body weight unless the drug is conventionally
dosed on ideal body weight, in which case McLaren ideal body weight is used when
height and sex are recorded and measured weight otherwise. The response records
which weight was used.

The same resolver serves the web app and the mobile app, so the two cannot
disagree about a dose for the same child.

These are starting points for a prescriber, not instructions. They are
conventional pediatric premedication values, and every prescription is confirmed
clinically.

## Postoperative workflow

Modified Aldrete remains available. Pediatric pain documentation selects among
FLACC, Faces Pain Scale - Revised, and NRS according to the child's ability to
self-report. PAED is optional.

## Clinical governance

Core owns the framework-free rule types, validation, deterministic rule keys,
dose/equipment resolution, route and unit vocabulary, and offline snapshot
policy. The API owns stored rulesets, ownership, immutable publication,
copy provenance, and mode-specific selection.

The governance workflow is:

1. A platform administrator creates or copies a platform draft, edits it,
   publishes it, and selects it as the platform default.
2. A head of department copies an accessible ruleset into an institution
   draft, edits and publishes it, and may select it for that institution.
3. An individual user can do the same with a personal copy.
4. Published rulesets are immutable. Every later change starts as a new copy,
   which records its source ruleset and version.
5. References are optional and are not required by the workbench.

The web workbench provides full editing. Mobile and PWA settings show the
effective Adult and Pediatric rulesets read-only and direct editing work to the
web application.

## Compatibility and rollout

Pediatric mutations require a V8-compatible client. Older clients may read
compatible case summaries but cannot edit pediatric cases. Early local v8
maturity fields are removed from outgoing drafts and are not accepted as
client-authored data.

Local development enables the workflow automatically. Production requires
both:

1. `PEDIATRIC_MODE_ENABLED=true` in the API environment; and
2. a Core release whose clinical manifest sets
   `PEDIATRIC_PRODUCTION_READY=true`.

The current draft manifest sets production readiness to false. Do not bypass
this double gate.

Before production rollout:

1. populate, review, publish, and assign the initial platform preset;
2. approve the required drug, equipment, ventilation, blood-volume, bleeding, and
   local-anaesthetic profiles;
3. run the full cross-repository test and migration gate;
4. smoke-test one pediatric case on web, PWA, and Android;
5. verify offline recovery and old-client rejection; and
6. review pediatric research and OMOP output.

## Research and OMOP

The Database Browser can filter by Adult or Pediatric mode and chronological
age. Case rows and details use the same bilingual Core labels as the clinical
applications.

OMOP exports preserve pediatric mode, precise chronological age, rule
provenance, POVOC, COLDS, pediatric pain, and PAED as source observations.
Standard concept IDs remain zero until each mapping is clinically reviewed;
LOSPOR does not invent unverified standard mappings.
