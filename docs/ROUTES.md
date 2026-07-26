# Routes

## Music Academy & Services Platform

---

## Route Constants

```typescript
// routes/constants.ts
export const ROUTES = {
  // Public
  HOME: '/',
  PROGRAMMES: '/programmes',
  PROGRAMME_DETAILS: '/programmes/:id',
  EXAMS: '/exams',
  INSTRUMENTS: '/instruments',
  INSTRUMENT_DETAILS: '/instruments/:id',
  CONSULTANCY: '/consultancy',
  INSTRUCTORS: '/instructors',
  APPLY: '/apply',
  CONTACT: '/contact',
  CONSULTATION: '/consultation',

  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',

  // Learner
  LEARN: '/learn',
  LEARN_NOTES: '/learn/notes',
  LEARN_ASSIGNMENTS: '/learn/assignments',
  LEARN_RESOURCES: '/learn/resources',
  LEARN_CERTIFICATES: '/learn/certificates',
  LEARN_PROFILE: '/learn/profile',

  // Admin
  ADMIN: '/admin',
  ADMIN_PROGRAMMES: '/admin/programmes',
  ADMIN_LEARNERS: '/admin/learners',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_INSTRUCTORS: '/admin/instructors',
  ADMIN_EXAMS: '/admin/exams',
  ADMIN_INSTRUMENTS: '/admin/instruments',
  ADMIN_LMS: '/admin/lms',
  ADMIN_CONTENT: '/admin/content',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
} as const;
```

---

## Route Definitions

### Public Routes (no auth required)

| Path | Component | Layout | Title |
|------|-----------|--------|-------|
| `/` | `Home` | `PublicLayout` | Home |
| `/programmes` | `Programmes` | `PublicLayout` | Programmes |
| `/programmes/:id` | `ProgrammeDetails` | `PublicLayout` | Programme Details |
| `/exams` | `ExamPrep` | `PublicLayout` | Professional Music Exams |
| `/instruments` | `Instruments` | `PublicLayout` | Instrument Shop |
| `/instruments/:id` | `InstrumentDetails` | `PublicLayout` | Instrument Details |
| `/consultancy` | `Consultancy` | `PublicLayout` | Music Consultancy |
| `/instructors` | `Instructors` | `PublicLayout` | Meet Our Instructors |
| `/apply` | `ApplyInstructor` | `PublicLayout` | Become an Instructor |
| `/contact` | `Contact` | `PublicLayout` | Contact Us |
| `/consultation` | `ConsultationWizard` | `PublicLayout` | Book Consultation |

### Auth Routes (redirect if already logged in)

| Path | Component | Layout | Title |
|------|-----------|--------|-------|
| `/auth/login` | `Login` | None (full page) | Login |
| `/auth/signup` | `Signup` | None (full page) | Sign Up |
| `/auth/forgot-password` | `ForgotPassword` | None (full page) | Forgot Password |

### Learner Routes (auth required, role: learner)

| Path | Component | Layout | Title |
|------|-----------|--------|-------|
| `/learn` | `LearnerDashboard` | `LearnLayout` | Dashboard |
| `/learn/notes` | `LessonNotes` | `LearnLayout` | Lesson Notes |
| `/learn/assignments` | `Assignments` | `LearnLayout` | Assignments |
| `/learn/resources` | `Resources` | `LearnLayout` | Resources |
| `/learn/certificates` | `Certificates` | `LearnLayout` | Certificates |
| `/learn/profile` | `Profile` | `LearnLayout` | Profile |

### Admin Routes (auth required, role: admin)

| Path | Component | Layout | Title |
|------|-----------|--------|-------|
| `/admin` | `AdminDashboard` | `AdminLayout` | Dashboard |
| `/admin/programmes` | `ProgrammeManagement` | `AdminLayout` | Programmes |
| `/admin/learners` | `LearnerManagement` | `AdminLayout` | Learners |
| `/admin/instructors` | `InstructorManagement` | `AdminLayout` | Instructors |
| `/admin/bookings` | `BookingsManagement` | `AdminLayout` | Bookings (Individual/Corporate toggle) |
| `/admin/exams` | `ExamManagement` | `AdminLayout` | Exams |
| `/admin/instruments` | `InstrumentManagement` | `AdminLayout` | Instruments |
| `/admin/lms` | `LMSManagement` | `AdminLayout` | LMS |
| `/admin/content` | `WebsiteCMS` | `AdminLayout` | Website Content |
| `/admin/reports` | `Reports` | `AdminLayout` | Reports |
| `/admin/settings` | `Settings` | `AdminLayout` | Settings |

---

## Layout Wrappers

### PublicLayout
```
┌─────────────────────────────────┐
│           Navbar                │
├─────────────────────────────────┤
│                                 │
│         <Outlet />              │
│         (page content)          │
│                                 │
├─────────────────────────────────┤
│           Footer                │
└─────────────────────────────────┘
```

### LearnLayout
```
┌──────────┬──────────────────────┐
│          │                      │
│ Sidebar  │      <Outlet />      │
│          │   (learner content)  │
│          │                      │
└──────────┴──────────────────────┘
```

### AdminLayout
```
┌──────────┬──────────────────────┐
│          │                      │
│ Sidebar  │      <Outlet />      │
│          │   (admin content)    │
│          │                      │
└──────────┴──────────────────────┘
```

---

## Auth Guards

### AuthGuard

```tsx
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <FullPageSkeleton />;
  if (!user) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
}
```

### RoleGuard

```tsx
function RoleGuard({ role, children }: { role: 'admin' | 'learner'; children: React.ReactNode }) {
  const { userRole } = useAuth();

  if (userRole !== role) {
    return <Navigate to={userRole === 'admin' ? '/admin' : '/learn'} replace />;
  }

  return <>{children}</>;
}
```

---

## Redirect Rules

| Condition | Redirect To |
|-----------|------------|
| Unauthenticated user visits `/learn/*` | `/auth/login` |
| Unauthenticated user visits `/admin/*` | `/auth/login` |
| Admin visits `/learn` | `/admin` |
| Learner visits `/admin` | `/learn` |
| Logged-in user visits `/auth/login` | `/` (or role dashboard) |
| Invalid route | `/` |
