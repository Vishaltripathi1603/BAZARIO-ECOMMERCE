import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const { supabaseResponse, user } = await updateSession(request);

  // 1. Protected Routes: /account/* and /checkout require logged-in session
  const isProtectedRoute =
    pathname.startsWith("/account") || pathname.startsWith("/checkout");

  if (isProtectedRoute && !user) {
    const signInUrl = new URL("/signin", request.url);
    const destination = pathname + search;
    if (destination !== "/" && destination !== "") {
      signInUrl.searchParams.set("next", destination);
    }
    return NextResponse.redirect(signInUrl);
  }

  // 2. Auth Routes: Logged-in users visiting /signin or /signup are redirected to /account
  const isAuthRoute =
    pathname === "/signin" || pathname === "/signup";

  if (isAuthRoute && user) {
    const accountUrl = new URL("/account", request.url);
    return NextResponse.redirect(accountUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images directory)
     * - Feel free to add more static extensions: svg|png|jpg|jpeg|gif|webp|woff2
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)",
  ],
};
