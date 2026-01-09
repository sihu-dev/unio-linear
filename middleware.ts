import { auth } from '@/lib/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Protected routes
  const protectedRoutes = ['/dashboard'];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // Auth routes (login, register)
  const authRoutes = ['/auth/login', '/auth/register'];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect logged-in users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', req.nextUrl));
  }

  // Redirect unauthenticated users to login
  if (isProtected && !isLoggedIn) {
    const redirectUrl = new URL('/auth/login', req.nextUrl);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return Response.redirect(redirectUrl);
  }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
