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

## Offline behavior

Clients cache the last successfully downloaded published ruleset separately
for each user and clinical mode. If the API is unavailable, that cached copy
may be used and is visibly marked as offline. Clinical-rule caches are cleared
at logout.
