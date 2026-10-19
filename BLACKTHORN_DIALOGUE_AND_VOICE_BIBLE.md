# BLACKTHORN — Character Voice & Natural Dialogue Bible (working standard)

Status: EDITORIAL RULES, not yet a rewrite of the actual game. Written 2026-10-19.
Scope: all 47 canonical story scene IDs and all 55 private phone-flow IDs. **English dialogue only.** Preserve original V18 plot, evidence, chronology, romance choices, consent, relationships, and spoilers. Do not inject new mystery facts in the name of making dialogue vivid.

## Non-negotiable writing principles

1. Every speaker has an individual **written voice** AND a consistent **audio voice identity**. Accent, timbre, pacing and vocal warmth should remain recognisable between scenes. An actor's emotion can vary while the voice identity stays fixed. Different voice IDs for individual characters when voiced audio is produced; do not route all lines to one narrator voice.
2. People do not exchange one-liners endlessly. Mix ordinary talk, brief practical exchanges, vulnerable moments, genuine irritation, silence, missed cues, awkwardness, humour, and occasionally something lyrical. A joke or ominous line is NOT required in every exchange.
3. Use the characters' relationships and what they are doing to generate talk, not an exposition checklist. No unnatural spoken recitations of known facts. The camera can show information; the narration only sets observable action, shifts or atmosphere.
4. Human rhythm: incomplete thoughts, mild corrections, interruptions, occasional unasked-for replies, everyday phrasing; avoid repetitive filler/stutters and forced catchphrases. People sometimes dodge a question or hear it differently.
5. Dialogue has subtext only when appropriate. Straight answers and mundane activities are welcome. Character emotion is not always explicitly declared.
6. Let the room participate: a glance, movement, hand on an object, a call arriving, sitting down, retrieving a coat, another person entering. These short, visual action beats should do work that narration previously had to do.
7. Exchange lengths vary. A short reply can be strong. Don't force every character to have equal screen time; who speaks depends on personal stakes and timing.
8. Write for actors/TTS: English that sounds natural **read aloud**; use contractions when fitting; avoid long overwritten sentences, em-dash proliferation, and every line ending in a neat rhetorical punch.
9. Player decisions remain player decisions: do not write Florine/Maxine/Sam's feelings or choices as established fact when their routes can differ; allow alternate reactions and neutral responses.
10. No mystery-spoiler leaks or improvised evidence. Before committing a new scene: check against V18 authoritative scene table, reveal gates and available phone flows. Preserve gated clues and the canonical ending.
11. Balance is **scene-dependent**, not a strict 75/25 quota. Sometimes two lines + a silence are enough, sometimes a short paragraph is right. Narration must not repeat information already visible in art or dialogue.
12. Dialogue belongs on its proper medium: shared room dialogue on projector; private character conversations and choices on the original Blackthorn Phones UI. Audio should follow the same visibility and spoiler-gating rules.
13. Editorial pass per scene: read aloud; remove identical-sounding replies; check at least one unscripted-feeling reaction; check no one speaks solely to explain the plot; check continuity and pacing, and validate all branches.

## Individual spoken and performed identities (casting direction — proposed, tune on actual audio test)

| Character | Speech texture / response habits | Suggested voice performance (British English baseline) | Don't make them |
|---|---|---|---|
| Florine | Curious, direct, clever; asks for clarity, pushes back, not afraid of a sincere answer; can get impatient | Bright, grounded, mid-register, lively but not chirpy | Quipping nonstop or pre-solving the mystery |
| Maxine | Assertive, sharp-eyed, sometimes blunt; comfortable disagreement; quieter when personally affected | Rich mid-range, clear articulation, quick when engaged | Permanently sarcastic or overdramatically snobby |
| Sam | Observant, warm, understated; responds to details; comfortable with silences; occasionally unexpectedly dry | Warm, textured, relaxed rhythm, quietly confident | Always timid, always sweet or always making jokes |
| Alexander Ashbourne | Guarded, precise, measured; concise and practical under stress; dry teasing only with earned familiarity | Low-mid, controlled, deliberate consonants, understated warmth | Cartoonishly cold, constantly dominant, or theatrically mysterious |
| Nate Beaumont | Attentive, open, gently playful; listens and follows up; humour used naturally, not as a reflex | Warm, resonant, conversational, flexible tempo | A stand-up comedian or a relentless flirt |
| Theo Mercer | Direct, competitive, occasionally irritable; confident about procedure but not incapable of admitting error | Mid-low, firm, dry, slightly rough edge; brisk | A constant sneer or a bully |
| Adrian Voss | Thoughtful, polished, guarded about family/records; chooses words carefully; may be unexpectedly plain | Smooth mid-low, precise but not stiff, unhurried | Pretentious speech in every line |
| Headmistress Blackthorn | Decisive and economical; distinguishes institutional duty from personal concern | Mature, grounded authority, measured pace | Delivering sinister riddles in every announcement |
| Celeste Rook | Instructive, perceptive, practical; occasional dry perspective on tradition | Articulate, scholarly, naturally flowing | An exposition machine |
| Other NPCs | Define separately before writing their first substantial scene: their worldview, syntax, tempo and reactions | Give each a dedicated casting slot; do not accidentally reuse another role's voice ID | Interchangeable information dispensers |

## Audio implementation contract (future)

- Maintain `voice-casting.json`: character key, stable synthetic voice ID, locale, pronunciation notes and optional speaking-rate / tone hints. Do not claim unique voices exist until individual voices have been selected and tested.
- Generate individual line files with stable IDs (`scene_id_line_id_character`) and subtitles. A new spoken line needs new audio; avoid mismatched text/audio.
- Never auto-play a character's audio on someone else's private phone; respect the player/channel and mute settings.
- No voice cloning of a real person without their informed permission.
- First test a sample with **ordinary, angry, caring and playful** lines for each performer: voice must remain the same actor across emotional changes.

## Example of desired low-key natural conversation (STYLE DEMO ONLY — not approved canon)

In Suite 417, the invitations sit among three half-unpacked bags.

MAXINE: "Has anyone seen my other earring?"
SAM: "The silver one?"
MAXINE: "No, the— yes. That one."
FLORINE: "There's something under your sleeve."
MAXINE: "That's a button."
FLORINE: "Right. Then no."
(Sam moves a book. The earring slips out from beneath it.)
SAM: "Found it."
MAXINE: "Why was it under a book?"
SAM: "Because you put it there?"
MAXINE: "I haven't even opened that book."
FLORINE: "You don't need to defend yourself. It's an earring."
(Maxine takes it, checks the clasp and sets the invitation aside to make room.)
MAXINE: "Fine. Are we going down together?"
SAM: "Give me two minutes."
FLORINE: "You've been saying that for twenty."
SAM: "I know."

No forced mystery line, no mandatory joke or instant banter payoff; relevant practical rhythm and varied reactions. This sample does not override existing canon scene chronology.

## Working editorial gate for S00–S05 and all future scenes

A. Establish exactly what the scene must accomplish from authoritative V18 story source.
B. Select who is physically present versus available on personal phones; never invent shared access to private information.
C. Sketch dialogue beats by emotional progression, including quiet/ordinary moments.
D. Draft in English using the character identity profiles above; minimal narration.
E. Test character differentiation by hiding speaker names. If indistinguishable, rewrite.
F. Compare all facts, clues, route gating, scene timings, location and romance branches to source.
G. Only then merge dialogue into GitHub implementation; later generate and attach distinct voices.
