import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await decrypt(session);
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect from /admin/login to /admin/dashboard if already logged in
  if (pathname === '/admin/login' && session) {
    try {
      await decrypt(session);
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } catch (error) {
      // Invalid session, let user stay on login page
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
