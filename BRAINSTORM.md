# Menu Buddy - App Brainstorm

## The Problem

Picky eaters have no native tool to help them navigate restaurant menus. Current workaround: telling ChatGPT your preferences and asking it to analyze menus in freeform chat. It works but feels clunky, isn't purpose-built, and you re-explain context constantly.

Menu Buddy is a **personal food translator** — not just language translation, but translating between "what I actually want to eat" and "what this menu is offering."

---

## Target Users

### Two Distinct User Types

**The "Preferences" Eater**
- "No fatty meats, I like spicy food, not big on cream sauces"
- Will eat most things, just has a clear set of likes/dislikes
- Wants recommendations and warnings
- Explores menus but wants guidance

**The "Safe Foods" Eater**
- "Plain rice, chicken nuggets, maybe plain pasta"
- Much more restricted diet
- Doesn't want recommendations — wants to know what on this menu is close enough to what they actually eat
- Not exploring, surviving
- Often feels awkward at group dinners

The app must handle both without making the safe-foods person feel judged or the preferences person feel limited.

---

## Core Features

### 1. Food Profile (Onboarding & Ongoing)

- Build your profile through a **guided AI conversation**, not a giant form
- AI asks questions like "how do you feel about spicy food?" and builds the profile naturally
- Support intensity levels — difference between "I don't love onions" and "if there's a raw onion I'm sending it back"
- Categories beyond just ingredients:
  - Textures (creamy, crunchy, chewy)
  - Flavor combos (sweet+savory, sweet+salty)
  - Temperatures
  - Cooking methods (fried vs grilled vs raw)
- "Unknown" / "curious" category for ingredients they've never tried
- Profile learns over time — "you liked this dish which had X, so maybe you'd like Y"
- Stored in **iCloud via CloudKit** for cross-device sync

### 2. Menu Analysis

**Input methods:**
- Photo of a physical menu (camera / photo library)
- Paste text from a restaurant website
- Future: auto-pull from Google Maps / Yelp / restaurant sites (v2, scraping is messy)

**Output:**
- Green / yellow / red system per dish
- Short explanation for each: why it's recommended or flagged
- Suggested modifications: "you could ask for the sauce on the side"

### 3. Hidden Ingredient Warnings (Killer Feature)

The AI reads *between the lines* of menu items using deep food knowledge:
- "Caesar salad" doesn't say anchovies or raw egg, but they're likely in the dressing
- "Pad Thai typically contains fish sauce even though it's not listed"
- "Risotto is almost always made with parmesan"
- "Mole sauce usually has chocolate in it"
- "This sounds like it could be a sweet/savory combo based on the glaze"
- Cuisine-specific knowledge — common base ingredients by cooking tradition

**Critical design principle:** The app should NEVER say "this is definitely safe." Instead: "this looks like a good match, but note that [cuisine] dishes often include [thing]." Confident recommendations, transparent reasoning, never claim certainty about what's in someone else's kitchen.

### 4. Translation Mode

For traveling abroad:
- Generate the **exact phrase** in the local language, natural-sounding, not robotic
- Culturally aware — how do you politely make modifications in this country?
  - In Japan you basically don't
  - In Italy they might look at you funny
  - In the US it's totally normal
- Could generate a card you show the waiter on your phone
- Also works domestically: at a Thai restaurant and don't know what half the menu means? The app explains dishes in terms of your preferences, not just dictionary definitions

---

## Technical Architecture

### Platform
- **Native iOS app** built with **SwiftUI**
- Target: **iOS 26+** with Liquid Glass design language
- iPhone-first, iPad later

### AI Strategy — Hybrid Approach

**Apple Foundation Models (on-device, ~3B params):**
- Runs entirely on-device, offline capable, free
- Good for: preference matching, basic menu text parsing, translation phrase generation
- Guided generation for structured output (JSON schemas)
- Tool calling back into the app
- Available on any Apple Intelligence-compatible device

**OpenAI API (cloud, for deep analysis):**
- The "this Caesar salad probably has anchovies" reasoning needs a real LLM
- Deep food knowledge, cuisine-specific understanding
- Hidden ingredient inference
- Complex preference matching against nuanced menu descriptions
- Called directly from app (for personal/small scale use; add backend proxy if scaling)

**Hybrid flow:**
- User scans menu -> Vision framework OCR extracts text
- On-device model does initial parsing and basic matching
- OpenAI handles deep analysis, hidden ingredients, cultural context
- Translation can work entirely on-device for offline use

### Data & Storage
- Food profile stored in **CloudKit** (iCloud)
- Structured data, syncs across devices
- Free at personal/small scale
- API key stored in Keychain

### Menu Input Pipeline
1. Camera capture or photo selection
2. **Vision framework** OCR extracts text
3. On-device model cleans/structures the text
4. OpenAI analyzes dishes against user profile
5. Results displayed with confidence levels and reasoning

---

## Design Direction

### iOS 26 Liquid Glass
- Standard SwiftUI components automatically get Liquid Glass treatment
- TabView -> liquid glass tab bar
- NavigationSplitView -> glass sidebar
- Custom views use `.glassEffect()` modifier
- Dynamic Island-compatible design
- No purple color scheme

### UX Principles
- Never make picky eaters feel judged
- Show AI reasoning, don't hide it
- Err on the side of flagging (false positive > false negative)
- Distinguish between "will get sick" (allergy) and "won't enjoy" (preference)
- Make it feel like a helpful friend, not a medical tool

---

## Scope & Prioritization

### MVP (v1)
1. Food profile screen — guided AI conversation onboarding
2. iCloud sync for profile
3. Menu input — text paste first, then camera
4. AI menu analysis with green/yellow/red ratings
5. Hidden ingredient warnings
6. Translation mode for ordering abroad

### Future (v2+)
- Auto-pull menus from restaurant websites / Google Maps / Yelp
- Restaurant recommendations ("safe restaurants" for your profile)
- Group mode — find restaurants that work for everyone
- Profile learning from feedback ("I actually liked this")
- Share profile with friends/family ("ordering for someone else")
- Apple Watch companion — quick glance at recommendations

---

## Key Design Decisions

- **No vegan/vegetarian focus** — but the app will be accidentally great at it since the underlying logic is the same
- **AI shows reasoning** — never just "safe" or "unsafe" without explanation
- **Personal project first** — built for 1-2 users initially, but architected for App Store release
- **No shortcuts in architecture** — build it right from the start for future users
- **Allergy vs preference distinction** — different severity levels, different UI treatment

---

## Open Questions

- How specific should preferences get? "I hate cilantro" is easy. "I don't like when things are unexpectedly sweet" is harder but more useful
- Should there be a community layer eventually? (Share profiles, rate restaurant "picky-friendliness")
- Monetization if it goes public? Freemium with limited scans? Subscription for unlimited?
- How to handle menus in non-Latin scripts? OCR + translation pipeline
