import prisma from '@/app/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
   const songId = req.nextUrl.searchParams.get('songId')
   const previousSongId = req.nextUrl.searchParams.get('previousSongId') // Add this parameter

   console.log('Current songId:', songId)
   console.log('Previous songId:', previousSongId)

   if (!songId) {
      return NextResponse.json(
         { message: 'Error: Missing songId' },
         { status: 400 }
      )
   }

   try {
      // Use a transaction to handle both operations atomically
      console.log('Failed here')
      const result = await prisma.$transaction(async (tx) => {
         // First, mark the previous song as not currently playing
         console.log('here 1')
         if (previousSongId) {
            await tx.songQueue.updateMany({
               where: {
                  id: previousSongId,
               },
               data: { currentPlaying: false },
            })
         }

         // Then mark all other songs in the same space as not currently playing
         const currentSong = await tx.songQueue.findUnique({
            where: { id: songId },
            select: { spaceId: true },
         })

         console.log('here 2')
         if (currentSong?.spaceId) {
            await tx.songQueue.updateMany({
               where: {
                  spaceId: currentSong.spaceId,
                  id: { not: songId },
               },
               data: { currentPlaying: false },
            })
         }

         console.log('here 3')
         // Finally, update the new current song
         const res = await tx.songQueue.update({
            where: { id: songId },
            data: {
               played: true,
               currentPlaying: true, // Changed from currentPlayingSongId to currentPlaying
            },
         })

         return res
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
