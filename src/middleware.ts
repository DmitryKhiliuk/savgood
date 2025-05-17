import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('sgt')?.value;

    if (!token && request.nextUrl.pathname !== '/api/auth') {
        return NextResponse.redirect(new URL('/api/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
    ],
};