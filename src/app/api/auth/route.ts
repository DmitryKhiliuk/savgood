import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";
import { loginToStrapi } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const token = await loginToStrapi();
  const cookie = await cookies()
  cookie.set("sgt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return NextResponse.redirect(new URL("/visual-cam", request.url));
}