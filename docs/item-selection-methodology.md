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

Each item gets one of five responses:

| Response | Label | What it tells us |
|---|---|---|
| Love | "Love this" | Strong positive — actively seek out |
| Fine | "It's fine" | Neutral/acceptable — won't complain, won't order |
| No | "Not for me" | Reject — would not choose, might send back |
| Depends | "It depends" | Context-dependent — triggers a follow-up |
| Unknown | "Never tried" | No data — flagged for future |

**"It depends" is the most valuable response.** It reveals context dependency, which is the defining characteristic of nuanced picky eaters (the cheese problem). When a user taps "depends," the system queues a targeted follow-up for Round 2.

---

## Round 2: Adaptive Follow-Ups (8-12 items)

Generated based on Round 1 responses. The system identifies:

1. **"Depends" responses** — ask about the same food in different contexts
2. **Dimension gaps** — if Round 1 didn't cover a dimension well, add items for it
3. **Contradiction tests** — if responses seem inconsistent, probe the boundary

### Follow-Up Templates

**For "depends" on raw tomato:**
> Show three context cards:
> - Raw tomato slices on a sandwich
> - Tomato in a fresh salsa/bruschetta
> - Cooked tomato sauce on pasta
>
> "You said raw tomato 'depends.' Help me understand — which of these are okay?"

**For "depends" on sushi:**
> - California roll (cooked crab, avocado)
> - Salmon nigiri (raw fish, rice)
> - Sashimi (just raw fish, nothing else)
>
> "Is it the raw fish specifically, or something else about sushi?"

**For "no" to mushrooms but "love" to soy sauce:**
> AI inference: "You seem to dislike umami from fungi but enjoy it from fermented sources. Does that sound right?"
> This is the AI proposing a pattern. User confirms or corrects.

**For "no" to blue cheese but no data on other cheese:**
> - Mozzarella on pizza
> - Cheddar on a burger
> - Parmesan on pasta
> - Cream cheese on a bagel
>
> "Blue cheese is a no — what about these?"

### Adaptive Selection Algorithm

```
for each "depends" response in Round 1:
    generate 2-3 context variations of that item
    add to Round 2 queue

for each hidden dimension with < 2 data points:
    select highest-signal item for that dimension
    add to Round 2 queue

for each apparent contradiction:
    generate a boundary-testing item
    add to Round 2 queue

sort Round 2 queue by information gain (descending)
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
- **"Depends"** = highest value (reveals context rules)
- **"Love" or "No"** = high value (clear signal)
- **"Fine"** = moderate value (tells us it's not a factor)
- **"Never tried"** = low value (no preference data, but flags novelty tolerance)
- **Corrections to AI inferences** = highest weight of all (direct user override)

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

3. **How to handle "it depends" at scale?** If a user taps "depends" on 10 out of 15 items, the follow-up round becomes huge. May need to prioritize which "depends" items to drill into first.

4. **Validation:** Before launch, we should run this item set through a small pilot (20-30 real picky eaters) and measure whether Round 1 responses actually predict Round 2 responses. If prediction accuracy is below 60%, the item selection needs tuning.
