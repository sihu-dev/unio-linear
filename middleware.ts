import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;

  // Skip API and NextAuth routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Protected routes
  const protectedRoutes = ['/dashboard'];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // Auth routes (login, register)
  const authRoutes = ['/auth/login', '/auth/register'];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Redirect unauthenticated users to login
  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL('/auth/login', req.nextUrl);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
