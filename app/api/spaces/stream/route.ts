import prisma from '@/app/lib/db'
import { getYouTubeData } from '@/app/lib/getYoutubeData'
import { CreateStreamSchema } from '@/app/lib/zodTypes'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(req: NextRequest) {
   const session = await getServerSession(authOptions)

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }

   const data = await req.json()
   const receivedData = data.data.url
   const receivedSpaceId = data.data.spaceId
   const verifyReceivedData = CreateStreamSchema.safeParse({
      url: receivedData,
      spaceId: receivedSpaceId,
   })

   if (!verifyReceivedData.success) {
      return NextResponse.json({
         message: 'Error while parsing',
      })
   }
   let extractedId = receivedData.split('?v=')[1]
   if (extractedId.includes('&')) {
      extractedId = extractedId.split('&')[0]
   }

   const youtubeData = await getYouTubeData(extractedId)
   try {
      const res = await prisma.songQueue.create({
         data: {
            url: receivedData,
            extractedId: extractedId,
            type: 'Youtube',
            title: youtubeData?.title,
            smallImg: youtubeData?.thumbnails.standard.url,
            bigImg:
               youtubeData?.thumbnails.maxres?.url ??
               youtubeData?.thumbnails.standard.url,
            spaceId: receivedSpaceId,
            songByUserId: session.user.id,
         },
      })

      return NextResponse.json({
         message: 'Stream added successfully',
      })
   } catch (error) {
      console.error(error)
      return NextResponse.json({
         message: 'Error while adding streams',
      })
   }
}

export async function GET(req: NextRequest) {
   const session = await getServerSession(authOptions)

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }

   const spaceId = req.nextUrl.searchParams.get('spaceId')
   if (!spaceId) {
      return NextResponse.json({
         message: 'Error',
      })
   }
   try {
      const findSongs = await prisma.songQueue.findMany({
         where: {
            spaceId: spaceId,
         },
         include: {
            _count: {
               select: {
                  upVote: true,
               },
            },
            upVote: {
               where: {
                  userId: session.user.id,
               },
            },
         },
      })
      return NextResponse.json(
         {
            findSongs: findSongs.map(({ _count, ...rest }) => ({
               ...rest,
               upVote: _count.upVote,
               haveVoted: rest.upVote.length ? true : false,
            })),
         },
         {
            status: 200,
         }
      )
   } catch (error) {
      console.error(error)
      return NextResponse.json(
         {
            message: 'Error while sending songs',
         },
         {
            status: 411,
         }
      )
   }
}
