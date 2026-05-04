# Netflix Asiacell Integration

_Started 2026-05-04 07:25 UTC_

---

## User

create a video for a customer journey for this Netflix subscription through Asiacell balance in Arabic language. use Asiacell brand guidelines.

## Assistant

I'll help you create an animated video for the Netflix subscription customer journey through Asiacell balance. Let me start by exploring the design system and reading the user journey PDF.

_[tool: list_files]_

_[tool: list_files]_

The design system project appears empty. Let me read the PDF and explore further.

_[tool: invoke_skill]_

_[tool: list_files]_

The design system project is empty, so I'll need to research Asiacell's brand independently. Let me read the PDF first.

_[tool: run_script]_

_[tool: web_search]_

_[tool: questions_v2]_

Now I have the journey content. Let me set up the project. I have enough info — Asiacell uses a distinctive orange brand color. Let me ask a few quick questions to nail the direction.

## User

Questions answered:
- duration: ~30-40 seconds (standard explainer)
- style: Mix of Asiacell brand + Netflix cinematic
- device_frame: Mix: phone for app screens, full-bleed for hero moments
- voice_or_captions: Silent with bold Arabic captions on screen
- logo_handling: Use real Asiacell + Netflix logos (I'll trust you to recreate them)
- ending: Co-branded end card: "Asiacell × Netflix"

## Assistant

I have what I need. Let me set up the project and build the animated video.

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

Now let me build the video. I'll plan the scenes mapping to the journey:

**Plan (35s, 1920×1080):**
1. **0–3s** — Asiacell logo intro (orange brand)
2. **3–6s** — Hero: "اشترك في نتفلكس برصيد آسياسيل" 
3. **6–10s** — Step 1: Open Netflix Iraq URL (browser)
4. **10–14s** — Step 2: Sign in with email
5. **14–18s** — Step 3: Choose subscription plan
6. **18–22s** — Step 4: Choose Asiacell as payment method
7. **22–26s** — Step 5: Enter phone number
8. **26–30s** — Step 6: OTP verification
9. **30–33s** — Step 7: SMS confirmation
10. **33–37s** — Co-branded end card

Let me build this with multiple files for maintainability.

_[tool: write_file]_

Now the helpers — a phone frame for app screens and a caption component for Arabic captions:

_[tool: write_file]_

Now the screen mockups for each step:

_[tool: write_file]_

_[tool: snip]_

Now let me build the main scenes file with all 10 scenes:

_[tool: write_file]_

_[tool: snip]_

Now let me build the main HTML file that ties everything together.

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

The Netflix × Asiacell journey video is ready — a 39-second silent explainer in Arabic with bold captions, walking through all 7 steps from opening netflix.com/iq through to the SMS confirmation, with an Asiacell-orange + Netflix-cinematic visual mix and a co-branded end card.

**Structure:**
- **0–3s** Asiacell brand intro (orange burst)
- **3–7s** Hero: "اشترك في نتفلكس برصيد آسياسيل"
- **7–35s** Steps 1–7 inside a phone frame, each with bold Arabic caption + step badge + progress dots
- **35–39s** Co-branded "asiacell × NETFLIX" end card with tagline "استمتع بالمشاهدة"

Press space to play/pause, ←/→ to scrub. Let me know what to refine — pacing, copy, screen mockups, or the brand treatment.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

The verifier is right — `Sprite` uses global timeline time, not parent-relative. I need to fix nested sprites in `SceneHero`, `StepScene`, and `SceneEnd`, plus enlarge the phone.

Let me check Sprite's behavior to confirm and then fix:

_[tool: grep]_

_[tool: snip]_

Confirmed — Sprite uses global `time` from useTimeline. I'll rewrite the scenes file to compute local progress manually instead of using nested `<Sprite>`, and bump the phone size.

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Fixed the nested-Sprite bug — all step badges, captions, hero lockup, and end card now compute timing from parent progress instead of nesting Sprites. Also enlarged the phone to 460×950 and gave the captions an 880px column on the right.

## User

everything is good but you need to follow Asiacell brand guidelines and use Asiacell logo

## Assistant

_[tool: snip]_

_[tool: view_image]_

_[tool: image_metadata]_

<response>

_[tool: snip]_

_[tool: copy_files]_

Now I'll update the brand throughout — Asiacell red (#E60000-ish from the logo) is the primary color, replacing my orange. Let me update the brand tokens, replace the swoosh SVG with the real logo image, and refresh the look.

_[tool: str_replace_edit]_

<response>

_[tool: snip]_

_[tool: str_replace_edit]_

<response>

_[tool: snip]_

Now I'll replace all the inline swoosh SVG occurrences across files with the real logo image, and update the gradient end-card too.

_[tool: grep]_

<response>

_[tool: snip]_

<response>

I'll replace each scene's swoosh SVG with the real Asiacell logo. The intro and end card use white logo on red/dark backgrounds; step scene watermarks and screens use the red logo on dark.

_[tool: str_replace_edit]_

<response>

_[tool: snip]_

<response>

_[tool: snip]_

<response>

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<response>

_[tool: snip]_

Now let me also tweak the step badge background and other accent colors that might still feel orange — but actually, since I aliased asiacellOrange* to red values in BRAND, the existing references already render in red. Let me also update the end-card background gradient and any remaining orange-only references.

_[tool: grep]_

<response>

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

<response>

_[tool: snip]_

_[tool: done]_

<response>

_[tool: snip]_

_[tool: fork_verifier_agent]_

<response>

_[tool: snip]_

Swapped in the official Asiacell logo throughout — intro, hero lockup, step-scene watermark, in-phone Asiacell screens (phone entry / OTP / SMS bubble), payment-method icon, end card, and bottom chip — and shifted all accent colors from the placeholder orange to Asiacell brand red (#E30613). The journey now reads as on-brand Asiacell × Netflix.

## User

Send this design to Canva: Netflix x Asiacell Journey.html

## Assistant

<response>

_[tool: snip]_

_[tool: tool_search_tool_bm25]_

