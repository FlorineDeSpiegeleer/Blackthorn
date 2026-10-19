# BLACKTHORN — S00–S05 English Dialogue Rewrite · V1 Editorial Review

**STATUS: DRAFT FOR REVIEW — NOT LIVE PLAYER SCRIPT.**  
Source of truth: original Blackthorn V18 \`story-data.js\`, opening six scenes S00–S05 and personal W0 phone flows P001–P006. This file introduces **no new evidence, culprit claims, access privileges, or mandatory player decisions**. Spoken lines are *written for performance*; action/narrator text is *not* automatically voiced as character dialogue.

## Voices and direction for this opening

- **FLORINE:** alert, straightforward, a little impatient when practical things stall. Fewer rehearsed punchlines; she interrupts when she needs an answer.
- **MAXINE:** decisive, quick to challenge someone, sometimes self-conscious when she has been caught being earnest. Sharp but not sniping at everyone.
- **SAM:** observes details, makes room for other people, often understated. Her warmth does not mean passivity.
- **CELESTE ROOK:** clear, matter-of-fact academic voice. She cares about procedure and sometimes makes a dry observation but doesn't speak in riddles.
- **ALDOUS VEYNE:** confidently theatrical in company, but retains everyday sentence shapes. Two original source quotes are kept in faithful translation.
- **ALEXANDER:** concise, controlled, practical; sarcasm and warmth appear in different quantities, depending on Florine's choices.
- **NATE:** conversational and attentive, with playful remarks that don't overwhelm every response.
- **THEO:** dry and candid, slightly quicker tempo than Alexander; his concern is sometimes disguised as irritation.

Audio cast policy: **a distinct stable voice/voice ID per character**. This draft defines roles but does **not** assign actual generated voices yet. A voiced Florence/Florine reply must be route-specific; never voice an optional player response as if it happened on every branch.

---

## S00 — PROLOGUE · THE VEILED MOON

**Setting:** Blackthorn Academy exterior, Founders' Week morning.  
**Existing art:** \`extra-original-photos/blackthorn_academy_exterior_rainy_evening.webp\`.  
**What the scene must convey:** The founding pact dates back four centuries; the moon was veiled by cloud; masks on the final evening symbolise the separation of reputation from truth, not anonymity. Don't invent details of the pact.

**PROJECTOR — opening shot**

*[The rain has stopped, but the stone steps still shine. The academy rises beyond them.]*

**NARRATION (optional short title card, not character speech):**  
*Four hundred years ago, Blackthorn's founding families made a winter pact beneath a moon hidden by clouds.*

*[A beat; no invented historical flashback or document.]*

**NARRATION:**  
*On the final night of Founders' Week, guests wear masks. Not to conceal who they are, but to remember that a name and the truth are not always the same thing.*

**ON-SCREEN:** *Blackthorn Academy · The Veiled Moon*

**DIRECTOR:** Begin → S01. No interactive clue and no phone delivery in S00.

**Voice note:** If this prologue is voiced, cast a **separate narrator** (not Alexander, Nate, Theo, or one of the playable girls). The narrator is restrained and used very sparingly later.

---

## S01 — SUITE 417 · AN ORDINARY MORNING

**Setting:** Suite 417, Founders' Week morning.  
**Existing art:** \`extra-original-photos/guest_suite_getting_ready(1).webp\`.  
**Canonical objects:** Three individual invitations, Founders' Week programme, campus map, closed mask boxes, window.  
**Phone:** P001 Blackthorn Guest Services, 08:02 — outfits delivered to Suite 417 at **17:30**; invitations registered individually. Do not treat the system notice as a person speaking in the room.

*[Florine has spread the campus map across one end of the desk. Maxine is moving a book to make space for the programme. Sam is at the window.]*

**MAXINE:** "Is this all of it?"

**FLORINE:** "That's the map. The programme's under your elbow."

**MAXINE:** "I meant the paperwork."

**SAM:** "Three invitations, one programme, one map. So probably."

*[Maxine checks the envelopes, one by one.]*

**MAXINE:** "Why do they insist on individual invitations if we're all staying in the same room?"

**FLORINE:** "Because we're three people."

**MAXINE:** "Thank you. Very helpful."

**FLORINE:** "You asked."

*[Sam glances at the mask boxes on the dresser. She doesn't open them.]*

**SAM:** "Are we supposed to bring those tonight, or are they giving us masks downstairs?"

**MAXINE:** "They're ours. It says so here."

**FLORINE:** "Does it?"

*[Maxine points to a line on the programme. Florine leans across to read it rather than pretending she already knows.]*

**FLORINE:** "Right. Good. I was about to leave mine in the box."

**SAM:** "Can we not start getting ready now? It's morning."

**MAXINE:** "No one's getting ready. I'm making sure we don't spend tonight running back here."

*[A Blackthorn Guest Services notification appears on each player's phone.]*

**PHONE P001 (text notification, not an in-room spoken line):**  
"The Founders' Week outfits will be delivered to Suite 417 at 17:30. Personal invitations have been registered individually."

**SAM:** "Well, there goes your plan to get everything ready early."

**MAXINE:** "I didn't have a plan."

**FLORINE:** "You have the programme arranged by time."

**MAXINE:** "It's printed in time order."

**SAM:** "Sure."

*[Maxine turns the paper over and hands it to Sam instead of continuing the argument.]*

**MAXINE:** "Fine. Who wants breakfast?"

**S01 PLAYER INTERACTIONS — optional; do not force these as spoken lines**

- **INVITATIONS:** Show the three separately addressed invitations; optional FLORINE line: "Keep yours somewhere you'll remember." No new permissions or secret information.
- **PROGRAMME:** Let the player inspect the *approved* programme as an object; don't auto-invent a detailed schedule.
- **MAP:** Show the approved campus map; if Sam opens the map on her phone, preserve \`map_opened=true\` for P005A/P005B later.
- **MASK BOXES:** Remain closed at this stage; can be inspected, not worn.
- **WINDOW:** Short silent look over the academy grounds. No invented sighting.
- **GROUP PHOTO:** Optional camera gesture, no mandatory selfie or fixed player pose.

**Exit:** S02. The last exchange is mundane and intended to create room for the friends' relationship before mystery begins.

---

## S02 — DINING HALL → NORTH LECTURE HALL → GRAND LIBRARY

**Setting:** Morning school montage, with a real Founders' History and Archive Methods lesson.  
**Existing art:** \`BG_North_Lecture_Hall.png\` for the main shared projection (the other two places are transitions, not additional fabricated lecture backgrounds).  
**Canonical information:** Celeste Rook says traditions often began as practical solutions; masks originally marked roles and access, later became symbolic; procession routes are primarily logistical.  
**Shared branches:** ASK ABOUT MASKS / ASK ABOUT PROCESSION / LET LESSON CONTINUE.

*[Cut: breakfast. The three sit with plates and the folded programme between them. A few everyday sounds; don't write three minutes of chatter simply to fill time.]*

**SAM:** "Is anybody actually hungry?"

**FLORINE:** "I am."

**MAXINE:** "You said that before we got here."

**FLORINE:** "And I was right."

*[Maxine slides the jam towards her without comment.]*

**SAM:** "What do we have first?"

**MAXINE:** "Founders' History."

**FLORINE:** "And then Archive Methods."

**SAM:** "That sounds like an excellent way to make us all late to lunch."

**MAXINE:** "Can we get through breakfast first?"

*[The scene changes to the North Lecture Hall. Wooden benches creak as people sit. Celeste Rook is halfway through setting out the day's topic.]*

**ROOK:** "Most traditions aren't invented because somebody wants a mystery. They're practical arrangements that survive long enough to become solemn."

*[She puts down the paper she's been holding, waiting for a response.]*

**FLORINE:** "So the masks started as something practical?"

**ROOK:** "They marked roles and access originally. People gave them their symbolism later."

**SAM:** "And the procession? Is there a reason the route is so specific?"

**ROOK:** "A route is logistics first. Ceremony comes afterwards."

**MAXINE:** "That's slightly less romantic than the programme makes it sound."

**ROOK:** "The programme wasn't written by the logistics team."

*[A few students smile. Rook turns back to the lesson without stretching the joke.]*

**PLAYER CHOICE — ask one follow-up, or let class continue:**

- **ASK ABOUT MASKS:**  
  **ROOK:** "Originally they marked role and access. The symbolism came later."  
  *(If Florine already asked spontaneously above, do not repeat this information; use this only as the interactive answer. To implement, remove the earlier direct question or gate it.)*
- **ASK ABOUT PROCESSION:**  
  **ROOK:** "A procession needs a route before it needs a meaning. Organisers tend to care about that distinction."  
  *(Same non-duplication rule.)*
- **LET LESSON CONTINUE:**  
  *Rook turns back to her notes. No extra clue is delivered.*

*[Transition to the Grand Library for Archive Methods. A few students pull out chairs.]*

**SAM:** "I thought we'd be looking at the actual objects."

**MAXINE:** "They probably don't start by handing out the valuable ones."

**FLORINE:** "I'd be more worried if they did."

*[The lesson continues. No record, secret object, or revelation is invented for this montage.]*

**Exit:** S03.

**EDITORIAL GATE:** The Rook questions are canonically interactive. In implementation, use either the common lead-in or the branch answer, **not both**, so characters do not repeat the same information.

---

## S03 — SUITE 417 · GETTING READY

**Setting:** Suite 417 before departure; costume bags, mask boxes, personal invitations; clock is visible **only here** until departure.  
**Existing art:** \`extra-original-photos/Candlelit Masquerade Dressing Room.webp\`.  
**Phone:** P002 Mila Vermeer reminder at **19:35**.  
**Transition marker:** **20:14 departure**. After departure, no absolute in-game clock display.

*[The room looks different now. Clothes hang from the wardrobe doors. Somebody has moved the map to the bed. The masks are out of their boxes.]*

**SAM:** "Okay. Can someone tell me where I put my invitation?"

**MAXINE:** "On the table."

**SAM:** "That was before."

**FLORINE:** "Before what?"

**SAM:** "Before we moved everything."

*[Florine picks up a folded piece of paper, checks the name, hands it over.]*

**SAM:** "Oh. Thank you."

**FLORINE:** "You're welcome."

*[Maxine adjusts the fastening on her outfit, then stops and starts again.]*

**MAXINE:** "Does this look crooked?"

**SAM:** "A little."

**MAXINE:** "Excellent."

**SAM:** "You asked."

**MAXINE:** "I know. Hold this?"

*[Sam does. There's a moment in which no one talks; rain passes over the window.]*

**FLORINE:** "We don't have to leave right this second."

**MAXINE:** "I'm not rushing."

**FLORINE:** "You've been standing by the door for five minutes."

**MAXINE:** "Because somebody put a bag in front of the wardrobe."

**SAM:** "That was me. Sorry."

**MAXINE:** "It's fine. Just move it when you're done."

*[A message from Mila Vermeer arrives.]*

**PHONE P002 (private text notification sent to all players):**  
"Just a reminder, because someone always forgets: bring the actual invitations. They're checking them downstairs."

**FLORINE:** "Mila says they're checking invitations downstairs."

**SAM:** "Good thing I found mine."

**MAXINE:** "Good thing you were looking."

*[They check the invitations and masks one final time.]*

**OPTIONAL INTERACTIONS:**
- **ROOM HOTSPOTS:** Examine outfit, boxes, programme and bags without inventing items.
- **ACCESSORY:** A player may choose a small personal accessory; do not canonise their choice for the other routes.
- **GROUP PHOTO:** Optional.
- **DEPART:** Show academy clock only until **20:14**. After the departure cue, hide absolute time everywhere in the story UI, per V18.

**Exit:** S04 at departure.

---

## S04 — THE THREE W0 ENCOUNTERS · PRIVATE / CONCURRENT

**Setting:** Grand Stair / Reception Arcade / access toward Grand Hall.  
**Shared image:** \`extra-original-photos/3C. Reception Arcade  Late Arrival Checkpoint.webp\` (recommended correction from the previous ad-hoc shared image; verify visually).  
**IMPORTANT:** This is **not** a group dialogue scene. Present a short transition, then keep the projector in a readable waiting state. The three routes appear **only on each character's Blackthorn Phone**. Director waits until all three are ready before S05. No one learns another player's encounter merely by standing at the projector.

**SHARED PROJECTOR — opening transition**

*[Music carries through the open arches. Guests move toward the Hall. The three friends separate briefly among the late arrivals.]*

**FLORINE:** "I'll meet you inside."

**MAXINE:** "Don't disappear."

**FLORINE:** "I'm going through a doorway, Maxine."

**SAM:** "We'll find each other."

*[A pause as they turn into different parts of the crowd.]*

**ON-SCREEN after transition:** *Check your Blackthorn Phone. Continue when all three players are ready.*

### S04 / FLO RINE — ALEXANDER · P003 → P004 → P004B

**P003 Arrival: Alexander controls entry information, not a secret romantic invitation.**

**ALEXANDER:** "The procession route's closed."

**Florine's available responses — preserve user control:**
1. **SHOW INVITATION**  
   **FLORINE (if chosen):** "I'm a guest. Here's my invitation."  
   **ALEXANDER:** "The regular guest route is still open. Follow the cord to the Reception Arcade."
2. **ASK FOR THE REGULAR ROUTE**  
   **FLORINE (if chosen):** "All right. Which way am I meant to go?"  
   **ALEXANDER:** "Reception Arcade. Stay by the cord and you'll be fine."
3. **REPLY IN YOUR OWN WORDS**  
   **ALEXANDER:** *[Nods toward the open route and lets her respond.]*

**P004 Later arrival; do not force the tone of Florine's reply.**

**ALEXANDER:** "So you made it in after all."

1. **TEASE HIM**  
   **FLORINE:** "Were you worried?"  
   **ALEXANDER:** "I'm only this helpful during Founders' Week."
2. **KEEP IT FORMAL**  
   **FLORINE:** "Yes. Thank you for the directions."  
   **ALEXANDER:** *[Gives a brief, almost excessively correct nod.]*
3. **ASK IF HE'S ALWAYS THIS CHEERFUL**  
   **FLORINE:** "Are you always this cheerful?"  
   **ALEXANDER:** "Only during Founders' Week."

**P004B Dance-return beat; this is not a Guard assignment.**

**ALEXANDER:** "This isn't a Guard assignment."

1. **THEN YOU CAN GO**  
   **FLORINE:** "Then you can leave, can't you?"  
   **ALEXANDER:** "That would be rational."  
   *[He remains.]*
2. **THEN STAY**  
   **FLORINE:** "You can stay, if you want."  
   **ALEXANDER:** "I was planning to."
3. **REPLY IN YOUR OWN WORDS**  
   *[Alexander waits.]*

**Note:** The dance-return event exists in the original W0 lane. An eventual CG may be shown **only inside Florine's route**, not as the generic background for Sam and Maxine.

### S04 / SAM — NATE · P005A OR P005B

The two opening lines must be **mutually exclusive** depending on whether Sam actually opened the map.

**P005A \`map_opened=true\`**

**NATE:** "One more step and you'd have decided whether I existed to the left or the right of your map."

1. **TEASE BACK** — **SAM:** "Maybe the map's wrong." / **NATE:** "Then I vote we blame the map."
2. **ASK FOR DIRECTIONS** — **SAM:** "Where's the Grand Hall?" / **NATE:** "Through this arch. Left at the portrait."
3. **REPLY IN YOUR OWN WORDS** — *[Nate waits, smiling, without choosing Sam's response.]*

**P005B \`map_opened=false\`**

**NATE:** "Looking for the Grand Hall? Everyone takes the wrong arch at least once."

1. **ASK FOR DIRECTIONS** — **SAM:** "Which one should I take?" / **NATE:** "This arch, then left at the portrait."
2. **TEASE HIM** — **SAM:** "Do you tell everyone that?" / **NATE:** "Only the ones who look lost. Consider it my public service for the night."
3. **REPLY IN YOUR OWN WORDS** — *[He points out the route and lets her answer.]*

**Note:** Nate should not deliver the same one-liner regardless of Sam's choice. If Sam answers plainly, he can answer plainly.

### S04 / MAXINE — THEO · P006

*[The marble floor is wet near the entrance. Theo turns as Maxine approaches.]*

**THEO:** "If you're going to sprint through wet marble halls all evening, at least try not to fall in my direction."

1. **TEASE HIM**  
   **MAXINE:** "That almost sounded like concern."  
   **THEO:** "Don't get used to it."
   *(EDITORIAL CAUTION: The V18 reaction says it sounded more caring than intended, not that Theo explicitly replies with that line. Keep the approved reaction as a remark/narrative beat unless this is formally approved as new dialogue.)*
2. **ASK WHO HE IS**  
   **MAXINE:** "And you are?"  
   **THEO:** "Theo Mercer. Clinic, research office, and apparently unofficial traffic control tonight."
3. **KEEP IT PRACTICAL**  
   **MAXINE:** "So where's the Grand Hall?"  
   **THEO:** "Straight ahead. At least the floor's dry there."

**Note:** Maxine is not obliged to flirt. Theo may simply be irritable because the marble is wet.

**Required result of S04:** Florine has met Alexander, Sam has met Nate, Maxine has met Theo, governed by the original phone-flow state flags and branch conditions.

---

## S05 — GRAND HALL · THE FIRST SHARED BALL SCENE

**Setting:** Great/Grand Hall during Founders' Evening; warm copper light, wooden balconies, family colours, masks.  
**Existing art:** \`extra-original-photos/3B. Grand Ballroom.webp\`.  
**Essential prop:** A **dark document case tucked under Celeste Rook's arm**, shown unobtrusively. **Do not imply its contents or significance.**  
**Canonical speakers:** Aldous Veyne and Celeste Rook; both original V18 quotes must be meaningfully preserved.

*[The Grand Hall is warm after the entrance corridors. Guests drift between groups; music makes it hard to hear from more than a few steps away.]*

**SAM:** "There you are."

**MAXINE:** "We said we'd meet inside."

**SAM:** "I know. I'm pleased you actually did."

**FLORINE:** "Did you get here long ago?"

**MAXINE:** "A minute. Maybe two."

*[Florine takes in the balconies and crowded floor.]*

**FLORINE:** "It's bigger than it looked on the map."

**SAM:** "The map doesn't show the ceiling."

**MAXINE:** "I think I'm going to need a drink."

**SAM:** "You can have one after we find somewhere to stand."

*[Professor Aldous Veyne addresses a late arrival in passing.]*

**VEYNE:** "If you're going to be late, at least do it in a way someone remembers."

*[He turns towards the group with the air of someone enjoying a gathering but not particularly interested in making a speech.]*

**VEYNE:** "Blackthorn likes its protocols best when nobody asks what problem they were meant to solve."

**MAXINE:** "Do they ever answer that question?"

**VEYNE:** "Every year the answer changes a little. Usually not a good sign for a tradition."

*[Celeste Rook approaches with a dark document case beneath one arm. She doesn't call attention to it.]*

**ROOK:** "Welcome to Blackthorn. Don't believe anyone who tells you Founders' Week is usually quieter."

**SAM:** "Was that meant to be reassuring?"

**ROOK:** "Not particularly."

*[Rook's attention is drawn elsewhere; she moves on. A moment passes while the music resumes its place in the room.]*

**FLORINE:** "Well."

**MAXINE:** "What?"

**FLORINE:** "I didn't say anything."

**MAXINE:** "You said 'well' like you had something to say."

**FLORINE:** "I was looking for somewhere to put my invitation."

*[Sam shifts her sleeve out of the way, revealing she still has hers.]*

**SAM:** "Probably somewhere you won't lose it."

**MAXINE:** "Let's find somewhere less crowded."

**S05 PLAYER OPTIONS (keep original interaction semantics)**

- **ASK VEYNE ABOUT FOUNDERS' WEEK:**  
  **PLAYER (optional):** "Does Founders' Week always run like this?"  
  **VEYNE:** "The answer changes a little every year. That's usually a bad sign for a tradition."  
  *Implementation note: remove Veyne's same answer from the earlier shared exchange if this option is active. No duplicate exposition.*
- **RESPOND TO ROOK:**  
  **PLAYER (optional):** "That wasn't very reassuring."  
  **ROOK:** "It wasn't meant to be."  
  *This reply is conversational connective tissue, not a new factual claim.*
- **IN YOUR OWN WORDS:**  
  Let the player speak/type freely; **do not pretend to parse a specific line** and do not force the others to react as if something unspoken was said.

**Exit:** S06, the music stops. **Do not foreshadow the outcome by injecting clues, ominous prop close-ups or suspect declarations into S05.**

---

## EDITORIAL QA / WHAT MUST BE FIXED BEFORE LIVE INTEGRATION

1. **S02:** Branch questions must not repeat the same canon explanation already spoken in a fixed line. Keep one authoritative answer per player selection.
2. **S04:** Private routes remain private; the group projector cannot narrate Alexander/Nate/Theo's lines to all players.
3. **S04:** \`P005A\` and \`P005B\` mutually exclusive; don't show both. \`P004B\` must remain optional and not force Florine's reaction.
4. **S04:** Some suggested player response lines and Theo's added reply are **creative proposals**. They require approval before turning them into committed canonical lines; original flow intents and reactions remain binding.
5. **S05:** Veyne's optional dialogue can't duplicate the shared exchange.
6. **S03:** 17:30 delivery is a prior notification; 19:35 Mila reminder; **20:14** departure; absolute time vanishes after departure.
7. **S01:** Room interactions are genuinely optional. A group photo is not assumed to have been taken.
8. **S05:** Rook's document case may be shown as described in V18, but no implication about its contents.
9. **All scenes:** No narrator voice reused as a character voice. Do not generate audio until final English line list is approved.
10. **Production issue beyond prose:** The current V18 runtime stores only some romance consequences and relies on thin projector narration; this document is a **script for later implementation**, not proof of playable branching.

**Review request:** Character distinctiveness, conversation naturalness, length of opening and whether the S04 private meetings need more playable beats. Once approved, integrate separate dialogue objects + on-screen actor portraits and then cast separate audio voices, without changing the existing Blackthorn Phones design.
