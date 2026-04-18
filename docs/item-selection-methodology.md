# Menu Buddy — Food Item Selection Methodology

## Overview

This document defines how Menu Buddy selects which food items to present during taste profiling and how user responses map to an internal preference model. The approach is grounded in validated psychometric instruments (APEQ, NIAS, FNS) and recommendation system active learning techniques.

### Core Principle

**Never ask users to categorize themselves. Show specific foods, let the AI discover patterns, let the user correct.**

Users respond to concrete items (mushrooms, not "umami"). The system maps responses to hidden dimensions internally. After enough data points, the AI proposes inferred rules and the user validates.

---

## Hidden Model (what the user never sees)

The internal model tracks preferences across dimensions derived from validated instruments:

### From APEQ (Adult Picky Eating Questionnaire)
| Dimension | What it measures | How we detect it |
|---|---|---|
| Meal Presentation | Rigidity about preparation/plating | Responses to same ingredient in different forms |
| Food Variety | Willingness to try unfamiliar foods | Responses to novel/ethnic items vs familiar ones |
| Meal Disengagement | Social eating anxiety, avoidance | Free-text signals, post-meal follow-ups |
| Taste Aversion | Bitter/sour rejection | Responses to bitter and sour items |

### From NIAS (Nine Item ARFID Screen)
| Dimension | What it measures | How we detect it |
|---|---|---|
| Picky/Selective | Overall selectiveness | Ratio of "no" to "yes" across all items |
| Low Appetite | Limited interest in eating | Not directly measured in item selection (captured in onboarding) |
| Fear of Consequences | Worry about choking, nausea, etc. | Free-text analysis, flagging of fear-related language |

### Additional Dimensions (from texture/sensory research)
| Dimension | What it measures |
|---|---|
| Texture Sensitivity | Oral tactile sensitivity — slimy, mushy, chewy, gritty |
| Context Dependency | Same ingredient accepted in one form, rejected in another |
| Sensory Complexity Tolerance | Comfort with mixed flavors, compound dishes, layered textures |
| Heat Tolerance | Spicy/chili sensitivity spectrum |

---

## Item Selection Strategy

### Active Learning Approach

Items are not chosen randomly or by popularity. They are chosen to **maximize information gain per response.** Each item is selected because:

1. **It divides picky eaters roughly evenly** — if 95% of people like bread, asking about bread tells us nothing. If mushrooms split people 50/50, that's diagnostic.
2. **The response predicts responses to many other items** — saying "no" to raw oysters predicts responses to other slimy foods, reducing future questions needed.
3. **It tests a specific hidden dimension** — each item maps to one or more dimensions in the hidden model.

### Signal Value Rating

Each item gets a **signal value** score based on:
- **Divisiveness** (0-10): How evenly it splits picky eaters. 10 = perfect 50/50 split.
- **Predictiveness** (0-10): How many other foods can be inferred from this response. 10 = predicts dozens of other items.
- **Dimension coverage**: Which hidden dimensions this item informs.

---

## Round 1: Gateway Items (15 items)

These are the first items every user sees. They are the most diagnostic, culturally recognizable, and efficient at building an initial model. Presented as a tappable grid — quick reactions, no overthinking.

### The Items

| # | Item | Signal Value | Dimensions Tested | Why This Item |
|---|---|---|---|---|
| 1 | **Mushrooms** | D:9 P:8 | Texture, umami, food variety | The single most divisive food for picky eaters. Splits on both taste (earthy/umami) AND texture (slimy/spongy). Response predicts truffle, mushroom sauce, cream of mushroom soup. |
| 2 | **Raw tomato** | D:7 P:9 | Context dependency, texture | Many people hate raw tomato but love tomato sauce. Extremely high predictive value — the gap between raw and cooked tomato response reveals how context-dependent the user is. |
| 3 | **Blue cheese** | D:8 P:7 | Taste aversion, strong flavors, dairy tolerance | Tests pungent/mold tolerance. Predicts responses to strong cheeses, funky fermented foods, and the upper bound of dairy comfort. |
| 4 | **Cilantro** | D:8 P:5 | Genetic taste sensitivity | Famous genetic component (OR6A2 gene — tastes like soap to ~14% of people). Low predictive value for other foods but high diagnostic value for taste sensitivity baseline. |
| 5 | **Avocado** | D:7 P:7 | Texture (creamy), mild flavors | Tests comfort with creamy/soft textures AND bland/mild flavors. Predicts responses to guacamole, smoothies, hummus, other "smooth" foods. |
| 6 | **Sushi (raw fish)** | D:8 P:8 | Food variety, texture, raw food comfort | Tests multiple dimensions at once: willingness to try non-Western food, comfort with raw protein, and specific fish texture. Predicts sashimi, tartare, ceviche, poke. |
| 7 | **Olives** | D:8 P:6 | Bitter/briny, strong flavors | Highly divisive. Tests tolerance for bitter/briny/oily flavors. Predicts capers, tapenade, and Mediterranean cooking comfort. |
| 8 | **Spicy Thai curry** | D:7 P:8 | Heat tolerance, complex flavors, food variety | Tests both spice tolerance AND comfort with unfamiliar complex dishes. Predicts responses to Indian, Mexican, Sichuan, Korean food. |
| 9 | **Runny egg yolk** | D:7 P:7 | Texture (liquid/gooey), preparation sensitivity | Very specific texture test. Many people eat eggs but can't handle runny yolk. Predicts comfort with soft-poached, sunny-side-up, and sauces with raw egg (Caesar, carbonara). |
| 10 | **Liver / pâté** | D:8 P:6 | Organ meat, strong flavors, iron/mineral taste | Tests the extreme end of meat tolerance. Predicts blood sausage, sweetbreads, and general offal comfort. Also tests "luxury food" openness (pâté vs liver). |
| 11 | **Pickles / sauerkraut** | D:6 P:7 | Sour, fermented, vinegar | Tests sour/acid tolerance and fermentation comfort. Predicts kimchi, kombucha, vinaigrette, ceviche, and all vinegar-based preparations. |
| 12 | **Coconut** | D:6 P:6 | Texture (flaky/grainy), tropical flavors, sweetness | Divisive on both flavor (tropical, sweet) AND texture (shredded coconut is a common complaint). Predicts responses to coconut milk curries, tropical desserts. |
| 13 | **Honey-glazed meat** | D:7 P:8 | Sweet + savory combo, flavor mixing | Directly tests the sweet-in-savory-food sensitivity we identified as critical. Predicts teriyaki, BBQ sauce, fruit-based chutneys, mole, sweet chili. Very high predictive value. |
| 14 | **Mayo / aioli** | D:7 P:6 | Creamy condiment, egg-based, cold fat | Extremely divisive condiment. Tests cold-creamy-fat tolerance. Predicts ranch, remoulade, tartar sauce, and overall "condiment comfort." |
| 15 | **Banana (ripe/soft)** | D:6 P:7 | Mushy texture, sweetness level | Tests mushy texture tolerance specifically. Response predicts comfort with soft fruits, smoothie texture, baby-food-adjacent consistencies. Also: ripe vs unripe preference reveals texture sensitivity. |

### Response Options Per Item

Each item gets one of six responses:

| Response | Label | What it tells us |
|---|---|---|
| Love | "Love this" | Strong positive — actively seek out |
| Fine | "It's fine" | Neutral/acceptable — won't complain, won't order |
| Meh | "Not really" | Mild dislike — would prefer to avoid but won't send back |
| No | "Hard no" | Strong aversion — would send back, might gag, ruins a dish |
| Depends | "It depends" | Context-dependent — triggers a follow-up |
| Unknown | "Never tried" | No data — flagged for future |

The split between "Not really" and "Hard no" is critical. Research shows picky eaters have a wide range of aversion intensity — from mild distaste to disgust/gag responses. A mild dislike means "warn me but I can deal." A hard no means "if this is in the dish at all, even hidden, flag it red." This maps directly to the recommendation confidence thresholds.

**"It depends" is the most valuable response.** It reveals context dependency, which is the defining characteristic of nuanced picky eaters (the cheese problem). When a user taps "depends," the system queues a targeted follow-up for Round 2.

### Inline Comment Button

Every item card has a small comment/note icon. Tapping it opens a quick text field: *"Want to add a note?"*

Most users won't use it. But for users who need to say "not raw but sauce is fine" or "only when it's smoked" — this is essential. These notes are the highest-value input in the system. They go directly into the narrative profile and often contain the exact contextual rules that no amount of card-tapping could capture.

Examples of real inline comments:
- Tomato: "Sauce is great, but a whole cooked tomato split open? No way"
- Cheese: "Melted on things is fine. Cold or strong cheese is terrible"
- Salmon: "Smoked on toast = perfect. Thick cooked fillet = too fatty"
- Horseradish: "Only with smoked salmon. Hate it in any other context"

---

## Round 2: Adaptive Follow-Ups (8-12 items)

Generated based on Round 1 responses. The system identifies:

1. **"Depends" responses** — ask about the same food in different contexts
2. **Inline comments** — parse user notes for context rules and verify understanding
3. **Dimension gaps** — if Round 1 didn't cover a dimension well, add items for it
4. **Contradiction tests** — if responses seem inconsistent, probe the boundary

### Transition UX

Round 2 must not feel like a surprise. After Round 1 completes, the AI frames the follow-ups:

> "Good start. I noticed some foods where the answer might depend on how they're prepared. Let me check a few things — this will make my recommendations much more accurate."

This sets the expectation that the same ingredient will appear in different forms. Without this framing, users will think the system is broken ("I already said no to tomatoes, why are you asking again?").

### Follow-Up Types

**Type 1: Ingredient-State Probes (for "depends" or inline comments)**

For the top context-dependent ingredients, always probe multiple states when triggered:

| Ingredient | States to probe |
|---|---|
| Tomato | Raw sliced, in fresh salsa, as cooked sauce, whole roasted |
| Onion | Raw, caramelized/fried, as powder/seasoning, in a cooked dish (hidden) |
| Cheese | Melted on things, cold/sliced, strong (blue/goat), as parmesan/seasoning |
| Egg | Scrambled/hard, runny yolk, raw in dressing (Caesar, mayo), baked into things |
| Salmon/fish | Raw (sushi), smoked, pan-fried thick, flaked in a dish |
| Pepper | Bell pepper (raw), bell pepper (cooked), black pepper, chili pepper |

Format: Show 3-4 context cards for the ingredient. Each card is a specific preparation. User reacts to each independently.

**Type 2: AI Inference Verification**

> "You seem to dislike umami from fungi but enjoy it from fermented sources. Does that sound right?"

The AI proposes a pattern. User confirms or corrects.

**Type 3: Gap Fillers**

If Round 1 didn't cover a hidden dimension well, add targeted items.

### Adaptive Selection Algorithm

```
for each "depends" response in Round 1:
    generate 3-4 ingredient-state variations
    add to Round 2 queue (high priority)

for each inline comment in Round 1:
    parse for context rules
    generate verification cards
    add to Round 2 queue (high priority)

for each hidden dimension with < 2 data points:
    select highest-signal item for that dimension
    add to Round 2 queue (medium priority)

for each apparent contradiction:
    generate a boundary-testing item
    add to Round 2 queue (medium priority)

sort Round 2 queue by priority, then information gain
present top 8-12 items
```

---

## Round 3: AI Inference + Correction

After Rounds 1 and 2, the AI has ~25 data points. It generates a plain-language summary of inferred rules:

### Example Output

```
Here's what I think I know about you:

CONFIDENT:
- You avoid slimy and mushy textures (raw oysters, overripe banana, mushy vegetables)
- You like bold savory flavors but not funky ones (soy sauce yes, blue cheese no)
- You're open to spicy food but prefer it in familiar formats (Thai curry yes, but you'd want to know what's in it)

LESS SURE:
- You seem okay with cheese when melted but not cold/strong (burger cheese yes, blue cheese no — is that right?)
- Sweet + savory seems to be a maybe for you (honey glaze was "depends") — what's the line?

GAPS:
- I don't know much about your vegetable preferences yet
- Haven't asked about seafood beyond sushi
- No data on your feelings about herbs and spices
```

The user taps to confirm, correct, or add nuance to each inference. Corrections are weighted heavily — they override statistical predictions.

---

## Free-Text Chat Input

A persistent text input lives at the bottom of the timeline, always available. It serves three purposes:

**1. Power user fast-track:** Someone who already knows their preferences can dump a wall of text ("I love smoked salmon on toast but can't stand thick cooked salmon fillets, the fatty texture is unbearable. Horseradish is great but ONLY with salmon, hate it on schnitzel..."). The AI parses this and builds the narrative profile directly.

**2. Nuance that cards can't capture:** "I'm okay with olives in olive bread but on a salad the taste gets into everything and ruins it." No card system can elicit this. Free text can.

**3. Corrections and additions over time:** After onboarding, the user can always come back and type new things. "Had sashimi for the first time last night and actually loved it."

The cards are the guided path. The chat is the escape hatch. Both feed into the same narrative profile.

---

## Storage Architecture

### The Prompt Size Problem

If we store structured data for every food in every context, the profile becomes enormous and hard for the AI to reason over. A user who has detailed opinions about 50+ foods with contextual rules would generate thousands of structured entries.

**Solution: Store preferences as natural language, not database rows.**

Humans store food preferences as stories and associations, not tables. The AI should too.

### Three-Layer Storage

```
Layer 1: Raw Signals (structured, for the profiling engine)
├── Round 1 responses: {mushrooms: "hard_no", tomato: "depends", ...}
├── Round 2 responses: {tomato_raw: "love", tomato_cooked_whole: "hard_no", ...}
├── Inline comments: {tomato: "sauce great, whole cooked mushy = no"}
├── Chat messages: full conversation text
└── Post-meal feedback: raw user input

Layer 2: Narrative Profile (AI-generated, human-editable)
├── Natural language document summarizing everything
├── Organized by ingredient/theme, not by abstract category
├── Regenerated by AI after each significant new signal
├── User can read and edit directly ("My Taste Profile")
└── THIS is what gets sent in the menu analysis prompt

Layer 3: Hard Rules (structured, user-confirmed, never overridden)
├── Allergies: [shellfish, peanuts]
├── Absolute dealbreakers: [raw onion, liver]
└── These ALWAYS flag red, regardless of AI reasoning
```

### Example Narrative Profile

```markdown
## Tomatoes
Loves raw tomatoes and tomato sauce. Pizza with extra sauce is great.
But hates whole cooked tomatoes — the mushy, split-open texture is a
dealbreaker. The line is: processed/sauced = yes, intact and soft = no.

## Salmon & Fish
Very preparation-dependent. Smoked salmon on toast is a favorite.
Small amounts in sushi are fine. But a thick cooked salmon fillet is
too fatty — the fattiness is the issue, not the fish itself. Other
white fish when grilled is generally okay.

## Cheese
Complicated. Melted cheese on burgers and pizza is fine. Parmesan on
pasta with green pesto is good. But cold cheese, strong cheese (blue,
goat), and cheese as a main ingredient (cheese plate, mac and cheese)
are all hard nos. The line: cheese as seasoning/melted = okay, cheese
as a feature = no.

## Horseradish
Loves it specifically with smoked salmon on toast. Hates it in every
other context — Bavarian restaurants, on schnitzel, in cocktail sauce.
This is a pure pairing preference, not an ingredient preference.

## Textures
Strong aversion to mushy/slimy. Overcooked vegetables, raw oysters,
soft overripe banana are all hard nos. Loves crunchy and crispy.
Chewy is fine in familiar contexts (good steak) but not unfamiliar
ones (squid, mochi).

## Heat / Spice
Likes moderate spice. Thai curry is good. Indian is good if not
extreme. But sharp/horseradish-type spice is only okay in very
specific pairings (see Horseradish above).
```

This profile is roughly 1,500 tokens. Even a very detailed profile with 30+ entries stays under 4,000 tokens. Combined with system instructions (~500 tokens) and a menu (~1-3k tokens), the total prompt for menu analysis is well within model context limits.

### Why Narrative Over Structured

- LLMs reason over prose better than over database rows
- Natural language captures nuance that structure can't ("the fattiness is the issue, not the fish itself")
- Users can read and edit their own profile — it's not a black box
- The AI can write new entries in the same format after learning new things
- Scales to arbitrary complexity without schema changes

### Profile Regeneration

After significant new input (Round 2 completion, post-meal feedback, free-text additions), the AI regenerates the narrative profile:

1. Read current narrative profile
2. Read new raw signals (Layer 1)
3. Generate updated profile, preserving existing entries and adding/modifying based on new data
4. Show diff to user: "I updated your profile — here's what changed"
5. User approves or edits

---

## Safe Food Core

After profiling, the system explicitly derives a **safe food list** — foods and preparations the user reliably enjoys. This is the most important output for stressful dining situations.

### Why This Matters

When a user is at an unfamiliar restaurant, anxious, or in a group, they don't want recommendations. They want a guaranteed safe option. The safe food core answers: "What on this menu is closest to something I know I like?"

### How It's Derived

```
safe_foods = items where:
    - Response was "Love" in Round 1 or Round 2
    - OR item matches a confirmed positive in the narrative profile
    - AND no conflicting signals exist
    - AND confidence is high (multiple confirming data points)
```

### Example Safe Food Core

```
YOUR SAFE FOODS:
- Grilled chicken (any preparation without heavy sauce)
- Plain pasta with tomato sauce
- Rice dishes (not fried with too many mixed ingredients)
- Smoked salmon (on toast, in a sandwich)
- Pizza (standard toppings, no strong cheese)
- French fries
- Simple grilled fish (white fish, lemon/herbs)
- Fresh bread

SAFE CUISINES:
- Italian (stick to simple pasta, pizza, grilled proteins)
- Japanese (sushi with familiar fish, avoid raw shellfish)
- American/comfort food (most items safe, watch for heavy cream sauces)

SAFE FALLBACK ORDER:
"If nothing else works, look for grilled chicken with a side salad
(dressing on the side) or a simple pasta with tomato sauce."
```

This gets highlighted prominently in the app and is the first thing shown when analyzing a menu in "protect me" mode.

---

## Ongoing Learning (Post-Onboarding)

### Post-Meal Feedback Loop
Every restaurant scan adds to the model:
1. Which dishes were rated green/yellow/red
2. What the user actually ordered
3. Post-meal feedback ("the olives ruined the salad")
4. AI extracts new rules from feedback and adds to profile

### Diminishing Returns Curve
- After Round 1 (15 items): ~40% confidence — enough for basic recommendations
- After Round 2 (25 items): ~60% confidence — good for most restaurants
- After 5 restaurant scans with feedback: ~75% confidence
- After 20 restaurant scans: ~90% confidence — the AI knows you better than you know yourself

---

## Item Database: Extended List

Beyond the 15 gateway items, here is the full candidate pool organized by primary dimension tested. Items are pulled into Round 2 adaptively based on gaps.

### Texture Probes
| Item | Primary texture | Also tests |
|---|---|---|
| Raw oysters | Slimy extreme | Seafood, raw food |
| Mochi | Chewy/sticky | Unfamiliar, sweet |
| Overcooked pasta | Mushy | Preparation sensitivity |
| Crispy bacon | Crispy baseline | Almost universally liked — calibration item |
| Tofu (plain) | Spongy/bland | Unfamiliar, texture without flavor |
| Gnocchi | Soft/pillowy | Potato vs pasta, doughy |
| Tapioca/boba | Chewy balls | Unfamiliar texture, sweet drinks |

### Taste Probes
| Item | Primary taste | Also tests |
|---|---|---|
| Dark chocolate (85%+) | Bitter | Intensity tolerance |
| Grapefruit | Bitter + sour | Citrus, breakfast food |
| Espresso (no sugar) | Bitter liquid | Beverage preferences |
| Fish sauce (in cooking) | Extreme umami/funk | Hidden ingredient, Asian cooking |
| Capers | Briny/salty | Mediterranean, small garnish |
| Raw ginger | Spicy/pungent | Asian food, sharpness |
| Licorice / anise | Polarizing flavor | Fennel, absinthe, star anise |

### Context Dependency Probes
| Item pair | What the gap reveals |
|---|---|
| Raw tomato vs tomato sauce | Cooking transforms acceptance |
| Raw onion vs caramelized onion | Same ingredient, opposite reactions |
| Cold cheese vs melted cheese | Temperature changes everything |
| Whole olive vs olive oil | Form factor matters |
| Raw carrot vs cooked carrot | Texture preference for same vegetable |
| Scrambled eggs vs runny eggs | Preparation method sensitivity |

### Complexity / Variety Probes
| Item | What it tests |
|---|---|
| Ethiopian injera platter | Unfamiliar cuisine, mixed textures, communal eating |
| Sushi omakase (chef's choice) | Trust/control, variety, surprise |
| Tapas / shared plates | Small portions, variety, social eating |
| Unfamiliar fruit (dragonfruit, lychee) | Pure novelty response |
| Street food (unspecified country) | Hygiene anxiety, adventurousness, trust |

---

## Calibration Items

Some items exist not to learn preferences but to **calibrate the scale:**

| Item | Expected response | Purpose |
|---|---|---|
| French fries | Almost universally liked | Establishes "yes" baseline — if someone says no to fries, their threshold is extremely high |
| Plain white rice | Almost universally acceptable | Safe food baseline |
| Grilled chicken breast | Broadly acceptable protein | Protein baseline |
| Fresh bread | Almost universally liked | Carb/comfort baseline |

If a user rejects calibration items, the system knows it's dealing with an extremely selective eater and adjusts accordingly (more cautious recommendations, narrower search).

---

## Technical Notes

### Information Gain Calculation

For each candidate item, information gain is estimated as:

```
gain(item) = entropy_reduction(hidden_model, predicted_response_distribution)
```

Where `predicted_response_distribution` is estimated from:
- Population-level data (what % of people like/dislike this)
- Current user model (given what we know, what would we predict?)

Items where our prediction is least confident have the highest information gain.

### Response Weighting

Not all responses are equal:
- **Corrections to AI inferences** = highest weight (direct user override, always wins)
- **Inline comments / free-text notes** = very high (natural language context rules)
- **"Depends"** = high (reveals context rules, triggers follow-ups)
- **"Love" or "Hard no"** = high (clear signal with intensity)
- **"Not really"** = moderate (mild dislike — warn but don't block)
- **"Fine"** = moderate (tells us it's not a factor)
- **Post-meal feedback** = high (real-world validation of predictions)
- **"Never tried"** = low (no preference data, but flags novelty tolerance)

### Aversion Intensity

The split between "Not really" and "Hard no" drives recommendation behavior:

| Aversion Level | Menu Analysis Behavior |
|---|---|
| "Not really" (mild) | Yellow flag: "This dish contains X, which you're not a fan of. You could ask for it without." |
| "Hard no" (strong) | Red flag: "This dish contains X. Avoid." Also triggers hidden ingredient warnings for this item. |

Strong aversions also expand the hidden ingredient search. If someone has a hard no on mushrooms, the AI should warn about truffle oil, mushroom-based broths, and duxelles even when not listed on the menu. For mild dislikes, hidden ingredient warnings are less aggressive.

### Dish Decomposition (separate from profiling)

The preference model feeds into menu analysis, but dish decomposition is handled by the AI at analysis time, not pre-computed. When analyzing a menu, the AI prompt includes:

1. System instructions for how to decompose dishes
2. Hard rules (Layer 3) — always check first
3. Narrative profile (Layer 2) — the main reasoning context
4. The menu text

The AI's food knowledge handles ingredient inference, hidden ingredients, cuisine-specific conventions, and preparation methods. We don't need to build a food ontology — the LLM already has one. What we need is a well-crafted system prompt that instructs the AI how to use the profile for reasoning.

### Cultural Adaptation

The gateway 15 items are biased toward Western cuisine. For non-Western users, the system should:
1. Detect user's primary cuisine familiarity during onboarding
2. Swap gateway items for culturally equivalent diagnostics
3. Maintain the same hidden dimension coverage

Example: For a user from East Asia, replace "blue cheese" with "stinky tofu" (same dimension: pungent fermented food tolerance).

---

## Open Questions

1. **How many items is too many?** Research suggests survey fatigue sets in around 20 items for general populations. Picky eaters might be more engaged (it's about THEIR food) but we should target 15 gateway + 10 adaptive maximum before showing results.

2. **Should we show photos or illustrations?** Photos are more visceral (which is good for picky eaters — they respond to visual appearance) but harder to source/license. Illustrations are more controllable. Could A/B test.

3. **How to handle "it depends" at scale?** If a user taps "depends" on 10 out of 15 items, the follow-up round becomes huge. Solution: prioritize by predictive value — a "depends" on tomato (high context dependency, predicts many dishes) is more valuable than "depends" on coconut (niche). Cap Round 2 at 12 items max, queue the rest for later.

4. **Validation:** Before launch, we should run this item set through a small pilot (20-30 real picky eaters) and measure whether Round 1 responses actually predict Round 2 responses. If prediction accuracy is below 60%, the item selection needs tuning.

5. **Narrative profile regeneration frequency:** How often should the AI rewrite the profile? After every input? Only after significant new data? Too frequent = expensive API calls. Too infrequent = stale profile. Starting point: regenerate after Round 2 completion, after each post-meal feedback, and on user request.

6. **Profile editing UX:** Users should be able to read and edit their narrative profile directly. But editing prose is harder than editing structured data. Should there be a "structured view" alongside the narrative? Or just let users add notes that the AI incorporates on next regeneration?

7. **Cultural adaptation validation:** The gateway 15 items are Western-biased. Before expanding to non-Western users, need equivalent diagnostic items validated for East Asian, South Asian, Middle Eastern, Latin American palates. This is a research project in itself.

8. **Contradiction resolution:** When signals conflict (loves sushi but rejects runny egg), the AI reasons contextually using the narrative profile. But if contradictions persist after multiple corrections, the system should surface them: "I'm getting mixed signals about soft/liquid textures — can you help me understand the line?" Rather than silently picking one interpretation.
