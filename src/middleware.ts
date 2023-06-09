import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signin",
  },
});

export const config = {
  matcher: [
    "/",
    "/colors",
    "/categories",
    "/sizes",
    "/products",
    "/storage",
    "/storage/:path*",
  ],
};
