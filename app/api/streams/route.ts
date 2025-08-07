import prisma from '@/app/lib/db'
import { getYouTubeData } from '@/app/lib/getYoutubeData'
import { CreateStreamSchema } from '@/app/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
   try {
      const data = await req.json()
      const receivedData = CreateStreamSchema.parse(data)
      // This is only for youtube add for spotify also
      const extractedId = receivedData.url.split('?v=')[1]
      const youtubeData = await getYouTubeData(extractedId)
      const stream = await prisma.stream.create({
         data: {
            userId: receivedData.creatorId,
            url: receivedData.url,
            extractedId: extractedId,
            type: 'Youtube',
            title: youtubeData?.title,
            smallImg: youtubeData?.thumbnails.standard.url,
            bigImg: youtubeData?.thumbnails.maxres.url,
         },
      })

      return NextResponse.json({
         message: 'Succedd',
         id: stream.id,
      })
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

// thumbnails: {
//     default: {
//       url: 'https://i.ytimg.com/vi/fLTRZFwzIsk/default.jpg',
//       width: 120,
//       height: 90
//     },
//     medium: {
//       url: 'https://i.ytimg.com/vi/fLTRZFwzIsk/mqdefault.jpg',
//       width: 320,
//       height: 180
//     },
//     high: {
//       url: 'https://i.ytimg.com/vi/fLTRZFwzIsk/hqdefault.jpg',
//       width: 480,
//       height: 360
//     },
//     standard: {
//       url: 'https://i.ytimg.com/vi/fLTRZFwzIsk/sddefault.jpg',
//       width: 640,
//       height: 480
//     },
//     maxres: {
//       url: 'https://i.ytimg.com/vi/fLTRZFwzIsk/maxresdefault.jpg',
//       width: 1280,
//       height: 720
//     }
//   }
// }
