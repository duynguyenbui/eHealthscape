export { default } from "next-auth/middleware";

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [],
};
