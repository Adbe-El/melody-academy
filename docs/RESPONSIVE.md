# Responsive Design

## Music Academy & Services Platform

---

## Breakpoints

| Name | Min Width | Tailwind Prefix | Target |
|------|-----------|-----------------|--------|
| Mobile | 0px | (default) | Phones |
| Small | 640px | `sm:` | Large phones, small tablets |
| Medium | 768px | `md:` | Tablets |
| Large | 1024px | `lg:` | Small desktops, tablets landscape |
| Extra Large | 1280px | `xl:` | Desktops |

---

## Global Responsive Patterns

### Navigation

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Hamburger menu → slide-down drawer with nav links + role switcher + CTA |
| `md` | Compact nav links + role switcher + CTA button |
| `lg` | Full nav links visible + role switcher + CTA button |
| `xl` | Wider spacing between nav links |

### Page Container

```css
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Card Grids

| Breakpoint | Columns |
|-----------|---------|
| Mobile | 1 column |
| `sm` | 2 columns |
| `lg` | 3 columns |
| `xl` | 4 columns |

```css
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
```

### Two-Column Layouts

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Stacked (single column) |
| `md` | Two columns |
| `lg` | Two columns with sidebar |

---

## Per-Page Responsive Notes

### Landing Page

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | Stacked: text above image | Text left, image right | Same as tablet |
| Service Cards | 1 column | 2 columns | 3 columns |
| Categories | 2 columns | 3 columns | 5 columns |
| How It Works | 1 column | 2 columns | 4 columns |
| Testimonials | 1 column | 1 column | 3 columns |
| Stats | 2 columns | 4 columns | 4 columns |
| CTA | Stacked | Stacked | Stacked |

### Programme Listing

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Filters horizontal scroll, 1 card per row |
| `sm` | 2 cards per row |
| `lg` | 3 cards per row |

### Instrument Shop

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Search full width, category pills horizontal scroll, 1 card per row |
| `sm` | 2 cards per row |
| `lg` | 4 cards per row |

### Consultation Wizard

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Full width, stacked fields, step indicator compact |
| `md` | Max width container, 2-column fields where appropriate |
| `lg` | Same as md |

### Learner Dashboard

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Stacked: main content on top, announcements below |
| `lg` | 8-col main + 4-col sidebar |

### Admin Dashboard

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Sidebar collapses to hamburger, content full width |
| `lg` | Sidebar visible (240px) + content fills remaining |
| Tables on mobile | Convert to stacked cards |

### Admin Sidebar

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Hidden by default, hamburger toggle → overlay drawer |
| `lg` | Fixed sidebar, 240px wide |
| `xl` | Collapsible sidebar (icons only when collapsed) |

### Learner Sidebar

| Breakpoint | Behavior |
|-----------|----------|
| Mobile | Top horizontal scroll tabs (current implementation) |
| `lg` | Left sidebar navigation |

---

## Mobile-Specific Patterns

### Sticky CTA Bar

On public pages with primary CTAs, show a sticky bottom bar on mobile:

```css
.fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-40
```

Contains: "Book Consultation" primary button + WhatsApp button (side by side).

### Touch Targets

- Minimum touch target size: 44px × 44px
- Button minimum height: 44px (`py-2.5` or higher)
- Input minimum height: 44px (`py-2.5`)
- Nav links: full-width touch area with padding

### Font Size Adjustments

| Element | Mobile | Desktop |
|---------|--------|---------|
| Page title | `text-4xl` | `text-5xl xl:text-7xl` |
| Section title | `text-2xl` | `text-3xl sm:text-4xl` |
| Card title | `text-lg` | `text-xl sm:text-2xl` |
| Body text | `text-sm` | `text-base` |
| Badge text | `text-[10px]` | `text-[11px]` |

### Spacing Adjustments

| Element | Mobile | Desktop |
|---------|--------|---------|
| Section vertical | `space-y-12` or `py-10` | `space-y-20` or `py-16` |
| Card padding | `p-4` | `p-6` or `p-8` |
| Grid gap | `gap-4` | `gap-6` |
| Hero image height | `aspect-[3/4]` | `aspect-[4/5]` |

---

## Tablet-Specific Patterns

- Two-column layouts activate at `md` (768px+)
- Forms switch from stacked to 2-column grids at `md`
- Admin tables remain as tables (not cards) at `md`
- Footer columns: 2×2 grid at `md`, 4 columns at `lg`

---

## Print Styles

For certificate printing:

```css
@media print {
  .no-print { display: none !important; }
  .print-only { display: block !important; }
  body { background: white; }
  .certificate-card {
    border: 2px solid #0F382C !important;
    box-shadow: none !important;
    page-break-inside: avoid;
  }
}
```
