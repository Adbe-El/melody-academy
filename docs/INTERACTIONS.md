# Interactions

## Music Academy & Services Platform

---

## Multi-Step Consultation Wizard

### Steps

| Step | Title | Fields | Validation |
|------|-------|--------|-----------|
| 1 | Personal Information | firstName, lastName, email, phone | All required. Email must be valid format. Phone must start with +. |
| 2 | Select Purpose | consultationType (radio buttons) | Required. Options: Music Lessons, Professional Exams, Consultancy, General Enquiry |
| 3 | Programme & Details | programmeId (optional dropdown from programmes list), preferredDate (date picker), notes (textarea) | consultationType must be selected |
| 4 | Confirmation | Summary display of all entered fields, Submit button | — |

### Behavior

- Progress indicator at top: numbered circles (1-4) with connecting line
- Current step is filled green (`bg-academy-emerald text-white`)
- Completed steps show checkmark
- Future steps are gray outline
- "Back" button on steps 2-4
- "Next" button on steps 1-3 (validates before advancing)
- "Submit" button on step 4
- On submit: call `consultationsService.create()`, show success state with confirmation message and reference number
- Success state shows: "Thank you {firstName}! We'll contact you within 24 hours."

---

## Form Validation Rules

### Global Rules
- Required fields: show red asterisk `*` next to label
- On blur: validate field, show error message if invalid
- On submit: validate all fields, focus first invalid field
- Error messages: `text-xs text-red-600` below input
- Invalid input border: `border-red-500 focus:ring-red-500`

### Field-Specific Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| Email | Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "Please enter a valid email address" |
| Phone | Must start with `+` and be 10+ digits | "Please enter a valid phone number" |
| Name | Min 2 characters | "Name must be at least 2 characters" |
| Password | Min 8 characters | "Password must be at least 8 characters" |
| Confirm Password | Must match password | "Passwords do not match" |
| Required select | Must not be empty | "Please select an option" |
| Date | Must be today or future | "Please select a future date" |

---

## Toast Notifications

### Types

| Type | Icon | Background | Usage |
|------|------|-----------|-------|
| Success | CheckCircle | Green bg | Form submitted, item created/updated |
| Error | XCircle | Red bg | API error, validation failure |
| Info | Info | Blue bg | Informational message |
| Warning | AlertTriangle | Amber bg | Destructive action warning |

### Behavior
- Position: bottom-right corner
- Animation: slide in from right, fade out after 4 seconds
- Dismiss: auto-dismiss after 4s, or click close button
- Stack: multiple toasts stack vertically with 8px gap
- Max visible: 3 at a time (oldest dismissed when 4th arrives)

### Implementation

```typescript
// hooks/useToast.ts
export function useToast() {
  return {
    success: (message: string) => { /* add to toast queue */ },
    error: (message: string) => { /* add to toast queue */ },
    info: (message: string) => { /* add to toast queue */ },
    warning: (message: string) => { /* add to toast queue */ },
  };
}
```

---

## Loading States

### Full Page Skeleton
Used when navigating to a new page:
```tsx
<div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
  <Skeleton variant="title" />
  <Skeleton variant="text" count={2} />
  <div className="grid grid-cols-3 gap-6">
    <Skeleton variant="card" count={3} />
  </div>
</div>
```

### Inline Loading
Used within a page section during data fetch:
```tsx
<div className="flex items-center justify-center py-12">
  <div className="w-8 h-8 border-2 border-academy-emerald border-t-transparent rounded-full animate-spin" />
</div>
```

### Button Loading
Used when a form is submitting:
```tsx
<Button loading={isSubmitting} disabled={isSubmitting}>
  {isSubmitting ? 'Saving...' : 'Save Programme'}
</Button>
```

---

## Empty States

| Section | Icon | Title | Description | Action |
|---------|------|-------|-------------|--------|
| No programmes | BookOpen | "No programmes found" | "Try adjusting your filters or check back later." | Clear Filters |
| No instruments | ShoppingBag | "No instruments available" | "Our catalogue is being updated. Check back soon." | — |
| No lesson notes | FileText | "No lesson notes yet" | "Your tutor will post lesson notes here." | — |
| No assignments | ClipboardList | "No assignments" | "You're all caught up!" | — |
| No certificates | Award | "No certificates yet" | "Complete your programme to earn a certificate." | Browse Programmes |
| No consultations | Calendar | "No consultations" | "Book your first consultation to get started." | Book Consultation |
| No learners | Users | "No learners enrolled" | "Learners will appear here once they register." | — |

---

## Error Boundaries

Each layout wraps its content in an error boundary:

```tsx
// components/layout/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-academy-charcoal">Something went wrong</h2>
          <p className="text-sm text-academy-muted">Please try refreshing the page.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## WhatsApp Click-to-Chat

### URL Construction
```typescript
function getWhatsAppUrl(phone: string, message: string): string {
  const cleanNum = phone.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNum}?text=${encoded}`;
}
```

### Pre-Filled Messages

| Context | Message Template |
|---------|-----------------|
| Instrument enquiry | "Hi MelodyAcademy! I am interested in purchasing the *{instrumentName}* ({price}). Please share availability and payment options." |
| General consultation | "Hi MelodyAcademy! I would like to book a consultation about {purpose}." |
| Contact page | "Hi MelodyAcademy! I have a question about {subject}." |

---

## Optimistic Updates

For status changes (consultation status, assignment submission):
1. Immediately update the local UI state
2. Fire the API call in the background
3. On success: keep the optimistic update
4. On error: revert to previous state + show error toast

```typescript
// Example: marking assignment as submitted
const handleSubmit = async (assignmentId: string) => {
  const previous = assignments;
  setAssignments(prev => prev.map(a =>
    a.id === assignmentId ? { ...a, status: 'submitted' } : a
  ));
  try {
    await assignmentsService.update(assignmentId, { status: 'submitted' });
    toast.success('Assignment submitted!');
  } catch {
    setAssignments(previous);
    toast.error('Failed to submit. Please try again.');
  }
};
```

---

## File Upload Flow

1. User clicks upload area or button
2. File picker opens (accept: PDF, images, audio based on context)
3. On file select: show file name + size, preview if image
4. User confirms upload
5. Show progress indicator (if Supabase supports progress events)
6. Upload to Supabase Storage via `storageService.upload()`
7. On success: store file URL in database record
8. On error: show toast error, allow retry

---

## Keyboard Navigation

- **Tab:** Move forward through interactive elements
- **Shift+Tab:** Move backward
- **Enter/Space:** Activate buttons and links
- **Escape:** Close modals and dropdowns
- **Arrow keys:** Navigate within tab groups, dropdown options, accordions
- Focus visible outline: `focus:ring-2 focus:ring-academy-emerald focus:ring-offset-2`
