import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { POST } from '../../streams/downvote/route'
import prisma from '@/app/lib/db'
const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID ?? '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      }),
   ],
   callbacks: {
      async signIn(params) {
         try {
            if (!params.user.email) {
               return false
            }
            await prisma.user.create({
               data: {
                  email: params.user.email ?? '',
                  provider: 'Google',
               },
            })
            return true
         } catch (error) {
            console.error(error)
         }

         return true
      },
   },
})

export { handler as GET, handler as POST }
