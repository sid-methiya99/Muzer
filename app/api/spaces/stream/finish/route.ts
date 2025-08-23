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
   console.log(songId)
   try {
      const res = await prisma.songQueue.update({
         where: { id: songId },
         data: { currentPlaying: false },
      })

      return NextResponse.json(
         {
            message: 'Song marked as finished',
         },
         { status: 200 }
      )
   } catch (error) {
      console.error(error)
      return NextResponse.json(
         { message: 'Error while updatying current playing song' },
         { status: 500 }
      )
   }
}
