import { NextAuthOptions } from "next-auth";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";

const authOptions: NextAuthOptions = {
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
      issuer: process.env.DUENDE_IDS6_ISSUER! || "https://id.ehealthscape.com",
      authorization: {
        params: { scope: "openid profile healthrecords speech" },
      },
      idToken: true,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.sub = token.sub as string;
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

export default authOptions;
