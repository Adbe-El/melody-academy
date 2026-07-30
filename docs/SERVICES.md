# Services

## Matt-Agba Music Consult

---

## Supabase Client Initialization

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## Error Handling

```typescript
// lib/errors.ts
export class AppError extends Error {
  code: string;
  originalError?: unknown;

  constructor(code: string, message: string, originalError?: unknown) {
    super(message);
    this.code = code;
    this.originalError = originalError;
  }
}

export function createAppError(code: string, message: string, originalError?: unknown): AppError {
  return new AppError(code, message, originalError);
}
```

---

## Auth Service

```typescript
// services/auth.ts
import { supabase } from '../lib/supabase';
import { AppError, createAppError } from '../lib/errors';

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: firstName, last_name: lastName },
    },
  });

  if (error) throw createAppError('SIGNUP_FAILED', error.message, error);

  // Insert into users table with default learner role
  if (data.user) {
    const { error: insertError } = await supabase.from('users').insert({
      id: data.user.id,
      first_name: firstName,
      last_name: lastName,
      email,
      role: 'learner',
      status: 'active',
    });

    if (insertError) throw createAppError('PROFILE_CREATE_FAILED', insertError.message, insertError);
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw createAppError('SIGNIN_FAILED', error.message, error);
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw createAppError('SIGNOUT_FAILED', error.message, error);
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/login`,
  });
  if (error) throw createAppError('RESET_FAILED', error.message, error);
}

export async function getUserRole(userId: string): Promise<'admin' | 'learner'> {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (error) throw createAppError('ROLE_FETCH_FAILED', error.message, error);
  return data.role as 'admin' | 'learner';
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
```

---

## Generic CRUD Service Factory

```typescript
// services/factory.ts
import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

export function createService<T extends { id: string }>(tableName: string) {
  return {
    async getAll(): Promise<T[]> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw createAppError(`FETCH_${tableName.toUpperCase()}`, error.message, error);
      return data as T[];
    },

    async getById(id: string): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw createAppError(`FETCH_${tableName.toUpperCase()}_BY_ID`, error.message, error);
      return data as T;
    },

    async create(record: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .insert(record)
        .select()
        .single();
      if (error) throw createAppError(`CREATE_${tableName.toUpperCase()}`, error.message, error);
      return data as T;
    },

    async update(id: string, updates: Partial<T>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw createAppError(`UPDATE_${tableName.toUpperCase()}`, error.message, error);
      return data as T;
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      if (error) throw createAppError(`DELETE_${tableName.toUpperCase()}`, error.message, error);
    },
  };
}
```

---

## Service Modules

Each module uses the factory or custom queries:

```typescript
// services/programmes.ts
import { createService } from './factory';
import type { Programme } from '../types';

export const programmesService = createService<Programme>('programmes');

// Custom: get featured programmes
export async function getFeaturedProgrammes(): Promise<Programme[]> {
  const { data, error } = await supabase
    .from('programmes')
    .select('*')
    .eq('featured', true)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_FEATURED', error.message, error);
  return data as Programme[];
}
```

```typescript
// services/consultations.ts
import { createService } from './factory';
import type { Consultation } from '../types';

export const consultationsService = createService<Consultation>('consultations');

// Custom: update status with admin notes
export async function updateConsultationStatus(
  id: string,
  status: string,
  adminNotes?: string
): Promise<Consultation> {
  const updates: any = { status, updated_at: new Date().toISOString() };
  if (adminNotes !== undefined) updates.admin_notes = adminNotes;
  return consultationsService.update(id, updates);
}
```

```typescript
// services/instruments.ts
import { createService } from './factory';
import type { Instrument } from '../types';

export const instrumentsService = createService<Instrument>('instruments');

// Custom: get by category
export async function getInstrumentsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .eq('category_id', categoryId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw createAppError('FETCH_BY_CATEGORY', error.message, error);
  return data;
}
```

Similar pattern for: `instructorApps`, `learners`, `lessonNotes`, `assignments`, `resources`, `certificates`, `examRegistrations`, `consultancyRequests`, `announcements`.

---

## Storage Service

```typescript
// services/storage.ts
import { supabase } from '../lib/supabase';
import { createAppError } from '../lib/errors';

export async function uploadFile(bucket: string, path: string, file: File): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) throw createAppError('UPLOAD_FAILED', error.message, error);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw createAppError('DELETE_FILE_FAILED', error.message, error);
}

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
```

---

## File Naming Convention for Uploads

| Bucket | Path Pattern | Example |
|--------|-------------|---------|
| `instructor-cvs` | `{applicant_id}/{timestamp}_{filename}` | `app-123_20260724_resume.pdf` |
| `programme-images` | `{programme_id}/{filename}` | `prog-456_cover.jpg` |
| `instrument-images` | `{instrument_id}/{filename}` | `inst-789_main.jpg` |
| `lesson-notes` | `{programme_id}/{lesson_id}_{filename}` | `prog-123_note-456_slides.pdf` |
| `assignment-submissions` | `{assignment_id}/{learner_id}_{filename}` | `assign-123_learn-456_recording.mp3` |
| `resources` | `{programme_id}/{filename}` | `prog-123_hanon-book.pdf` |
| `certificates` | `{learner_id}/{certificate_code}.pdf` | `learn-123_MA-CERT-2026-8891.pdf` |
