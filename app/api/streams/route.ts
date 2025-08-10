import prisma from '@/app/lib/db'
import { getYouTubeData } from '@/app/lib/getYoutubeData'
import { CreateStreamSchema } from '@/app/lib/types'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
   try {
      const session = await getServerSession()
      if (!session?.user?.email) {
         return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
         })
      }
      const user = await prisma.user.findFirst({
         where: { email: session.user.email },
      })

      const data = await req.json()
      const receivedData = data.data.url
      const verifyReceivedData = CreateStreamSchema.safeParse(receivedData)
      console.log(receivedData)

      if (!verifyReceivedData.success) {
         return NextResponse.json({
            message: 'Error while parsing',
         })
      }

      const extractedId = receivedData.split('?v=')[1]
      const youtubeData = await getYouTubeData(extractedId)
      try {
         const stream = await prisma.stream.create({
            data: {
               userId: user?.id ?? '',
               url: receivedData,
               extractedId: extractedId,
               type: 'Youtube',
               title: youtubeData?.title,
               smallImg: youtubeData?.thumbnails.standard.url,
               bigImg:
                  youtubeData?.thumbnails.maxres?.url ??
                  youtubeData?.thumbnails.standard.url,
            },
         })
         return NextResponse.json({
            message: 'Succedd',
            id: stream.id,
         })
      } catch (error) {
         console.error(error)
      }
   } catch (error) {
      return NextResponse.json({
         message: 'Error while adding a stream',
      })
   }
}

export async function GET(req: NextRequest) {
   const creatorId = req.nextUrl.searchParams.get('creatorId')
   const streams = await prisma.stream.findMany({
      where: {
         userId: creatorId ?? '',
      },
   })

   return NextResponse.json({
      streams,
   })
}
