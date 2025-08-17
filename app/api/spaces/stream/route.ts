import prisma from '@/app/lib/db'
import { getYouTubeData } from '@/app/lib/getYoutubeData'
import { CreateStreamSchema } from '@/app/lib/zodTypes'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
   const session = await getServerSession()

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }

   const creatorId = req.nextUrl.searchParams.get('creatorId')
   if (!creatorId) {
      return NextResponse.json({
         message: 'Error',
      })
   }
   const data = await req.json()

   const receivedData = data.data.url
   const receivedSpaceId = data.data.spaceId
   const verifyReceivedData = CreateStreamSchema.safeParse(receivedData)

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
         },
      })
   } catch (error) {
      console.error(error)
   }
}
