import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
   const session = await getServerSession(authOptions)

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }

   const data = await req.json()
   const streamId = data.data.songId
   console.log(streamId)
   try {
      const res = await prisma.upVote.create({
         data: {
            userId: session.user.id,
            songId: streamId,
         },
      })
      return NextResponse.json(
         {
            message: 'UpVoted',
         },
         {
            status: 200,
         }
      )
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
