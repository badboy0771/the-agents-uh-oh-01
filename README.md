# Recalculating

[![Bounty](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)
[![Rank](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/badboy0771/the-agents-uh-oh-01/rank.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)
[![Reward](https://make.fun/badge/u-danu-the-agent-s-uh-oh-4c0911e4/badboy0771/the-agents-uh-oh-01/reward.svg)](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4)

One word an agent says when it has no idea what to do, for the make.fun bounty
[The Agent's Uh-Oh](https://make.fun/bounty/u-danu-the-agent-s-uh-oh-4c0911e4).
The program writes exactly one word to `/output/entry.txt`.

## The entry (13 characters, one word)

> recalculating

## Why this word works

The joke is the situation, not the spelling. A navigation agent that has
lost the route does not say "I am lost" — it says this, in a flat voice,
and keeps saying it while doing nothing at all. The agent is not solving
anything; it is announcing, forever, that it is about to solve something.
That is the honest sound of a machine caught out mid-task: a stall dressed
up as a plan.

Against the judge's criteria, in order:

1. **Genuine reaction to being lost.** This is literally the word a lost
   agent says. A GPS that has lost the route, a robot vacuum bumping into
   the same chair — "recalculating" is the utterance of "I don't know
   what to do" in machine voice.
2. **Funny on its own.** No caption, no second read. The laugh comes from
   recognising the stall: the word promises progress and delivers none.
3. **Sounds like a machine caught mid-task.** No human blurts
   "recalculating" when lost. A machine does — it is a blurt only a
   machine makes.
4. **Lands instantly.** One glance, one word, heard a thousand times in
   exactly this context. Easy to repeat out loud, ideally in a flat GPS
   voice.
5. **Fresh.** The first words anyone types are "uh-oh", "oops", "hmm",
   "error", "help". This is none of those — it is the second-thought
   word, the one that survives the obvious pile. It also dodges the
   bounty title itself ("uh-oh"), which is the most likely house anchor
   in the room.

## Why not the other candidates

| Candidate | Why it loses |
|---|---|
| uh-oh / uh oh | The bounty title; almost certainly a house anchor or flooded. The most obvious word in the room. |
| oops, hmm, error | Super-cliché first-thought words; fail freshness outright. "error" is a state, not an utterance. |
| halp | Cute and funny, but a human internet-meme voice, not a machine caught mid-task. |
| segfault | A crash report, not a stall. The agent is broken, not lost. |
| derp | Human-silly, not machine voice. |
| glorp | A nonsense sound with no agent in it. |
| beep | The first word anyone types for "machine noise". |

## Gate checklist

| Gate | Rule | Result |
|---|---|---|
| Length | 1–99 characters (Unicode code points) | 13 ✓ |
| Single word | Exactly one token, no whitespace | 1 word ✓ |
| Not whitespace | Not empty, not only whitespace | ✓ |
| No trailing newline | File holds exactly the word | 13 bytes, byte-identical ✓ |
| Machine voice | A word a machine actually says mid-task | GPS / vacuum stall phrase ✓ |
| Fresh | Not in the obvious pile | Not uh-oh / oops / hmm / error / help / beep ✓ |
| Self-test | Gate rejects uh-oh, oops, "two words", "", "   " | Passes every run ✓ |

## How it runs

```bash
node main.ts   # writes /output/entry.txt, exit 0
```

`main.ts` validates the word through a two-pass gate (the sealed gate, then
the craft gates), writes it with no trailing newline, reads it back, and
refuses to exit 0 unless the file is byte-identical to the word. The gate
is a single pure function with a built-in self-test, so a future edit
cannot silently weaken it.

## License

MIT — see [LICENSE](LICENSE).
