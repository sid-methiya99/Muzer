import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@/app/lib/db'
import { cookies } from 'next/headers'
type Role = 'Streamer' | 'EndUser'
export const authOptions: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID ?? '',
         clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
         authorization: {
            params: {
               scope: 'openid email profile https://www.googleapis.com/auth/youtube.readonly',
            },
         },
         checks: ['none'],
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
            const checkUser = await prisma.user.findUnique({
               where: {
                  email: user.email,
               },
            })
            if (checkUser) {
               return true
            }
            const res = await prisma.user.create({
               data: {
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
            const dbUser = await prisma.user.findUnique({
               where: { email: user.email },
            })
            if (dbUser) {
               token.userId = dbUser.id
               token.email = dbUser.email
               token.role = dbUser.role
            }
         } else if (!token.userId && token.email) {
            const dbUser = await prisma.user.findUnique({
               where: { email: token.email },
            })
            if (dbUser) {
               token.userId = dbUser.id
               token.role = dbUser.role
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
         session.user.role = (token.role as string as Role) ?? 'EndUser'
         return session
      },
      async redirect({ url, baseUrl }) {
         const cookieStore = cookies()
         const role: Role =
            ((await cookieStore).get('oauth_role')?.value as Role) ??
            ('EndUser' as Role)

         // Role from query (first login) or fallback
         if (role === 'Streamer') return `${baseUrl}/creator`
         if (role === 'EndUser') return `${baseUrl}/user`
         return baseUrl
      },
   },
}
export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
