export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/donation", "/guest-book", "/comments", "/settings"],
};