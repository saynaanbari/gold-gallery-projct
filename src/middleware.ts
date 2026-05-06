import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
    if (role !== "admin") {
      return new NextResponse("شما اجازه دسترسی به این صفحه را ندارید.", {
        status: 403,
      });
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
