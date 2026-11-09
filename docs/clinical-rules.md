---
title: Clinical rulesets
---

# Clinical rulesets

Clinical rulesets control dose, infusion, fluid, and equipment suggestions.
They do not replace clinical judgment and they never create a medication event
without a clinician action.

## Which ruleset is used

Adult and pediatric rulesets are selected independently. LOSPOR resolves one
complete ruleset for the active mode in this order:

1. the clinician's selected personal ruleset;
2. the institution's selected ruleset; then
3. the LOSPOR platform ruleset.

The first available published ruleset wins. LOSPOR does not combine individual
rules from several levels, and it never falls back from Pediatric to Adult.
This makes the origin of every suggestion unambiguous.

## Who can change rules

- A platform administrator can create, edit, publish, and select platform
  rulesets.
- A head of department can copy an accessible ruleset, edit the copy, publish
  it, and select it for the institution.
- An individual user can copy an accessible ruleset, edit the copy, publish
  it, and select it as a personal ruleset.

Published rulesets are immutable. To change one, create and publish a new copy.
The copy records the source ruleset and source version. Imported literature
references are retained when a ruleset is copied or its payload is edited.
Pediatric policy rows also carry a review state and rationale; source review is
not the same as clinical approval.

Full editing is available in the web application. Mobile and PWA settings show
the currently effective Adult and Pediatric rulesets, their scope and version,
and whether the displayed copy came from the live API or offline cache.

## Canonical administration routes

LOSPOR stores canonical route codes and displays translated clinical names:

`IV`, `IM`, `SC`, `PO`, `IN`, `PR`, `INHALATION`, `TOPICAL`,
`TRANSDERMAL`, `INFILTRATION`, `PERINEURAL`, `EPIDURAL`, `INTRATHECAL`,
`INTRAOSSEOUS`, and `ENDOTRACHEAL`.

Legacy aliases such as `PD`, `IT`, `IO`, and `ET` are normalized when read.
Sublingual (`SL`) is not part of the anesthesia ruleset vocabulary.

## Canonical dose units

The amount vocabulary is `ng`, `mcg`, `mg`, `g`, `IU`, `mmol`, `mEq`, and
`mL`. A dose may use no body-size basis, total body weight, ideal body weight,
or body surface area. Time bases are none, per minute, or per hour.

LOSPOR keeps a UCUM representation internally so future exports and
integrations can compare units without guessing from display text. The user
interface continues to show familiar clinical units.

## Platform baseline

`LOSPORADULTS Rules` is the canonical Adult platform baseline. It is generated
from the existing authored anesthesia option library and contains:

- 181 drug profiles;
- 48 infusion profiles;
- 22 fluid profiles; and
- one Adult equipment policy.

The Pediatric v1 platform draft contains a policy ledger for all 181 drugs,
three conservative route profiles, 41 equipment suggestions, and 28 equipment
policy rows. It remains unpublished and unselected until every policy has been
clinically approved. See [Pediatric platform draft](./pediatric-platform-draft.md).
Manual documentation remains available; Adult suggestions are never reused.

### Rule sets v3 (9.15.0)

Release 9.15.0 adds an adult v3 (267 rules; v2 has 251) and a paediatric v3
(367 rules; v2 has 335).

- **Upgrade:** both are installed on the upgrade beside v2, in the same
  transaction.
- **Selection:** the platform selection moves from v2 to v3 only where the
  1.2.0 release made it. A ruleset an institution or a clinician selected
  stays selected.
- **v2 unchanged:** the v2 rows stay exactly as installed, and their
  fingerprints still verify.

What v3 changes:

- **Drug groups:** drugs are regrouped by their primary use, and the colours
  follow the group.
- **Regional adjuvants:** their own intrathecal, epidural and perineural
  doses. A route with its own settings never borrows another route's
  calculation.
- **15 more infusions:** midazolam, remimazolam, clonidine, thiopental,
  morphine, urapidil, methylene blue, tranexamic acid, potassium chloride,
  calcium gluconate and chloride, sodium bicarbonate, hydrocortisone,
  pantoprazole and somatostatin. Also epidural fentanyl (mcg/hr).
- **Units:** amiodarone in mg/hr, and magnesium sulfate for children in
  mg/kg/hr.
- **Children:**
  - every drug and infusion band gets a suggestion, a range and pills;
  - local anaesthetic infusions are entered in mL/kg/hr, limited by dose;
  - some drugs are hidden for children only, for example ibuprofen under
    3 months and obstetric drugs under 12 years.

### Rule sets v4 (10.2.0)

Release 10.2.0 changes the doses the intraoperative suggestions rely on. Because v3 is released and fingerprinted, the changes are not made in it: they come as a new adult v4 and a new paediatric v4, **bundled with the release and activated automatically**.

- **Upgrade:** both are installed beside v3 in the same transaction, by the 10.2.0 release principal. The audit entry records the exact difference from v3.
- **Selection:** the platform selection moves from v3 to v4 only where the 9.15.0 release itself made that selection. A ruleset an institution or a clinician selected stays selected.
- **v2 and v3 unchanged:** their rows stay exactly as installed, and their fingerprints still verify.
- **Cases already recorded:** a finalised case is never rewritten. Retired menu entries still read, name and export on the cases that recorded them.

What v4 changes for adults:

- **Adrenaline:** opens without a default dose (500 mcg was the intramuscular anaphylaxis dose); quick doses 10 / 50 / 100 / 1000 mcg; an intramuscular route.
- **Sugammadex:** up to 2,000 mg (16 mg/kg rescue reversal).
- **Paracetamol:** 15 mg/kg under 50 kg, 1 g from 50 kg.
- **Salbutamol:** inhaled, in 0.1 mg puffs.
- **Glucagon:** an intramuscular route for hypoglycaemia without venous access.
- **Lipid emulsion 20%:** suggests 0.25 mL/kg/min (15 mL/kg/h) when run as a rate.
- **Glucose:** one fluid at 5 / 10 / 20 / 40 %. Dextrose 5% and 10% leave the menus.

What v4 changes for children: hydrocortisone 4 mg/kg capped at 100 mg at every age, furosemide capped at 40 mg, sugammadex to 2,000 mg, adrenaline intramuscular 10 mcg/kg capped at 500 mcg, salbutamol in single puffs, and blood products by weight (red cells and plasma 15 mL/kg, platelets 10, cryoprecipitate 5).

Any further rule change needs a v5: a released baseline is never edited.

## Offline behavior

Clients cache the last successfully downloaded published ruleset separately
for each user and clinical mode. If the API is unavailable, that cached copy
may be used and is visibly marked as offline. Clinical-rule caches are cleared
at logout.
