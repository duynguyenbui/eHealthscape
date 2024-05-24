"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";

export async function currentUser() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return session.user;
}

export async function getAccessToken() {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  } as NextApiRequest;

  const token = await getToken({ req });

  return token?.access_token;
}
