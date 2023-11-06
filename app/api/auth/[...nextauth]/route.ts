import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      async authorize({ email, password }: { email: string, password: string }) {
        if (email === 'test@example.com' && password === 'password') {
          return { token: 'token', email };
        }
        throw new Error('Invalid credentials');
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
