import axios from 'axios'
import { getSession } from 'next-auth/react'
import prisma from './db'

export async function refreshStreams() {
   try {
      const session = await getSession()
      const res = await axios.get(`/api/streams/my`, {
         headers: {
            Authorization: `Bearer ${session?.accessToken}`,
         },
      })
      const data = res.data
      return data
   } catch (error) {
      console.error(error)
   }
}

export async function getUserId() {
   const session = await getSession()
   const userId = await prisma.user.findFirst({
      where: {
         email: session?.user?.email ?? '',
      },
   })

   return userId?.id
}
