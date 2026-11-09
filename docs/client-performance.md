---
title: Client performance notes
---

# Client performance notes

What was measured, what was fixed, what turned out not to matter, and the rules
that keep it that way. Numbers are from a production build on a desktop
machine; a phone is several times slower, so treat them as ratios.

## The intraoperative screen at rest

An open case left untouched used to re-render the whole screen about **five times
a second**, whatever the length of the case (4.9 React commits a second, 8–12 %
of the main thread in production, 36–47 % in a development build). The cause was
a feedback loop in the autosave effects:

1. The page passed `onAutoSave` down as an inline arrow, a new function on every
   render.
2. The effect listed it as a dependency, so each render restarted the save timer.
3. The timer fired a second later and "saved" (nothing had changed, so no
   request), which changed the page's save status.
4. The page re-rendered, passing a new arrow. Back to 1.

After the fix the same screen makes **0.1 commits a second and uses about 1 %** of
the main thread, on 30 and on 400 events.

**Rule:** a callback a timer or an effect calls must not be an effect dependency.
Read it from a ref (`useLatestRef`) and depend only on whether it exists. A test
that rerenders with a new callback and asserts that nothing is saved is the
proof; see `useIntraopAutosave.test.tsx` and `usePostopAutosave.test.tsx`.

Smaller feeds of the same churn, also removed:

- The live fluid totals made a new object on every run. They now keep the same
  object when the numbers are the same.
- About twenty components asked for the account's preferences as they mounted,
  one `/api/user` request each, and every sync sent a storage event for every
  key whether it had changed or not. Simultaneous requests now share one, and
  an unchanged key sends no event, as a browser would not.

## Time zones

Building an `Intl.DateTimeFormat` costs about 0.17 ms here (more on a phone's
JavaScript engine) and every event time on a case went through one. A record of
600 events took 89 ms and made thousands of formatters. Core now keeps one
formatter per zone, and caches the answer to "is this a zone". Do not construct
a formatter inside a loop.

## Reading a case

| Read | Size for a long demo case |
| --- | --- |
| `GET /v1/cases/{id}` (everything: questionnaire, suggestions, calculations, all intraop columns) | 148 KB |
| `GET /v1/cases/{id}?view=timetable&deleted=1` (the timetable viewer's read) | 13 KB |

A screen that draws only the chart should ask for the narrow read. The deleted
entries are read as two small queries (the deleted rows, then the version numbers
of the active rows that share their ids) instead of every event's JSON.

## What was measured and left alone

- **Saving an event.** A save takes about 30 ms at the start of a case and 49 ms
  at 400 events, a mild linear rise. Re-projecting the whole chart takes 2–3 ms
  even at 1,600 events; the rise is the database reading the event rows and
  rewriting the stored copy of the log. Incremental projection would save about
  2 ms and risks being wrong on out-of-order edits, so it was not done. Removing
  the stored copy of the log (69 % of the 112 KB chart blob) would change a
  contract that the cockpit, readiness checks, the export and the record all read.
- **The string table.** The phone's two-language table is about 150 KB and
  evaluates in 3 ms cold. It is 0.7 % of the exported PWA bundle. Splitting the
  languages would not be noticeable.

## How to measure the screen at rest

Use a production build (`next build`, `next start`); a development build costs
three to five times more and hides the real figure.

1. Open a seeded long case on the screen, let it settle for several seconds.
2. Over 70 seconds, read Chrome's `Performance.getMetrics` (`TaskDuration`,
   `ScriptDuration`) through a CDP session, and count React commits with a
   `__REACT_DEVTOOLS_GLOBAL_HOOK__` whose `onCommitFiberRoot` pushes a timestamp.
3. A healthy idle screen commits a handful of times a minute. Hundreds in 70
   seconds is a loop.
4. To find the owner, compare each re-rendered fiber with its alternate and list
   the state hooks whose value changed with the props unchanged: that is a
   component updating itself. Effect records are not state and change on every
   render; ignore them.
5. Compare with a plain page (the dashboard commits eight times in 70 seconds and
   uses 0.06 % of the main thread).
