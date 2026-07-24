# Architecture

## Music Academy & Services Platform

---

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | React | 19.2.x | Latest stable, concurrent features |
| Language | TypeScript | 6.0.x | Type safety, better DX |
| Build Tool | Vite | 8.1.x | Fast HMR, ESM-first |
| Styling | Tailwind CSS | 4.3.x | Utility-first, design tokens |
| Routing | React Router | v6.x | Declarative routing, layout routes |
| Backend | Supabase | 2.x | Auth + PostgreSQL + Storage + Realtime |
| Animation | Framer Motion | Latest | Declarative page transitions |
| Icons | Lucide React | 1.26.x | Tree-shakeable, consistent |
| Utilities | clsx + tailwind-merge | Latest | Conditional class merging |

---

## Folder Structure

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Root: providers + router
├── index.css                         # Global styles + Tailwind
│
├── lib/
│   └── supabase.ts                   # Supabase client init
│
├── types/
│   └── index.ts                      # All TypeScript interfaces
│
├── hooks/
│   ├── useAuth.ts                    # Auth state hook
│   ├── useRole.ts                    # User role resolution
│   └── useDebounce.ts                # Search debounce
│
├── services/
│   ├── auth.ts                       # Sign up, sign in, sign out, reset
│   ├── programmes.ts                 # Programme CRUD
│   ├── instruments.ts                # Instrument CRUD
│   ├── consultations.ts              # Consultation CRUD
│   ├── instructorApps.ts             # Instructor application CRUD
│   ├── learners.ts                   # Learner management
│   ├── lessonNotes.ts                # Lesson note CRUD
│   ├── assignments.ts                # Assignment CRUD
│   ├── resources.ts                  # Learning resource CRUD
│   ├── certificates.ts               # Certificate CRUD
│   ├── examRegistrations.ts          # Exam registration CRUD
│   ├── consultancyRequests.ts        # Consultancy request CRUD
│   ├── announcements.ts              # Announcement CRUD
│   └── storage.ts                    # File upload/download helpers
│
├── context/
│   ├── AuthContext.tsx                # Supabase session + user role
│   └── AppContext.tsx                 # App-level state (config, etc.)
│
├── components/
│   ├── ui/                           # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── FormInput.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Table.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Toast.tsx
│   │   ├── EmptyState.tsx
│   │   └── MultiStepForm.tsx
│   │
│   ├── layout/                       # Layout components
│   │   ├── PublicLayout.tsx          # Navbar + Outlet + Footer
│   │   ├── LearnLayout.tsx          # LMS sidebar + Outlet
│   │   ├── AdminLayout.tsx          # Admin sidebar + Outlet
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LearnSidebar.tsx
│   │   └── AdminSidebar.tsx
│   │
│   └── common/                       # Feature-specific components
│       ├── ConsultationWizard.tsx
│       ├── ProgrammeCard.tsx
│       ├── InstrumentCard.tsx
│       ├── InstructorCard.tsx
│       └── ...
│
├── pages/
│   ├── public/
│   │   ├── Home.tsx
│   │   ├── Programmes.tsx
│   │   ├── ProgrammeDetails.tsx
│   │   ├── ExamPrep.tsx
│   │   ├── Instruments.tsx
│   │   ├── InstrumentDetails.tsx
│   │   ├── Consultancy.tsx
│   │   ├── Instructors.tsx
│   │   ├── ApplyInstructor.tsx
│   │   └── Contact.tsx
│   │
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── ForgotPassword.tsx
│   │
│   ├── learner/
│   │   ├── LearnerDashboard.tsx
│   │   ├── LessonNotes.tsx
│   │   ├── Assignments.tsx
│   │   ├── Resources.tsx
│   │   ├── Certificates.tsx
│   │   └── Profile.tsx
│   │
│   └── admin/
│       ├── AdminDashboard.tsx
│       ├── ProgrammeManagement.tsx
│       ├── LearnerManagement.tsx
│       ├── ConsultationManagement.tsx
│       ├── InstructorManagement.tsx
│       ├── ExamManagement.tsx
│       ├── InstrumentManagement.tsx
│       ├── ConsultancyManagement.tsx
│       ├── WebsiteCMS.tsx
│       ├── Reports.tsx
│       ├── Settings.tsx
│       └── Announcements.tsx
│
├── routes/
│   ├── index.tsx                     # Route config export
│   └── guards.tsx                    # AuthGuard, RoleGuard
│
└── assets/
    └── hero.png                      # Hero image
```

---

## Routing Strategy

### React Router v6 with Layout Routes

```tsx
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';
import { LearnLayout } from '../components/layout/LearnLayout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { AuthGuard } from './guards';
import { RoleGuard } from './guards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'programmes', element: <Programmes /> },
      { path: 'programmes/:id', element: <ProgrammeDetails /> },
      { path: 'exams', element: <ExamPrep /> },
      { path: 'instruments', element: <Instruments /> },
      { path: 'instruments/:id', element: <InstrumentDetails /> },
      { path: 'consultancy', element: <Consultancy /> },
      { path: 'instructors', element: <Instructors /> },
      { path: 'apply', element: <ApplyInstructor /> },
      { path: 'contact', element: <Contact /> },
      { path: 'consultation', element: <ConsultationWizard /> },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/learn',
    element: (
      <AuthGuard>
        <RoleGuard role="learner">
          <LearnLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <LearnerDashboard /> },
      { path: 'notes', element: <LessonNotes /> },
      { path: 'assignments', element: <Assignments /> },
      { path: 'resources', element: <Resources /> },
      { path: 'certificates', element: <Certificates /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <AuthGuard>
        <RoleGuard role="admin">
          <AdminLayout />
        </RoleGuard>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'programmes', element: <ProgrammeManagement /> },
      { path: 'learners', element: <LearnerManagement /> },
      { path: 'consultations', element: <ConsultationManagement /> },
      { path: 'instructors', element: <InstructorManagement /> },
      { path: 'exams', element: <ExamManagement /> },
      { path: 'instruments', element: <InstrumentManagement /> },
      { path: 'consultancy', element: <ConsultancyManagement /> },
      { path: 'lms', element: <LMSManagement /> },
      { path: 'content', element: <WebsiteCMS /> },
      { path: 'reports', element: <Reports /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
```

---

## Auth Architecture

```
User visits /learn/* or /admin/*
        │
        ▼
AuthGuard checks Supabase session
        │
        ├── No session → redirect to /auth/login
        │
        └── Session exists → RoleGuard checks role
                │
                ├── Wrong role → redirect to appropriate dashboard
                │
                └── Correct role → render Outlet (page content)
```

### Auth Flow

1. Supabase client initializes and listens for session changes
2. `AuthContext` provides `user`, `session`, `loading`, `role`
3. `AuthGuard` wraps protected routes — shows loading skeleton while checking, redirects to login if no session
4. `RoleGuard` wraps role-specific routes — redirects if user role doesn't match
5. On login, `AuthPage` calls `supabase.auth.signInWithPassword()`, context updates, router navigates to appropriate dashboard
6. On logout, session is cleared, user redirected to home

### Role Resolution

```typescript
// After Supabase auth, query profiles table:
const { data } = await supabase
  .from('users')
  .select('role')
  .eq('id', user.id)
  .single();

// role: 'admin' | 'learner'
```

---

## State Management

| State | Location | Purpose |
|-------|----------|---------|
| Auth session | `AuthContext` (Supabase listener) | Current user, session, role |
| App config | `AppContext` | WhatsApp number, site settings |
| Page data | Component-level `useState` + service calls | Programme lists, consultations, etc. |
| Form state | Component-level `useState` | Form field values |
| UI state | Component-level `useState` | Modal open, active tab, filters |

**No global state for business data** — each page fetches its own data from Supabase via service functions. This avoids stale data issues and simplifies cache invalidation.

---

## Error Handling

### Service Layer Pattern

```typescript
// services/programmes.ts
import { AppError, createAppError } from '../lib/errors';

export async function getAllProgrammes(): Promise<Programme[]> {
  const { data, error } = await supabase
    .from('programmes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw createAppError('FETCH_PROGRAMMES', error.message);
  return data;
}
```

### Error Boundary Pattern

```tsx
// Each layout has an ErrorBoundary
<ErrorBoundary fallback={<PageError />}>
  <Outlet />
</ErrorBoundary>
```

### Toast Notification Pattern

```typescript
// On success:
toast.success('Programme created successfully');

// On error:
toast.error('Failed to save. Please try again.');
```

---

## Environment Variables

```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## File Upload Pattern

```typescript
// services/storage.ts
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) throw createAppError('UPLOAD_FAILED', error.message);

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}
```
