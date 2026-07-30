# Components

## Matt-Agba Music Consult

---

## Shared UI Component Library

All components live in `src/components/ui/`. They are stateless, composable, and follow the design system tokens exclusively.

---

### Button

**File:** `components/ui/Button.tsx`

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'gold' | 'ghost' | 'danger' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  shimmer?: boolean; // Adds shimmer sweep animation to primary buttons
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}
```

| Variant | Styling |
|---------|---------|
| `primary` | `bg-academy-emerald hover:bg-academy-emerald-hover text-white` |
| `secondary` | `border border-gray-300 hover:border-academy-emerald text-gray-800` |
| `gold` | `bg-academy-gold hover:bg-academy-gold-hover text-academy-emerald` |
| `ghost` | `text-academy-emerald hover:underline` |
| `danger` | `bg-red-700 hover:bg-red-800 text-white` |
| `whatsapp` | `bg-academy-whatsapp hover:bg-academy-whatsapp-hover text-white` |

| Size | Padding | Font |
|------|---------|------|
| `sm` | `px-4 py-2` | `text-xs` |
| `md` | `px-6 py-2.5` | `text-sm` |
| `lg` | `px-8 py-3.5` | `text-base` |

All buttons: `rounded-full font-medium transition-all shadow-sm hover:shadow flex items-center gap-2`

**Shimmer variant:** When `shimmer={true}` and `variant="primary"`, adds the `btn-shimmer` class for a white gradient sweep animation (3.6s loop). Use on main CTA buttons only.

Loading state: Show spinner icon, disable pointer events, reduce opacity.

---

### Card

**File:** `components/ui/Card.tsx`

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'dark';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
```

| Variant | Styling |
|---------|---------|
| `default` | `bg-white rounded-3xl border border-gray-200/80 p-6 shadow-soft` |
| `elevated` | `bg-white rounded-3xl border border-gray-200/80 p-6 shadow-card` |
| `outlined` | `bg-white rounded-3xl border border-gray-200/80 p-6` |
| `dark` | `bg-academy-emerald rounded-3xl p-6 sm:p-12 text-white shadow-xl` |

When `hover=true`: Add `hover-lift` class for smooth cubic-bezier easing + green glow shadow.

When `onClick` is provided: Add `cursor-pointer`.

---

### Modal

**File:** `components/ui/Modal.tsx`

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

| Size | Max Width |
|------|-----------|
| `sm` | `max-w-md` |
| `md` | `max-w-xl` |
| `lg` | `max-w-3xl` |

Behavior:
- Backdrop: `bg-black/50 fixed inset-0 z-50`
- Close on backdrop click
- Close on Escape key
- Entrance animation: `animate-modal-in` (CSS keyframes)
- Focus trap inside modal
- Body scroll lock when open

```css
/* index.css */
@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-modal-in {
  animation: modalFadeIn 0.2s ease-out;
}
```

---

### FormInput

**File:** `components/ui/FormInput.tsx`

```typescript
interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}
```

Structure:
```tsx
<div className="space-y-1">
  <label className="block text-xs font-semibold text-gray-700 uppercase">
    {label} {required && <span className="text-red-500">*</span>}
  </label>
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-academy-emerald transition-all disabled:bg-gray-100"
    placeholder={placeholder}
  />
  {error && <p className="text-xs text-red-600">{error}</p>}
</div>
```

---

### Select

**File:** `components/ui/Select.tsx`

```typescript
interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}
```

Same structure as FormInput but renders a `<select>` element.

---

### Textarea

**File:** `components/ui/Textarea.tsx`

```typescript
interface TextareaProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
  error?: string;
  className?: string;
}
```

Same structure as FormInput but renders a `<textarea>` element.

---

### Badge

**File:** `components/ui/Badge.tsx`

```typescript
interface BadgeProps {
  variant: 'new' | 'pending' | 'active' | 'completed' | 'rejected' | 'category' | 'pill' | 'gold-pill';
  children: React.ReactNode;
  className?: string;
}
```

| Variant | Styling |
|---------|---------|
| `new` | `bg-amber-100 text-amber-800` |
| `pending` | `bg-amber-100 text-amber-800` |
| `active` | `bg-blue-100 text-blue-800` |
| `completed` | `bg-emerald-100 text-emerald-800` |
| `rejected` | `bg-red-100 text-red-800` |
| `category` | `bg-academy-emerald text-white text-[11px] font-bold px-3 py-1 rounded-full` |
| `pill` | `bg-academy-sage text-academy-emerald px-4 py-1.5 rounded-full text-xs font-semibold` |
| `gold-pill` | `bg-white/10 text-academy-gold border border-white/10 rounded-full` |

All badges: `px-2.5 py-1 rounded-full text-[10px] font-bold uppercase` (except category/pill/gold-pill which have their own sizing).

---

### Table

**File:** `components/ui/Table.tsx`

```typescript
interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}
```

Structure:
```tsx
<div className="overflow-x-auto">
  <table className="w-full text-left text-xs text-gray-700">
    <thead className="bg-academy-cream-light text-academy-charcoal font-bold uppercase text-[10px] tracking-wider">
      <tr>
        {columns.map(col => <th key={col.key} className="p-3">{col.header}</th>)}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {data.length === 0 ? (
        <tr><td colSpan={columns.length} className="p-8 text-center text-gray-400">{emptyMessage}</td></tr>
      ) : (
        data.map((item, i) => (
          <tr key={i} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick?.(item)}>
            {columns.map(col => <td key={col.key} className="p-3">{col.render ? col.render(item) : (item as any)[col.key]}</td>)}
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
```

On mobile: Render as stacked cards instead of table rows.

---

### Skeleton

**File:** `components/ui/Skeleton.tsx`

```typescript
interface SkeletonProps {
  variant?: 'text' | 'title' | 'card' | 'image' | 'avatar' | 'table-row' | 'stat-card';
  count?: number;
  className?: string;
}
```

| Variant | Rendering |
|---------|-----------|
| `text` | Single line, `h-4 w-3/4 rounded bg-gray-200 animate-pulse` |
| `title` | `h-8 w-1/2 rounded bg-gray-200 animate-pulse` |
| `card` | Rounded rect with image area + text lines |
| `image` | `h-44 rounded-2xl bg-gray-200 animate-pulse` |
| `avatar` | `w-10 h-10 rounded-full bg-gray-200 animate-pulse` |
| `table-row` | Multiple text skeletons in a row |
| `stat-card` | Square icon area + text lines |

---

### Toast

**File:** `components/ui/Toast.tsx`

Managed via a `ToastProvider` context. Components call:
```typescript
toast.success('Programme created');
toast.error('Failed to save');
toast.info('Check your email');
```

Toast component renders at bottom-right, auto-dismisses after 4 seconds, supports close button.

Animation: slide in from right + fade out.

---

### EmptyState

**File:** `components/ui/EmptyState.tsx`

```typescript
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}
```

Structure:
```tsx
<div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
  <div className="w-16 h-16 rounded-2xl bg-academy-sage text-academy-emerald flex items-center justify-center">
    {icon}
  </div>
  <h3 className="font-serif text-xl font-bold text-academy-charcoal">{title}</h3>
  <p className="text-sm text-academy-muted max-w-sm">{description}</p>
  {action && <Button variant="primary" onClick={action.onClick}>{action.label}</Button>}
</div>
```

---

### MultiStepForm

**File:** `components/ui/MultiStepForm.tsx`

```typescript
interface Step {
  title: string;
  content: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: any) => void;
  className?: string;
}
```

Renders:
1. Step indicator (numbered circles with connecting line)
2. Current step content
3. Back / Next / Submit buttons
4. Validation per step before advancing

---

## Component Harmonization Rules

These rules ensure all components and pages follow the same patterns. Reference: `DESIGN_SYSTEM.md` for token values.

### Card Pattern (all card types)

```
bg-white rounded-3xl border border-gray-200/80 hover:border-academy-emerald/30 hover-lift
```

- Background: Always `bg-white` (never `bg-academy-cream-light`)
- Border: Always `border-gray-200/80` (never `border-black/5`)
- Hover: Always `hover-lift` (never just `hover:shadow-xl transition-all`)

### FAQ Accordion Pattern

```
Container: bg-white rounded-2xl border border-gray-200/80 overflow-hidden
Open:      border-academy-emerald/30 shadow-sm (conditional via transition-colors)
Button:    p-5
Content:   px-5 pb-5
```

### Page Wrapper Pattern

```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12
```

### Primary CTA Button Pattern

```
px-8 py-3.5 rounded-full bg-academy-emerald hover:bg-academy-emerald-hover
text-white font-medium text-base shadow-md hover:shadow-lg transition-all
flex items-center gap-2 btn-shimmer
```

### Form Input Pattern

```
w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm
focus:outline-none focus:ring-2 focus:ring-academy-emerald transition-all
```
