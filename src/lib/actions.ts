'use server';

import { login, logout } from '@/lib/auth';
import { compare } from 'bcryptjs';

export async function createSession(email: string) {
    await login(email);
    return { success: true };
}

export async function signOut() {
    await logout();
}

export async function uploadFile(formData: FormData) {
    const { uploadImage } = await import('@/lib/cloudinary');
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');
    const result = await uploadImage(file);
    return JSON.parse(JSON.stringify(result));
}

// Deprecated: used for Supabase/Manual login
export async function authenticate(prevState: any, formData: FormData) {
    // ...
    return { error: 'Now using Firebase Auth' };
}

