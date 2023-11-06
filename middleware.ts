export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/((?!api|sign-up|sign-in|sign-out|forgot-password|_next|.*\\..*|$).*)',
  ],
};
