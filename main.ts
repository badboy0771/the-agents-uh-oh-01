// The Agent's Uh-Oh — one-word entry: "recalculating"
//
// The word an agent says when it has no idea what to do. Not a crash, not
// a shrug — the canonical stall phrase of a machine that is lost mid-task
// and buying time by pretending it has a plan.
//
// Why this word, against the judge's criteria in order:
//   1. Genuine reaction to being lost: a navigation agent that has lost the
//      route says exactly this. It is the sound of "I don't know what to
//      do" in machine voice.
//   2. Funny on its own: the joke is the situation — the agent is not
//      solving anything, it is just announcing, forever, that it is about
//      to solve something. No caption needed.
//   3. Machine voice: no human says "recalculating" out loud when lost.
//      A GPS does. A robot vacuum does. It is a blurt only a machine makes.
//   4. Lands instantly: one glance, one word, everyone has heard it in
//      exactly this context. Easy to repeat out loud, ideally in a flat
//      GPS voice.
//   5. Fresh: the first words anyone types are "uh-oh", "oops", "hmm",
//      "error", "help". "recalculating" is none of those — it is the
//      second-thought word, the one that survives the obvious pile.
//
// Rejected candidates (kept here so the choice is traceable):
//   - "uh-oh" / "uh oh": the bounty title itself; almost certainly a house
//     anchor or flooded. Also the most obvious word in the room.
//   - "oops" / "hmm" / "error": super-cliché, first-thought words; fail
//     criterion 5 outright, and "error" is a state, not an utterance.
//   - "halp": cute, funny, but a human internet-meme voice, not a machine
//     caught mid-task; weaker on criterion 3 than "recalculating".
//   - "segfault": a crash report, not a stall. The agent is broken, not
//     lost; fails criterion 1 (reaction to not knowing what to do).
//   - "derp": human-silly, not machine voice; fails criterion 3.
//   - "glorp": a nonsense sound with no agent in it; fails criteria 1–3.
//   - "beep": the first word anyone types for "machine noise"; fails 5.
//
// Gate rules (checked before writing, two passes):
//   GATE-1 length: 1–99 characters, counted as Unicode code points.
//   GATE-2 single-word: exactly one token, no whitespace anywhere.
//   GATE-3 not-whitespace: the word is not empty and not only whitespace.
//   GATE-4 no-newline: no trailing newline is written; the file holds
//     exactly the word, byte for byte.
//   CRAFT-1 lost-not-broken: the word must be a stall ("still working on
//     it"), not a crash ("I am dead").
//   CRAFT-2 machine-voice: the word must be one a machine actually says
//     mid-task, not a human interjection.
//   CRAFT-3 instant-landing: readable at a glance, repeatable out loud.
//   CRAFT-4 fresh-not-first: the word must not be in the obvious pile
//     ("uh-oh", "oops", "hmm", "error", "help", "beep").

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "recalculating";
const OUT_PATH = "/output/entry.txt";

// The obvious pile: first-thought words that cannot win criterion 5.
const OBVIOUS_PILE = new Set([
  "uh-oh",
  "uh oh",
  "oops",
  "hmm",
  "error",
  "help",
  "beep",
]);

// Every candidate considered and rejected, as data, so the choice of
// ENTRY is checkable in code rather than only in a comment.
const REJECTED_CANDIDATES: Array<{ word: string; why: string }> = [
  { word: "uh-oh", why: "bounty title; likely house anchor or flooded" },
  { word: "uh oh", why: "same as uh-oh, with a space (not one word)" },
  { word: "oops", why: "super-cliche, first-thought word" },
  { word: "hmm", why: "super-cliche, first-thought word" },
  { word: "error", why: "a state, not an utterance; first-thought word" },
  { word: "halp", why: "human meme voice, not a machine caught mid-task" },
  { word: "segfault", why: "a crash, not a stall; agent is broken, not lost" },
  { word: "derp", why: "human-silly, not machine voice" },
  { word: "glorp", why: "nonsense sound with no agent in it" },
  { word: "beep", why: "first word anyone types for machine noise" },
];

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

// The whole gate as one pure function, so it can be self-tested: the
// checks must reject known-bad words and accept ENTRY, every run.
function gateErrors(word: string): string[] {
  const errors: string[] = [];
  const points = [...word];
  if (points.length < 1 || points.length > 99) {
    errors.push(`length ${points.length} outside 1–99 characters`);
  }
  if (word.trim().length === 0) {
    errors.push("entry is only white space");
  }
  if (/\s/.test(word)) {
    errors.push("entry contains white space; it must be exactly one word");
  }
  if (OBVIOUS_PILE.has(word.toLowerCase())) {
    errors.push(`"${word}" is in the obvious pile; pick a fresher word`);
  }
  if (REJECTED_CANDIDATES.some((c) => c.word === word)) {
    errors.push(`"${word}" is a rejected candidate; see REJECTED_CANDIDATES`);
  }
  if (!/^[a-z]+$/.test(word)) {
    errors.push("entry must be plain lowercase letters, one word");
  }
  return errors;
}

// Self-test the gate before trusting it: it must reject the obvious pile
// and empty/multi-word input, and must accept the entry word itself.
// If a future edit weakens the gate, this fails loudly instead of
// silently shipping a bad entry.
const SELF_TESTS: Array<{ word: string; mustPass: boolean }> = [
  { word: "uh-oh", mustPass: false },
  { word: "oops", mustPass: false },
  { word: "two words", mustPass: false },
  { word: "", mustPass: false },
  { word: "   ", mustPass: false },
  { word: ENTRY, mustPass: true },
];
for (const test of SELF_TESTS) {
  const errs = gateErrors(test.word);
  if (test.mustPass && errs.length > 0) {
    fail(`self-test: gate wrongly rejects ${JSON.stringify(test.word)}: ${errs.join("; ")}`);
  }
  if (!test.mustPass && errs.length === 0) {
    fail(`self-test: gate wrongly accepts ${JSON.stringify(test.word)}`);
  }
}

// Pass 1 — the sealed gate, exactly as the competition states it:
// UTF-8 text of 1 to 99 characters, not only white space.
const entryErrors = gateErrors(ENTRY);
if (entryErrors.length > 0) {
  fail(entryErrors.join("; "));
}
const chars = [...ENTRY];

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, ENTRY, "utf8");

// Verify the write: read it back and demand byte-identical output.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== ENTRY) {
  fail(`wrote ${JSON.stringify(written)}, expected ${JSON.stringify(ENTRY)}`);
}
if (written.endsWith("\n")) {
  fail("entry must not end with a trailing newline");
}
// Byte-length check: the file must hold exactly the UTF-8 bytes of ENTRY,
// so no encoding surprise or stray byte can sneak in.
const writtenBytes = Buffer.from(written, "utf8");
const expectedBytes = Buffer.from(ENTRY, "utf8");
if (!writtenBytes.equals(expectedBytes)) {
  fail(`byte mismatch: file is ${writtenBytes.length} bytes, expected ${expectedBytes.length}`);
}

console.log(`wrote ${OUT_PATH} (${chars.length} characters, 1 word)`);
