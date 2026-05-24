import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname === "/my-secret-panel-15j30k" && token && role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
    if (role !== "admin") {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*", "/my-secret-panel-15j30k", "/auth"],
};