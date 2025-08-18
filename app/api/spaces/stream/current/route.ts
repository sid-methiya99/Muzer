// app/api/spaces/stream/current/route.ts
import prisma from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
   const songId = req.nextUrl.searchParams.get('songId')
   if (!songId) {
      return NextResponse.json(
         { message: 'Error: Missing songId' },
         { status: 400 }
      )
   }

   try {
      const res = await prisma.songQueue.findUnique({
         where: { id: songId },
      })

      return NextResponse.json({ currentPlayingSong: res })
   } catch (error) {
      console.error(error)
      return NextResponse.json(
         { message: 'Error while fetching song' },
         { status: 500 }
      )
   }
}
