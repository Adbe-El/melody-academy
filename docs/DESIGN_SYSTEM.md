# Design System

## Music Academy & Services Platform

> Adopted from reference site: https://melody-academy.lovable.app
> Fonts kept as Playfair Display + Plus Jakarta Sans. Colors, shadows, and animations adapted from the reference's OKLCH-based green-tinted design system.

---

## Color Tokens

### Primary Palette

All colors are defined in `src/index.css` under `@theme {}` as CSS custom properties. Use ONLY these tokens in components — never raw hex/oklch values.

| Token | OKLCH | Hex Equivalent | Purpose | Usage |
|-------|-------|----------------|---------|-------|
| `academy-cream` | `oklch(98.5% .008 95)` | `#F9F8F4` | Page background | `bg-academy-cream` |
| `academy-cream-light` | `oklch(100% 0 0)` | `#FFFFFF` | Card/surface background | `bg-academy-cream-light` |
| `academy-emerald` | `oklch(38% .09 155)` | `#0F382C` | Primary brand color, buttons, active states | `bg-academy-emerald`, `text-academy-emerald` |
| `academy-emerald-hover` | `oklch(42% .1 155)` | `#14493A` | Primary button hover | `hover:bg-academy-emerald-hover` |
| `academy-emerald-dark` | `oklch(28% .06 155)` | `#09251D` | Dark backgrounds (footer, admin sidebar) | `bg-academy-emerald-dark` |
| `academy-leaf` | `oklch(42% .1 155)` | `#1A5C3A` | Core brand leaf green (accent highlights) | `text-academy-leaf`, `bg-academy-leaf` |
| `academy-leaf-soft` | `oklch(88% .05 145)` | `#D4E8DA` | Soft leaf green (light accents) | `bg-academy-leaf-soft` |
| `academy-sage` | `oklch(92% .04 145)` | `#E6EFEA` | Light accent backgrounds, badges | `bg-academy-sage` |
| `academy-sage-dark` | `oklch(85% .04 145)` | `#C8DAD0` | Disabled states, dividers | `border-academy-sage-dark` |
| `academy-gold` | `oklch(78% .16 85)` | `#D4AF37` | Accent — CTAs, highlights, certificates | `text-academy-gold`, `bg-academy-gold` |
| `academy-gold-hover` | `oklch(72% .16 85)` | `#B8972E` | Gold button hover | `hover:bg-academy-gold-hover` |
| `academy-charcoal` | `oklch(18% .02 150)` | `#1A1A1A` | Body text (green-tinted black) | `text-academy-charcoal` |
| `academy-ink` | `oklch(16% .02 150)` | `#151515` | Deep ink (slightly darker than charcoal) | `text-academy-ink` |
| `academy-muted` | `oklch(48% .02 150)` | `#666666` | Secondary/muted text (green-tinted gray) | `text-academy-muted` |

### Semantic Colors

| Token | OKLCH | Purpose | Usage |
|-------|-------|---------|-------|
| `academy-border` | `oklch(90% .012 120)` | Subtle warm borders | `border-academy-border` |
| `academy-input` | `oklch(93% .012 120)` | Input field borders | `border-academy-input` |
| `academy-ring` | `oklch(45% .09 155)` | Focus rings (green) | `focus:ring-academy-ring` |
| `academy-secondary` | `oklch(96% .015 95)` | Secondary surfaces | `bg-academy-secondary` |
| `academy-muted-surface` | `oklch(95% .012 95)` | Muted backgrounds | `bg-academy-muted-surface` |

### Status Colors

| State | Background | Text | Usage |
|-------|-----------|------|-------|
| New/Pending | `bg-amber-100` | `text-amber-800` | Consultation new, assignment pending |
| Active/In Progress | `bg-blue-100` | `text-blue-800` | Contacted, submitted, under review |
| Completed/Success | `bg-emerald-100` | `text-emerald-800` | Enrolled, reviewed, active |
| Rejected/Cancelled | `bg-rose-100` | `text-rose-800` | Rejected, cancelled |
| Important | `bg-rose-100` | `text-rose-800` | Important announcements |

### WhatsApp Colors

| Token | Hex | Purpose |
|-------|-----|---------|
| `academy-whatsapp` | `#25D366` | WhatsApp button background |
| `academy-whatsapp-hover` | `#20bd5a` | WhatsApp button hover |

---

## Typography

### Font Families

| Token | Font | Usage |
|-------|------|-------|
| `font-serif` | Playfair Display | Headings, brand name, card titles |
| `font-sans` | Plus Jakarta Sans | Body text, buttons, labels, UI elements |

### Type Scale

| Element | Size | Weight | Font | Tailwind |
|---------|------|--------|------|----------|
| Page Title | 48-72px | Bold (700) | Playfair Display | `font-serif text-5xl sm:text-6xl xl:text-7xl font-bold` |
| Section Title | 24-38px | Bold (700) | Playfair Display | `font-serif text-3xl sm:text-4xl font-bold` |
| Card Title | 18-24px | Bold (700) | Playfair Display | `font-serif text-xl sm:text-2xl font-bold` |
| Body | 14-16px | Normal (400) | Plus Jakarta Sans | `text-sm` or `text-base` |
| Small/Label | 12-13px | Medium (500) | Plus Jakarta Sans | `text-xs` |
| Micro/Badge | 10-11px | Bold (700) | Plus Jakarta Sans | `text-[10px]` or `text-[11px] font-bold uppercase tracking-wider` |

### Text Colors

| Usage | Token | Example |
|-------|-------|---------|
| Primary heading | `text-academy-charcoal` | `font-serif text-3xl text-academy-charcoal` |
| Section heading (green) | `text-academy-emerald` | `font-serif text-3xl text-academy-emerald` |
| Body text | `text-academy-charcoal` | `text-sm text-academy-charcoal` |
| Secondary text | `text-academy-muted` | `text-xs text-academy-muted` |
| Muted/disabled | `text-gray-400` | `text-xs text-gray-400` |
| On dark background | `text-white` | `text-sm text-white` |
| Gold accent on dark | `text-academy-gold` | `font-serif text-academy-gold` |

---

## Shadows

All shadows use **green-tinted darks** (hue 150) instead of pure black, creating a warmer, more organic feel that matches the leaf-green brand.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-soft` | `0 1px 2px oklch(0% 0 0/.04), 0 8px 24px -8px oklch(0% 0 0/.08)` | Default card shadow |
| `shadow-card` | `0 1px 2px oklch(0% 0 0/.04), 0 12px 36px -12px oklch(40% .05 150/.18)` | Elevated card shadow |
| `shadow-glow` | `0 24px 60px -20px oklch(42% .1 155 / 0.35)` | Green glow (CTAs, hero elements) |
| `shadow-lift` | `0 2px 4px oklch(0% 0 0/.04), 0 28px 60px -20px oklch(40% .05 150/.22)` | Hover-lift shadow |
| `shadow-sm` | Tailwind default | Subtle elevation |
| `shadow-md` | Tailwind default | Buttons, CTAs |
| `shadow-lg` | Tailwind default | Hover states |
| `shadow-xl` | Tailwind default | Hero banners, modals |
| `shadow-2xl` | Tailwind default | Modals, floating elements |

---

## Animations & Transitions

### Keyframe Definitions

| Keyframe | Definition | Purpose |
|----------|-----------|---------|
| `float-y` | `0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) }` | Floating badge elements |
| `marquee` | `0% { transform: translate(0) } 100% { transform: translate(-50%) }` | Infinite scrolling logo/text strips |
| `shimmer` | `0% { background-position: -200% 0 } 100% { background-position: 200% 0 }` | Button shimmer sweep effect |
| `pulse-ring` | `0% { box-shadow: 0 0 <leaf-45%> } 70% { box-shadow: 0 0 0 14px transparent } 100% { box-shadow: 0 0 transparent }` | Live indicator pulse |
| `eq` | `0%,100% { transform: scaleY(.35) } 50% { transform: scaleY(1) }` | Equalizer bar animation |
| `modalFadeIn` | `from { opacity:0; transform: scale(.95) translateY(8px) } to { opacity:1; transform: scale(1) translateY(0) }` | Modal entrance |
| `caret-blink` | `0%,70%,100% { opacity:1 } 20%,50% { opacity:0 }` | Cursor blink |

### Animation Utility Classes

| Class | Animation | Duration | Usage |
|-------|-----------|----------|-------|
| `.animate-float` | `float-y` | 6s ease-in-out infinite | Floating badges on hero |
| `.animate-float-slow` | `float-y` | 9s ease-in-out infinite | Slow floating elements |
| `.animate-marquee` | `marquee` | 30s linear infinite | Logo strip scroll |
| `.btn-shimmer` | `shimmer` | 3.6s linear infinite | Primary button shimmer sweep |
| `.animate-pulse-ring` | `pulse-ring` | 2.4s ease-out infinite | Live indicator ring |
| `.eq-bar` | `eq` | 1.4s ease-in-out infinite | Equalizer bars (transform-origin: bottom) |
| `.animate-modal-in` | `modalFadeIn` | 0.3s cubic-bezier(.16,1,.3,1) | Modal entrance |
| `.animate-caret-blink` | `caret-blink` | 1.25s ease-out infinite | Input cursor |

### Transition Classes

| Class | Easing | Properties | Usage |
|-------|--------|-----------|-------|
| `.hover-lift` | `cubic-bezier(.2,.6,.2,1)` | `transform .35s, box-shadow .35s` | Cards → `translateY(-4px)` + `shadow-lift` |
| `.link-underline` | `cubic-bezier(.2,.6,.2,1)` | `transform .35s` | Underline pseudo-element `scaleX(0→1)` with `academy-leaf` bg |
| `.card-hover-lift` | `ease` | `transform .25s, box-shadow .25s` | Cards → `translateY(-4px)` + soft shadow |

### Shimmer Effect (Primary Buttons)

```css
.btn-shimmer {
  position: relative;
  overflow: hidden;
}
.btn-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.22), transparent 70%);
  background-size: 200% 100%;
  animation: shimmer 3.6s linear infinite;
}
```

---

## Spacing & Layout

### Page Layout

```css
.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8  /* Standard page container */
```

### Section Spacing

| Element | Vertical Spacing |
|---------|-----------------|
| Between page sections | `space-y-20` or `py-16` |
| Between section title and content | `mb-8` or `mb-10` |
| Between card grid items | `gap-4` or `gap-6` |
| Inside card padding | `p-6` or `p-8` |
| Card inner spacing | `space-y-3` or `space-y-4` |

### Border Radius

| Pattern | Usage |
|---------|-------|
| `rounded-full` | Buttons, badges, pills |
| `rounded-3xl` | Cards, hero banners, major containers |
| `rounded-2xl` | Inner cards, sub-sections, images |
| `rounded-xl` | Form inputs, small cards |
| `rounded-lg` | Small UI elements, mobile menu items |
| `rounded-[2.5rem]` | Extra-large rounded containers |

---

## Component Patterns

### Button

```tsx
// Primary with shimmer (emerald background, white text, shimmer sweep)
<button className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 btn-shimmer">
  Book Consultation <ArrowRight className="w-4 h-4" />
</button>

// Primary (no shimmer)
<button className="px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2">
  Start Learning <ArrowRight className="w-4 h-4" />
</button>

// Secondary (outlined)
<button className="px-8 py-3.5 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-medium text-base hover:bg-white transition-all">
  Explore Services
</button>

// Gold Accent
<button className="px-8 py-3.5 rounded-full bg-academy-gold hover:bg-academy-gold-hover text-academy-emerald font-bold text-sm shadow-md transition-all">
  Apply Now
</button>

// Ghost (text only)
<button className="text-xs font-semibold text-academy-emerald hover:underline">
  Forgot Password?
</button>
```

### Card

```tsx
// Default card (with hover-lift)
<div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-soft hover:shadow-card transition-all hover-lift">

// Card with image
<div className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 group">
  <div className="relative h-44 overflow-hidden">
    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  </div>
  <div className="p-4">...</div>
</div>

// Dark card (hero sections)
<div className="bg-academy-emerald rounded-3xl p-8 sm:p-12 text-white shadow-xl">
```

### Badge

```tsx
// Status badge
<span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
  New
</span>

// Category badge
<span className="bg-academy-emerald text-white text-[11px] font-bold px-3 py-1 rounded-full">
  Keyboard
</span>

// Pill badge (section header)
<div className="inline-flex items-center gap-2 bg-academy-sage text-academy-emerald px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
  <Music className="w-3.5 h-3.5" /> Your music journey starts here
</div>
```

### Floating Badge (Hero)

```tsx
// Floating badge with pulse ring + float animation
<div className="absolute top-8 -left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 max-w-[220px] animate-float">
  <div className="w-10 h-10 rounded-xl bg-academy-sage text-academy-emerald flex items-center justify-center flex-shrink-0 relative">
    <BookOpen className="w-5 h-5" />
    <span className="absolute -top-1 -right-1 w-3 h-3 bg-academy-emerald rounded-full animate-pulse-ring" />
  </div>
  <div>
    <p className="text-xs font-bold text-gray-900">Live Classes</p>
    <p className="text-[11px] text-gray-500 leading-tight">Interact in real-time</p>
  </div>
</div>
```

### Marquee / Logo Strip

```tsx
// Infinite scrolling logo strip
<div className="overflow-hidden py-6">
  <div className="flex animate-marquee whitespace-nowrap">
    {/* Duplicate content for seamless loop */}
    {[...items, ...items].map((item, i) => (
      <span key={i} className="mx-8 text-gray-400 font-bold text-lg">{item}</span>
    ))}
  </div>
</div>
```

### Form Input

```tsx
<div className="space-y-1">
  <label className="block text-xs font-semibold text-gray-700 uppercase">Full Name</label>
  <input
    type="text"
    required
    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-ring transition-all"
    placeholder="Enter your full name"
  />
</div>
```

### Table

```tsx
<table className="w-full text-left text-xs text-gray-700">
  <thead className="bg-academy-cream-light text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
    <tr>
      <th className="p-3">Column</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-100">
    <tr className="hover:bg-gray-50">
      <td className="p-3">Data</td>
    </tr>
  </tbody>
</table>
```

---

## Tailwind Refactor Rules

1. **Never use raw hex values.** Always use `academy-*` tokens.
2. **Never use `text-gray-500`** for secondary text. Use `text-academy-muted`.
3. **Never use `border-gray-200`** for dividers. Use `border-academy-sage-dark` or `border-gray-200/60`.
4. **Always add `group`** to parent containers using `group-hover:` on children.
5. **Always use `transition-all` or `transition-colors`** on interactive elements.
6. **Always use `rounded-full`** for buttons and badges.
7. **Always use `rounded-3xl`** for cards and major containers.
8. **Always use `font-serif`** for headings and titles.
9. **Use `hover-lift`** instead of `card-hover-lift` for smoother easing + glow shadow.
10. **Use `btn-shimmer`** on primary CTA buttons for the shimmer sweep effect.
11. **Use `animate-float`** on floating hero badges.
12. **Use `animate-marquee`** for infinite scrolling logo/text strips.

---

## Design Harmonization Rules

These rules enforce consistency across ALL pages and components. Every new page or component must follow them.

### Page Wrappers

All content pages (except Home and ProgrammeDetails which have custom layouts) must use:
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12
```

### Cards

| Property | Rule | Example |
|----------|------|---------|
| Background | Always `bg-white` | Never `bg-academy-cream-light` on cards |
| Border | Always `border-gray-200/80` | Never `border-black/5` |
| Border radius | Always `rounded-3xl` | Consistent across all card types |
| Hover effect | Always `hover-lift` | Never just `hover:shadow-xl transition-all` |
| Hover border | `hover:border-academy-emerald/30` | Optional, for interactive cards |

### FAQ Accordions

| Property | Rule |
|----------|------|
| Container | `bg-white rounded-2xl border border-gray-200/80 overflow-hidden` |
| Open state | `border-academy-emerald/30 shadow-sm` (conditional via `transition-colors`) |
| Button padding | `p-5` |
| Content padding | `px-5 pb-5` |
| Chevron | `ChevronDown`/`ChevronUp` from lucide-react, `w-5 h-5` |

### Section Headings

| Pattern | Usage |
|---------|-------|
| Centered pill + h1 | Page titles (Programmes, Instructors, Contact) |
| Emerald banner + h1 | Feature pages (Instruments, ExamPrep, Consultancy) |
| Centered h2 + subtitle | Section headings within pages |

### Buttons

| Type | Pattern |
|------|---------|
| Primary CTA | `px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover text-white font-medium text-base shadow-md hover:shadow-lg transition-all flex items-center gap-2 btn-shimmer` |
| Secondary (outlined) | `px-8 py-3.5 rounded-full border border-gray-300 hover:border-academy-emerald text-gray-800 font-medium text-base hover:bg-white transition-all` |
| Gold CTA | `px-8 py-3.5 rounded-full bg-academy-gold hover:bg-academy-gold-hover text-academy-emerald font-bold text-sm shadow-md transition-all flex items-center gap-2` |
| Ghost/small | `px-5 py-2 rounded-full border border-gray-300 text-xs font-semibold hover:border-gray-900 text-gray-800 transition-all` |
| WhatsApp | `w-full py-3 rounded-full bg-academy-whatsapp hover:bg-academy-whatsapp-hover text-white font-bold text-xs shadow` |
| Form submit | `w-full py-3.5 rounded-full bg-academy-emerald text-white font-medium hover:bg-academy-emerald-hover transition-all shadow-md` |

### Form Inputs

| Property | Rule |
|----------|------|
| Padding | `px-4 py-2.5` |
| Border radius | `rounded-xl` (not `rounded-full`) |
| Border | `border border-gray-300` |
| Focus | `focus:outline-none focus:ring-2 focus:ring-academy-emerald transition-all` |
| Error state | `border-red-400` (conditional) |

### Testimonials

| Pattern | Usage |
|---------|-------|
| On dark bg | `bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10` |
| On light bg | `bg-white p-6 rounded-3xl border border-gray-200/80 hover-lift` |
