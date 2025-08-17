// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
   interface Session {
      accessToken?: string
      user: {
         id: string
         role: 'Streamer' | 'EndUser'
      } & DefaultSession['user'] // keep name, email, image from DefaultSession
   }

   interface User extends DefaultUser {
      id: string
      role: 'Streamer' | 'EndUser'
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      userId: string
      role: 'Streamer' | 'EndUser'
      accessToken?: string
   }
}
