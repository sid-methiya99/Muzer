import prisma from '@/app/lib/db'
import { CreateStreamSchema } from '@/app/lib/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
   try {
      const data = await req.json()
      const receivedData = CreateStreamSchema.parse(data)
      // This is only for youtube add for spotify also
      const extractedId = receivedData.url.split('?v=')[1]

      await prisma.stream.create({
         data: {
            userId: receivedData.creatorId,
            url: receivedData.url,
            extractedId: extractedId,
            type: 'Youtube',
         },
      })
   } catch (error) {
      return NextResponse.json({
         message: 'Error while adding a stream',
      })
   }
}
