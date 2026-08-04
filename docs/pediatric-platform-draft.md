---
title: Pediatric platform draft
---

# Pediatric platform draft

`LOSPOR_PEDIATRICS` v1 is an inactive, source-backed platform draft. It is not
published, selected, or available for clinical use. Its purpose is to put the
whole pediatric catalog into the normal ruleset hierarchy for structured
review, without turning unresolved evidence into selector defaults.

Download the exact generated artifacts:

- [Pediatric v1 draft (JSON)](/downloads/lospor-pediatric-ruleset-v1-draft.json)
- [Adult v2 metadata draft (JSON)](/downloads/lospor-adult-ruleset-v2-draft.json)

The source of truth is
`lospor-core/src/platform-clinical-drafts.ts`. The JSON files are deterministic
review exports; they are not database backups.

## Pediatric v1 contents

| Rule type | Count | Runtime effect |
|---|---:|---|
| Drug policy ledger | 181 | None |
| Drug profiles | 3 | Selector surface, only after publication |
| Equipment policy ledger | 28 | None |
| Equipment suggestions | 41 | Suggestion field, only after publication |
| **Total** | **253** | Draft only |

Every one of the 181 canonical intraoperative drugs has exactly one editable
policy row. Policy rows record a disposition, review status, rationale, and
source references. The runtime ignores them. Only a `PEDIATRIC_DRUG_PROFILE`
can supply a route, dose, slider, concentration, formulation, or pill.

### Drug disposition ledger

| Disposition | Count |
|---|---:|
| `AUTOFILL_PROFILE` | 2 |
| `MANUAL_NO_PROFILE` | 47 |
| `FORMULARY_REQUIRED` | 51 |
| `SCHEMA_BLOCKED` | 18 |
| `EXCLUDED` | 35 |
| `PENDING_RESEARCH` | 28 |

Review state is deliberately separate from disposition: 61 rows are evidence
reviewed, 51 require a local formulary decision, and 69 remain pending. An
evidence-reviewed row is not equivalent to clinical approval.

All 40 antimicrobials are `FORMULARY_REQUIRED`. Route alone cannot distinguish
prophylaxis from treatment or retain procedure/site, local resistance,
gestation, renal, infusion, redosing, and monitoring constraints. Institutions
can add them only through a locally governed antimicrobial protocol. The class
policy follows [Children's Health Queensland pediatric surgical prophylaxis](https://www.childrens.health.qld.gov.au/__data/assets/pdf_file/0036/176895/gdl-01064.pdf),
[NICE NG125](https://www.nice.org.uk/guidance/ng125/chapter/recommendations),
and [UKHSA Start Smart—Then Focus](https://www.gov.uk/government/publications/antimicrobial-stewardship-start-smart-then-focus/start-smart-then-focus-antimicrobial-stewardship-toolkit-for-inpatient-care-settings).

## Executable pediatric drug candidates

These remain inactive and unapproved. They are the only reviewed candidates
that the current route-only selector can represent without discarding a
critical constraint.

| Drug | Age band | Routes | Draft autofill | Concentration |
|---|---|---|---|---|
| Ondansetron | 1 month to under 18 years | IV | 0.1 mg/kg TBW, round 0.1 mg, cap 4 mg | 2 mg/mL |
| Chlorphenamine | 1 month to under 1 year | IV, IM, SC | 0.25 mg/kg TBW, round 0.1 mg | 1 mg/mL default; 10 mg/mL stock |
| Chlorphenamine | 1 year to under 18 years | IV, IM, SC | 0.20 mg/kg TBW, round 0.1 mg | 10 mg/mL |

The chlorphenamine 20 mg slider ceiling is a user-interface range, not a
calculated dose cap. The source is the current
[chlorphenamine injection SmPC](https://www.medicines.org.uk/emc/product/10595/smpc).
Ondansetron is scoped to perioperative PONV and follows the
[ondansetron SmPC](https://www.medicines.org.uk/emc/product/8482/smpc); the same
IV route must not be generalized to chemotherapy regimens.

No fixed pediatric quick-dose pills were inferred. The selector supports them,
but a platform pill needs its own defensible total-dose value. A calculated
weight-based suggestion is not duplicated as a pill.

Etomidate and rectal methohexital are explicitly schema-blocked. Their labels
use strict “older than” age boundaries that the inclusive lower-age field cannot
encode exactly; methohexital also has no source-backed finite total slider
ceiling. They were not approximated with hidden epsilon values or invented
caps.

Pediatric local anesthetics remain schema-blocked. Concentration, preparation
or baricity, route/site, weight-based maximum, adjuncts, and cumulative dose
must remain linked. The current independent concentration and formulation
pills cannot express that preparation matrix safely.

## Equipment draft

The 41 equipment rules are suggestions only. They never select or prefill a
device. The draft includes product-specific weight bands for Teleflex LMA
Unique, Intersurgical i-gel, Laerdal Silicone Resuscitator, and Arrow EZ-IO;
anaesthesia-circuit preparation; ETT and blade preparation; OPA/NPA references;
suction, peripheral IV and BP-cuff manual selection; and RCUK AED mode/pad
placement without duplicating defibrillation energy.

Formula- or measurement-dependent choices remain explicit policy rows. These
include ETT type/size/depth, suction catheter from actual ETT ID, BP cuff from
mid-arm circumference, generic SGA/BVM/IO tables, and delivery-room NLS
equipment. The canonical LOSPOR resuscitation calculator remains the only
source of defibrillation energy.

Primary equipment sources include the
[APAGBI beginner guide](https://www.apagbi.org.uk/images/information%20and%20resources/professional%20resources/anaesthesia-for-beginners--apa-guide-2023--v2.pdf),
[RCoA GPAS Chapter 10](https://rcoa.ac.uk/gpas/chapter-10),
[RCUK 2025 pediatric BLS](https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/paediatric-basic-life-support-guidelines),
and the exact manufacturer documents stored on each product rule.

## Adult v2 draft

Adult v2 is a full 252-rule snapshot, not a delta overlay. It preserves the
existing 181 drugs, 48 infusions, 22 fluids, and adult equipment policy. Eight
local-anesthetic profiles add explicit `PERCENT` concentration units and route
defaults. Safely representable neuraxial formulation pills are added for:

- lidocaine 5% hyperbaric;
- bupivacaine 0.5% isobaric or hyperbaric (hyperbaric default);
- prilocaine 2% hyperbaric;
- chloroprocaine 1% isobaric; and
- tetracaine 1% isobaric.

No platform hypobaric preparation is inferred. Ropivacaine and mepivacaine
retain the route surface but have no intrathecal concentration or formulation
pill. Levobupivacaine receives no baricity pill because the cited product
information does not identify one.

## Editing and publication

The web clinical-rules workbench edits both executable rules and the new policy
rows. The normal hierarchy remains unchanged:

1. a platform administrator governs platform rulesets;
2. an institution copies a ruleset and publishes its own complete version; and
3. a member copies an accessible ruleset and publishes a personal version.

The first selected published ruleset in personal → institution → platform order
wins. Levels are not merged, and Pediatric never falls back to Adult.

Publication validation blocks a pediatric draft while any policy is not
`APPROVED`, while any drug/equipment remains `PENDING_RESEARCH`, or when a
policy claims an executable profile/suggestion that is absent. The importer is
append-only and aborts on an identity collision. It never updates, deletes,
publishes, or selects a ruleset.
