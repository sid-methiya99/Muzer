import axios from 'axios'
import { getSession } from 'next-auth/react'
import prisma from './db'
import { getServerSession } from 'next-auth'

export async function refreshStreams(creatorId: string) {
   try {
      const session = await getSession()
      const res = await axios.get(`/api/streams/?creatorId=${creatorId}`, {
         headers: {
            Authorization: `Bearer ${session?.accessToken}`,
         },
      })
      const data = res.data.streams
      return data
   } catch (error) {
      console.error(error)
   }
}
export async function getUserId() {
   const session = await getServerSession()
   const userId = await prisma.user.findFirst({
      where: {
         email: session?.user?.email ?? '',
      },
   })

   return userId?.id
}
