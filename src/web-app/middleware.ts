export { default } from "next-auth/middleware";

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [
    "/patients/:path*",
    "/healthrecords/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|logo.svg).+)",
  ],
};
