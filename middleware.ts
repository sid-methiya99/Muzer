import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
   const token = await getToken({ req })
   const url = req.nextUrl

   if (!token) {
      return NextResponse.redirect(new URL('/', req.url))
   }

   if (url.pathname === '/') {
      if (token.role === 'Streamer') {
         return NextResponse.redirect(new URL('/creator', req.url))
      } else if (token.role === 'EndUser') {
         return NextResponse.redirect(new URL('/user', req.url))
      }
   }
   // If EndUser tries to go to /creator → redirect to /user
   if (url.pathname.startsWith('/creator') && token.role !== 'Streamer') {
      return NextResponse.redirect(new URL('/user', req.url))
   }

   // If Streamer tries to go to /user → redirect to /creator
   if (url.pathname.startsWith('/user') && token.role !== 'EndUser') {
      return NextResponse.redirect(new URL('/creator', req.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: ['/creator/:path*', '/user/:path*'], // ✅ no /dashboard
}
