import { DefaultSession } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      sub?: string;
      access_token?: string;
    } & DefaultSession["user"];
  }
}
