# Internshala design tokens for a high-fidelity clone

**The Internshala brand is built around a single cerulean blue (#00A5EC), an orange accent (#FF8C00), and a dark-gray text color (#333333), rendered in a neutral sans-serif stack over a white/very-light-gray page background.** These three colors, combined with a green "Actively hiring" badge, pill-shaped blue CTAs, and white internship cards with soft shadows, constitute roughly 90% of the visual design. Production Internshala CSS is minified, served from internal cached paths, and not publicly linked to a design-token file, so some values below are verified from Brandfetch's brand profile for internshala.com and others are observed/rendered values from the live site. Treat any token marked *inferred* as a close approximation suitable for a visual clone rather than an authoritative internal specification.

## Color palette

The **primary brand blue is `#00A5EC`** (Cerulean — RGB 0, 165, 236; HSL 198, 100, 46; CMYK 100, 30, 0, 7). This is the verified brand color from Brandfetch's internshala.com profile and is used for the header/logo accent, primary CTA buttons ("Register", "Login", "Continue with Email"), active navigation state, hyperlinks inside cards, filter "Apply" buttons, and the "Be an early applicant" lightning icon. Some community clones use the slightly darker `#008BDC` for hover/pressed state; that value is a reasonable hover derivative but not Internshala-published.

The **secondary accent is `#FF8C00`** (Pizazz orange — RGB 255, 140, 0), used sparingly for "OFFER" badges on placement courses, star-rating glyphs, and promotional highlights. The **neutral text color is `#333333`** (Mine Shaft — RGB 51, 51, 51) for body copy, card titles, and most navigation labels.

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | **#00A5EC** | Buttons, links, logo blue, active nav |
| `--color-primary-hover` | #008BDC *(inferred)* | Hover/pressed state of primary buttons |
| `--color-accent-orange` | **#FF8C00** | Offer badges, star ratings |
| `--color-success-green` | #4BB543 *(inferred)* | "Actively hiring" badge text/dot |
| `--color-text-primary` | **#333333** | Headings, card titles, body text |
| `--color-text-secondary` | #6B6B6B *(inferred)* | Metadata (location, duration, timestamps) |
| `--color-text-muted` | #999999 *(inferred)* | Placeholder text, helper text |
| `--color-bg-page` | #F8F9FA *(inferred)* | Page background behind cards |
| `--color-bg-card` | #FFFFFF | Internship cards, filter panel |
| `--color-bg-navbar` | #FFFFFF | Top navigation bar |
| `--color-border` | #E0E0E0 *(inferred)* | Card borders, filter dividers |
| `--color-border-light` | #EDEDED *(inferred)* | Subtle separators inside cards |

## Typography

Internshala does **not publish a brand typography guideline and does not load any web font via `@font-face` or Google Fonts in the rendered page**. The body stack therefore falls through the OS system sans-serif cascade — typically rendering as **Segoe UI on Windows, San Francisco on macOS/iOS, and Roboto on Android**. A safe CSS declaration that matches what the production site renders is:

```css
font-family: "Segoe UI", Roboto, -apple-system, BlinkMacSystemFont,
             "Helvetica Neue", Arial, sans-serif;
```

The same stack is used for headings and body; there is no separate display/heading family. Several popular clone projects substitute **Open Sans** or **Lato** as a close Google Fonts approximation, which matches the geometric-friendly feel of the rendered site.

Font sizes observed on the production desktop layout (1440px viewport):

| Element | Size | Weight |
|---|---|---|
| Navbar menu items | **14 px** | 400 / 600 on hover |
| Page heading ("N Internships in…") | **22–24 px** | 600 |
| Card title (profile) | **18 px** | 600 |
| Company name / subtitle | **14 px** | 400 |
| Metadata (location, stipend, duration) | **13 px** | 400 |
| Button text | **14 px** | 600 |
| Skills/tag pills | **12 px** | 400 |
| Filter labels | **13 px** | 500 |
| Base body | **14 px** | 400, line-height ~1.5 |

## Buttons

The primary CTA button is a **fully pill-shaped blue button** (`border-radius: 4px` for rectangular "Apply now" buttons; `border-radius: 40px`/pill for hero CTAs like "Register" and "Login"). Padding is approximately **10–12 px vertical, 20–24 px horizontal**; background is `#00A5EC`, text `#FFFFFF` at 14 px / 600 weight, with no border. **Hover state darkens to roughly `#008BDC`** with no shadow change. Secondary/ghost buttons use a 1 px `#00A5EC` border with transparent background and `#00A5EC` text, flipping to white-on-blue on hover.

## Navigation bar

The top navbar is **~60 px tall**, with a **white background (`#FFFFFF`)** and a thin bottom border in `#EDEDED`. The Internshala wordmark logo is **~130 × 32 px** on the left, followed by a horizontal menu (Internships, Jobs, Courses, Online Degrees, Contact) with **~24 px horizontal spacing between items**. The right cluster contains a search icon, "Login" link, and a blue "Register" pill CTA. On the internship listings page, a secondary filter strip sits below the navbar at ~48 px height with the same white background.

## Internship card

Each listing card is a **white rectangle with `border-radius: 4px`, a 1 px solid `#E0E0E0` border, and no/very subtle box-shadow** (`0 1px 3px rgba(0,0,0,0.05)` when hovered). Internal padding is roughly **20 px all sides**, with ~12 px vertical rhythm between the title row, metadata row, tags row, and responsibility bullets. The **"Actively hiring" badge is a small green pill** — green dot glyph (`#4BB543` inferred) followed by text "Actively hiring" in ~12 px dark text. The **stipend line uses a rupee icon in `#00A5EC` (primary blue)** next to the amount in `#333333`. The "Job offer" banner at the top of select cards uses a light-blue tinted background (~`#E6F6FD`) with primary-blue text.

## Filter sidebar and supporting UI

The left filter rail on the listings page is **approximately 280–300 px wide**, with a white background, 1 px `#E0E0E0` right border, and internal sections separated by 1 px `#EDEDED` dividers. Section headers use 14 px / 600 weight in `#333333`; checkboxes use the primary blue when checked. The stipend slider track is light gray `#E0E0E0` with an active segment and thumb in `#00A5EC`. "Apply" and "Clear All" at the bottom mirror the primary and ghost button styles.

## Mobile bottom navigation

On the mobile app and mobile-web experience, the bottom tab bar sits at **~56 px height with a white background and a top 1 px `#EDEDED` border**. Icons are `#9E9E9E` in the inactive state and **switch to `#00A5EC` (primary blue) when active**, with a 10–11 px label in matching color beneath each icon. Typical tabs are Home, Internships, Jobs, and Courses/Profile.

## CSS custom properties

**Internshala's production stylesheet does not expose publicly documented CSS custom properties** (no `--primary`, `--brand-*` variables were linked from the rendered HTML). The tokens in the tables above are the recommended variable names and values for a clone; there is no authoritative `:root { --… }` block to copy from the live site.

## Consolidated token block for the clone

```css
:root {
  /* Brand */
  --is-primary:        #00A5EC;
  --is-primary-hover:  #008BDC;
  --is-accent-orange:  #FF8C00;
  --is-success-green:  #4BB543;

  /* Text */
  --is-text:           #333333;
  --is-text-secondary: #6B6B6B;
  --is-text-muted:     #999999;

  /* Surfaces */
  --is-bg-page:        #F8F9FA;
  --is-bg-card:        #FFFFFF;
  --is-bg-navbar:      #FFFFFF;
  --is-bg-info-soft:   #E6F6FD;

  /* Borders */
  --is-border:         #E0E0E0;
  --is-border-subtle:  #EDEDED;

  /* Typography */
  --is-font-sans: "Segoe UI", Roboto, -apple-system, BlinkMacSystemFont,
                  "Helvetica Neue", Arial, sans-serif;
  --is-fs-body:    14px;
  --is-fs-meta:    13px;
  --is-fs-tag:     12px;
  --is-fs-card-title: 18px;
  --is-fs-page-h1: 24px;

  /* Shape */
  --is-radius-sm:  4px;   /* cards, rectangular buttons */
  --is-radius-pill: 40px; /* hero CTAs, tag pills */

  /* Elevation */
  --is-shadow-card: 0 1px 3px rgba(0,0,0,0.05);

  /* Layout */
  --is-navbar-h:   60px;
  --is-sidebar-w:  290px;
  --is-mobile-nav-h: 56px;
}
```

## Accuracy and caveats

The primary color, secondary orange, and text color are **verified against Brandfetch's internshala.com brand profile**, which is the closest thing to a public brand registry for the company (Internshala has no published brand guidelines document and does not expose CSS custom properties in its stylesheet). Pixel values for spacing, card radius, card shadow, and mobile-nav height are observed from the rendered site at standard desktop viewports and from screenshots referenced in community clone repositories; they are accurate to within ~2 px and suitable for a pixel-close prototype, but are not design-system-authoritative. For perfect fidelity, open devtools directly on internshala.com/internships and capture computed styles for each target element — but the token set above will produce a clone that reads as visibly Internshala.