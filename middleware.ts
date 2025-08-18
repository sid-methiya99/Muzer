import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
   const token = await getToken({ req })
   const url = req.nextUrl

   // If no session
   if (!token) {
      // Guests can only access shareable space
      if (url.pathname.startsWith('/creator/space/')) {
         return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/', req.url))
   }

   // Allow everyone (logged in or not) to view /creator/space/:id
   if (url.pathname.startsWith('/creator/space/')) {
      return NextResponse.next()
   }

   // Redirect root based on role
   if (url.pathname === '/') {
      if (token.role === 'Streamer') {
         return NextResponse.redirect(new URL('/creator', req.url))
      } else if (token.role === 'EndUser') {
         return NextResponse.redirect(new URL('/user', req.url))
      }
   }

   // Role-based protection
   if (url.pathname.startsWith('/creator') && token.role !== 'Streamer') {
      return NextResponse.redirect(new URL('/user', req.url))
   }

   if (url.pathname.startsWith('/user') && token.role !== 'EndUser') {
      return NextResponse.redirect(new URL('/creator', req.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: ['/creator/:path*', '/user/:path*'],
}
