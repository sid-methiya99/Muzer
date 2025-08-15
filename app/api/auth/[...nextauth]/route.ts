import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/app/lib/db'
import { cookies } from 'next/headers'
type Role = 'Streamer' | 'EndUser'
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
         const cookieStore = cookies()
         const role: Role =
            ((await cookieStore).get('oauth_role')?.value as Role) ??
            ('EndUser' as Role)
         try {
            if (!user.email) return false
            const res = await prisma.user.upsert({
               where: { email: user.email },
               update: {},
               create: {
                  email: user.email,
                  name: user.name ?? '',
                  role: role,
               },
            })
            return true
         } catch (error) {
            console.error(error)
            return false
         }
      },
      async jwt({ token, account, user }) {
         // Store Google access token and userId on first sign in
         if (account && user.email) {
            const dbStreamer = await prisma.user.findUnique({
               where: { email: user.email },
            })
            if (dbStreamer) {
               token.userId = dbStreamer.id
               token.email = dbStreamer.email
               token.role = dbStreamer.role
            }
         }

         // Now we can safely delete the cookie
         if (account) {
            token.accessToken = account.access_token
         }
         return token
      },
      async session({ session, token }) {
         // Pass both access token AND userId to the client
         session.accessToken = token.accessToken
         session.user.id = token.userId as string // Add this line!
         session.user.role = token.role as string
         return session
      },
      async redirect({ url, baseUrl }) {
         const cookieStore = cookies()
         const role: Role =
            ((await cookieStore).get('oauth_role')?.value as Role) ??
            ('EndUser' as Role)

         // Role from query (first login) or fallback
         if (role === 'Streamer') return `${baseUrl}/dashboard/creator`
         if (role === 'EndUser') return `${baseUrl}/dashboard/user`
         return baseUrl
      },
   },
})

export { handler as GET, handler as POST }
