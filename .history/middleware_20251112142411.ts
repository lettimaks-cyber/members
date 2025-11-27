import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/contact',
  '/join',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/membership/validate',
  '/api/members/register',
  '/api/members/verify',
]);

const isAdminRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/members/update',
  '/api/members/get(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes
  if (isAdminRoute(req)) {
    const sessionAuth = await auth();
    sessionAuth.protect((has: any) => {
      return has({ role: 'org:admin' }) || has({ role: 'org:member' });
    });
  } else if (!isPublicRoute(req)) {
    const sessionAuth = await auth();
    sessionAuth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};