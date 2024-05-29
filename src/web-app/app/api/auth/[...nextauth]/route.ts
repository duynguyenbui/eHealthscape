import NextAuth, { NextAuthOptions } from "next-auth";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    DuendeIdentityServer6({
      id: "id-server",
      clientId: process.env.DUENDE_IDS6_ID!,
      clientSecret: process.env.DUENDE_IDS6_SECRET!,
      issuer: process.env.DUENDE_IDS6_ISSUER!,
      authorization: { params: { scope: "openid profile healthrecords" } },
      idToken: true,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
