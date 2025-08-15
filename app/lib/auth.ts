import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './db'
import { cookies } from 'next/headers'

type Role = 'Streamer' | 'EndUser'
export const beauth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: 'postgresql', // or "mysql", "postgresql", ...etc
   }),
   socialProviders: {
      google: {
         prompt: 'select_account',
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
   },
   databaseHooks: {
      user: {
         additionalFields: {
            role: {
               type: 'string',
               required: false,
            },
         },
         create: {
            before: async (user, ctx) => {
               console.log('Control reached here')
               const cookieStore = cookies()
               const role: Role =
                  ((await cookieStore).get('oauth_role')?.value as Role) ??
                  ('EndUser' as Role)
               console.log(role)
               const existingUser = await prisma.user.findUnique({
                  where: {
                     email: user.email,
                  },
               })

               if (existingUser) {
                  console.log(
                     'User already exists, keeping existing role:',
                     existingUser.role
                  )
                  return false // Return existing user as-is
               }
               try {
                  const res = await prisma.user.create({
                     data: {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        role: role,
                        emailVerified: user.emailVerified,
                     },
                  })
                  return true
               } catch (error) {
                  console.error(error)
               }
            },
         },
      },
   },
})
