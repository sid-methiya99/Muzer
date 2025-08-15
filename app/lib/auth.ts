import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './db'
// If your Prisma file is located elsewhere, you can change the path

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
})
