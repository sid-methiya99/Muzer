import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/app/lib/db'

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID ?? '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
         authorization: {
            params: {
               scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
            },
         },
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET ?? 'secret',
   callbacks: {
      async signIn({ user }) {
         try {
            if (!user.email) return false
            await prisma.user.upsert({
               where: { email: user.email },
               update: {},
               create: {
                  email: user.email,
                  provider: 'Google',
               },
            })
            return true
         } catch (error) {
            console.error(error)
            return false
         }
      },
      async jwt({ token, account }) {
         // Store Google access token on first sign in
         if (account) {
            token.accessToken = account.access_token
         }
         return token
      },
      async session({ session, token }) {
         // Pass access token to the client
         session.accessToken = token.accessToken
         return session
      },
   },
})

export { handler as GET, handler as POST }
