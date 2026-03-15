'use server';

import { login } from '@/lib/auth';
import { compare } from 'bcryptjs';

export async function createSession(email: string) {
    await login(email);
    return { success: true };
}

// Deprecated: used for Supabase/Manual login
export async function authenticate(prevState: any, formData: FormData) {
    // ...
    return { error: 'Now using Firebase Auth' };
}

