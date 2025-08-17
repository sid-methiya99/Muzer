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
   console.log('Data: ', data)

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
   console.log(youtubeData)
   console.log('Extracted Id: ', extractedId)
   console.log('UserId: ', session.user.id)
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
