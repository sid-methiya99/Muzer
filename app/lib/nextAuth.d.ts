// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
   interface Session {
      accessToken?: string
      user: {
         id: string
         name?: string | null // Keep these from NextAuth
         email?: string | null
         image?: string | null
      }
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      accessToken?: string
      userId?: string
   }
}
