import prisma from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
   const songId = req.nextUrl.searchParams.get('songId')
   console.log(songId)
   if (!songId) {
      return NextResponse.json(
         { message: 'Error: Missing songId' },
         { status: 400 }
      )
   }
   try {
      const res = await prisma.songQueue.update({
         where: { id: songId },
         data: { played: true, currentPlaying: true },
      })

      return NextResponse.json({
         message: 'Song marked as played',
      })
   } catch (error) {
      console.error(error)
      return NextResponse.json(
         { message: 'Error while updating song' },
         { status: 500 }
      )
   }
}
