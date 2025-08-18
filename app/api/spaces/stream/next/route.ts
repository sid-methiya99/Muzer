// app/api/spaces/stream/next/route.ts
import prisma from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
   const songId = req.nextUrl.searchParams.get('songId')
   if (!songId) {
      return NextResponse.json(
         { message: 'Error: Missing songId' },
         { status: 400 }
      )
   }

   try {
      const res = await prisma.songQueue.update({
         where: { id: songId },
         data: { played: true },
      })

      return NextResponse.json({
         message: 'Song marked as played',
         currentPlayingSong: res,
      })
   } catch (error) {
      console.error(error)
      return NextResponse.json(
         { message: 'Error while updating song' },
         { status: 500 }
      )
   }
}
