# Preop summary and consent

From 9.15.0 a hospital can add two documents to the preoperative assessment:

- **a preop summary page**, between the preoperative and intraoperative
  records; and
- **a written consent for anaesthesia**, printed with the summary.

Both are off until an administrator switches them on, on the preoperative form
page in Status. The consent needs the summary: switching the summary off
switches the consent off too.

## What clinicians see

With the summary on, a clinician who finishes the preop assessment reaches the
summary page. From there they:

- keep the case or hand it over;
- print the summary, and the consent when it is on; then
- start the intraoperative record.

A phone that is offline reads both switches as off, so its flow stays preop to
intraop and works without a connection. See
[Protocol & Printing](../user-guide/printing.md#the-preop-summary-and-written-consent)
for what prints.

The patient or parent signs the consent on paper. Patient names and ID numbers
are never stored: the sheets print blank lines for them.

## Print layout

The administrator picks one of five layouts. B is the default.

| Layout | What prints |
|--------|-------------|
| **A · Document №2, filled in** | The ward's paper form in its own order, sections I to V, with every answer LOSPOR holds printed in and the rest left for the pen. The consent follows in full. |
| **B · Summary, then consent** | A summary for the colleague taking the case over, with the whole questionnaire, then the whole consent in two columns. |
| **C · Consent per technique** | Before printing, the anaesthetist ticks the planned techniques. The consent describes only those, and general anaesthesia as the fallback, each with a box for the patient's initials. Needs the technique tags in the text. |
| **D · One sheet, both sides** | A dense summary on the front and the consent as a table on the back, one row per technique, word for word. Needs a double-sided printer and the technique tags in the text. |
| **E · Hospital copy and patient's copy** | The hospital's pages carry the summary and the signatures. A large-print page with the fasting instructions, and the full consent text, go home with the patient or parent. |

## Consent texts

There are two texts, each with its own versions:

- **Adults and patients of 14 to 18**; and
- **Children under 14**.

Each starts as a bundled Bulgarian text. Each save makes a new version:

- **Fingerprint:** a printed sheet records the version and fingerprint of its
  text, so earlier versions are never deleted. The database refuses any change
  to a saved version.
- **Identical words:** saving the same words again makes no new version.
- **Audit:** every save needs the administrator password and a reason, and is
  audited.

Under Закон за здравето чл. 89, consent to general anaesthesia is given in
writing. The text should name the anaesthesia, its risks and its alternatives
(чл. 88).

### How to write the text

- **Paragraphs:** a blank line starts a new paragraph.
- **Headings:** `## ` at the start of a line makes a heading.
- **Lists:** `- ` at the start of a line makes a list item.
- **Bold:** `**…**` makes words bold.
- **Case fields:** filled in from the case when the sheet prints:
  `{{hospital}}`, `{{diagnosis}}`, `{{procedure}}`, `{{date}}` and
  `{{anaesthetist}}`. Any other `{{…}}` is refused.
- **Technique tags (layouts C and D):** end the heading of each technique
  with its tag, for example `## Обща анестезия [general]`. The tag never
  prints, and an unknown tag is refused. The tags are:
  - `[general]` general anaesthesia;
  - `[neuraxial]` spinal, epidural or caudal;
  - `[block]` peripheral nerve block;
  - `[sedation]` sedation or premedication;
  - `[combined]` combined anaesthesia;
  - `[cvc]` central venous line;
  - `[arterial]` arterial line;
  - `[ventilation]` ventilation after the operation.
- **Fasting:** the list under `## Гладуване` prints the nil-by-mouth hours
  assigned to the child at the preop visit, when there are any. Otherwise it
  prints as written.
- **Fixed parts:** the patient's name, ID and the signature lines are fixed
  parts of the sheet, not of the text. Who signs follows the age (чл. 87):
  - a parent under 14;
  - the patient and a parent from 14 to 18;
  - the patient from 18;
  - the anaesthetist always.

## Research

Each consent print is recorded on the case with the text's version and
fingerprint, the layout and, for layout C, the techniques it described. A
finalised case takes no new print record. The cloud demonstrations have no
editor for these settings.
