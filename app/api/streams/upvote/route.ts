import prisma from '@/app/lib/db'
import { UpVoteSchema } from '@/app/lib/types'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

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
      const parseInput = UpVoteSchema.parse(data)
      const res = await prisma.upVote.create({
         data: {
            userId: user.id,
            streamId: data.streamId,
         },
      })
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
