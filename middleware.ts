// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
   const token = await getToken({ req })
   const url = req.nextUrl

   if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
   }

   if (
      url.pathname.startsWith('/dashboard/creator') &&
      token.role !== 'Streamer'
   ) {
      return NextResponse.redirect(new URL('/dashboard/user', req.url))
   }

   if (url.pathname.startsWith('/dashboard/user') && token.role !== 'EndUser') {
      return NextResponse.redirect(new URL('/dashboard/creator', req.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: ['/dashboard/:path*'],
}
