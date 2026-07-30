# Security

## Matt-Agba Music Consult

---

## Authentication

### Supabase Auth

The platform uses **Supabase Auth** for all authentication. No custom password hashing or session management.

| Flow | Mechanism | Details |
|------|-----------|---------|
| Login | `supabase.auth.signInWithPassword()` | Email + password. Session stored in Supabase httpOnly cookie. |
| Magic Link | `supabase.auth.signInWithOtp()` | Email-based one-time password. Redirects to `/auth/callback`. |
| Password Reset | `supabase.auth.resetPasswordForEmail()` | Email with reset link. User sets new password via `updatePassword()`. |
| Session Refresh | Automatic (Supabase client) | Token refresh handled transparently. |
| Logout | `supabase.auth.signOut()` | Clears session cookie, redirects to home. |

### Session Persistence

Supabase stores the session in an **httpOnly cookie** (not `localStorage`) by default, which mitigates XSS-based session theft. The client initialises with:

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### Auth State Flow

```
App mount → supabase.auth.getUser()
  ├── No session → user = null, AuthGuard redirects to /auth/login
  └── Session exists → query users table for role
        ├── role = 'admin' → allow /admin/*
        └── role = 'learner' → allow /learner/*
```

---

## Authorization — Row Level Security (RLS)

All 17 database tables have RLS enabled. **RLS is the primary security boundary.** The client-side anon key cannot bypass it.

### Helper Function

```sql
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;
```

### Policy Summary

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| `users` | Own profile or admin | Admin only | Own profile or admin | — |
| `learners` | Own record or admin | Admin only | Admin only | Admin only |
| `programmes` | Public | Admin only | Admin only | Admin only |
| `lesson_notes` | Learner's programme or admin | Admin only | Admin only | Admin only |
| `assignments` | Own or admin | Admin only | Own (submit) or admin | Admin only |
| `assignment_submissions` | Own or admin | Learner only (own) | Admin only | Admin only |
| `learning_resources` | Learner's programme or public | Admin only | Admin only | Admin only |
| `certificates` | Own or admin | Admin only | Admin only | Admin only |
| `consultations` | Admin only | Public | Admin only | Admin only |
| `instructor_applications` | Admin only | Public | Admin only | Admin only |
| `exam_registrations` | Admin only | Public | Admin only | Admin only |
| `instrument_categories` | Public | Admin only | Admin only | Admin only |
| `instruments` | Public | Admin only | Admin only | Admin only |
| `consultancy_requests` | Admin only | Public | Admin only | Admin only |
| `announcements` | Learner (published) or admin | Admin only | Admin only | Admin only |
| `website_content` | Public (active) or admin (all) | Admin only | Admin only | Admin only |
| `settings` | Public | Admin only | Admin only | — |

### Key Principle

- **Public INSERT** tables (consultations, instructor_applications, exam_registrations, consultancy_requests) allow anyone to create records but never to read others'
- **Learner-scoped SELECT** uses `auth.uid()` joined through `learners` table to scope data per learner
- **Admin-only** actions check `public.is_admin()` which queries the `users` table for role = 'admin'

---

## Client-Side Security

### Environment Variables

| Variable | Location | Risk |
|----------|----------|------|
| `VITE_SUPABASE_URL` | `.env.local` | Public — part of the client bundle |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | **Public by design** — safe because RLS is the real security |
| `VITE_DEV_BYPASS_AUTH` | `.env.local` | Must be `false` or absent in production |

### What NOT to put in env files

- `SUPABASE_SERVICE_ROLE_KEY` — this bypasses RLS entirely. Never in client code or `.env` files checked into git.

### Build-Time Injection

Vite replaces `import.meta.env.VITE_*` at build time. Variables are embedded in the JS bundle and visible in DevTools. This is expected — the anon key is designed to be public.

---

## Input Validation

### Database-Level Constraints (defence in depth)

Every `status`, `type`, and `category` column uses CHECK constraints:

```sql
CHECK (role IN ('admin', 'learner'))
CHECK (status IN ('active', 'inactive', 'suspended'))
CHECK (exam_type IN ('practical', 'theory'))
CHECK (exam_board IN ('ABRSM', 'Trinity', 'MUSON'))
-- ... 20+ CHECK constraints across all tables
```

### Client-Side Validation

| Field | Rule | Enforcement |
|-------|------|-------------|
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | On blur + on submit |
| Phone | Must start with `+`, 10+ digits | On blur + on submit |
| Required fields | Not empty | On submit |
| Date | Must be today or future | On submit |

Client validation is UX-only. **RLS and CHECK constraints enforce security server-side.**

---

## File Upload Security

### Supabase Storage Bucket Policies

| Bucket | Public Read | Authenticated Read | Insert | Update |
|--------|-------------|-------------------|--------|--------|
| `lesson-notes` | — | Learner (own programme) | Admin | Admin |
| `assignments` | — | Learner (own) | Admin | Admin |
| `assignment-submissions` | — | Admin + learner (own) | Learner (own) | — |
| `resources` | — | Learner (own programme) | Admin | Admin |
| `certificates` | — | Learner (own) | Admin | Admin |
| `programme-images` | Public | — | Admin | Admin |
| `instrument-images` | Public | — | Admin | Admin |
| `instructor-cvs` | — | Admin | Public | — |
| `website-assets` | Public | — | Admin | Admin |

### File Type Restrictions

Supabase Storage does not enforce file-type validation at the bucket level. Implement client-side checks:

```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function validateFile(file: File): boolean {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Allowed: JPEG, PNG, WebP, PDF.');
  }
  if (file.size > MAX_SIZE) {
    throw new Error('File too large. Maximum size is 10 MB.');
  }
  return true;
}
```

---

## Dev Mode — Bypass Warning

`VITE_DEV_BYPASS_AUTH` is a development-only flag that skips Supabase authentication and injects a mock admin user.

```typescript
// hooks/useAuth.tsx
export const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS_AUTH === 'true';
```

| Environment | Setting | Risk |
|-------------|---------|------|
| Local development | `VITE_DEV_BYPASS_AUTH=true` | Safe — no external access |
| Staging / preview | `VITE_DEV_BYPASS_AUTH=false` | Must be disabled |
| Production | Not set or `false` | Must be disabled |

### Pre-Deployment Check

```bash
grep -r "VITE_DEV_BYPASS_AUTH" .env*  # Ensure not set to true
grep -r "DEV_BYPASS" src/              # Confirm no accidental bypass
```

---

## Dependency Security

### Practices

- `package-lock.json` is committed to pin exact dependency versions
- Run `npm audit` before every deploy
- Review major version upgrades for breaking changes or security patches
- Supabase JS client v2.x is the only external backend dependency

### Known Low-Risk Areas

- **Framer Motion**: Animation library — no network access, no user input processing
- **Lucide React**: Icon library — pure SVG components, no runtime evaluation
- **Tailwind CSS**: Build-time only — no runtime JavaScript
- **clsx / tailwind-merge**: String utility — negligible risk

---

## Pre-Launch Security Checklist

- [x] RLS policies enabled on all 17 tables (migrations/20260728000000_create_all_tables.sql)
- [x] RLS policies: `public.is_admin()` SECURITY DEFINER function used for all admin checks (migrations/20260728000001_fix_rls_recursion.sql)
- [x] Admin routes protected by `ProtectedRoute` (allowedRoles=['admin'])
- [x] Learner routes protected by `ProtectedRoute` (allowedRoles=['learner'])
- [x] AuthGuard redirects unauthenticated users to `/auth/login`
- [x] `VITE_DEV_BYPASS_AUTH` set to `false` in `.env`
- [x] No `SUPABASE_SERVICE_ROLE_KEY` in client code or env files
- [x] `npm audit` — 2 high vulnerabilities in react-router (RSC-specific, not applicable to client-side SPA). See note below.
- [ ] Storage bucket policies configured in Supabase dashboard (9 buckets). Local config has 50MiB size limit.
- [x] File upload validates type + size client-side (validateFile() in services/storage.ts)
- [x] CSP headers configured in vercel.json
- [x] HTTPS enforced (Vercel default)
- [x] `.env*` in `.gitignore` (no secrets committed)
- [x] Console errors checked — no `console.log`, only catch-block `console.error` + one env warn
- [ ] `robots.txt` configured (not yet deployed — add before production launch)

**Note on npm audit:** The 2 high-severity findings in `react-router` (GHSA-qwww-vcr4-c8h2 and others) are RSC-specific and do not affect this client-side SPA. Downgrading to 7.11.0 introduced more vulnerabilities. Keep at ^7.18.1 and monitor for a patch.
