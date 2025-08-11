import prisma from '@/app/lib/db'
import { UpVoteSchema } from '@/app/lib/types'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { use } from 'react'

export async function POST(req: NextRequest) {
   const session = await getServerSession()

   // Find way to remove db call
   const user = await prisma.user.findFirst({
      where: {
         email: session?.user?.email ?? '',
      },
   })
   if (!user) {
      return NextResponse.json(
         {
            message: 'Unaunthenticated',
         },
         {
            status: 403,
         }
      )
   }
   try {
      const data = await req.json()
      const streamId = data.data.streamId
      try {
         const parseInput = UpVoteSchema.safeParse(data.data)
         if (!parseInput.success) {
            return NextResponse.json(
               {
                  message: 'Error while upvoting',
               },
               {
                  status: 403,
               }
            )
         }
      } catch (error) {
         console.error(error)
      }
      try {
         const res = await prisma.upVote.delete({
            where: {
               userId_streamId: {
                  userId: user.id,
                  streamId: streamId,
               },
            },
         })
         return NextResponse.json(
            {
               message: 'DownVoted',
            },
            {
               status: 200,
            }
         )
      } catch (error) {
         console.error(error)
      }
   } catch (error) {
      return NextResponse.json(
         {
            message: 'Error while upvoting',
         },
         {
            status: 403,
         }
      )
   }
}
