import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const location = new URL('/assets/weston-resume.pdf', `${url.protocol}//${url.host}`);
  return NextResponse.redirect(location, 302);
}


