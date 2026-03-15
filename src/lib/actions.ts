'use server';

import { login } from '@/lib/auth';
import { compare } from 'bcryptjs';

export async function authenticate(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (email !== adminEmail) {
        return { error: 'Identifiants invalides' };
    }

    const isPasswordCorrect = await compare(password, adminPasswordHash!);

    if (!isPasswordCorrect) {
        return { error: 'Identifiants invalides' };
    }

    await login(email);
    return { success: true };
}
