import { SpaceFormData } from '@/app/components/CreateSpaceModal'
import prisma from '@/app/lib/db'
import { CreateSpaceSchema } from '@/app/lib/zodTypes'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
   const session = await getServerSession()

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }
   const user = await prisma.user.findFirst({
      where: { email: session.user.email },
   })

   const data = await req.json()
   const receivedData: SpaceFormData = data.data
   const verifyReceivedData = CreateSpaceSchema.safeParse(receivedData)
   if (!verifyReceivedData.success) {
      return NextResponse.json({
         message: 'Error while parsing',
      })
   }
   try {
      const addSpace = await prisma.space.create({
         data: {
            title: receivedData.title,
            description: receivedData.description,
            isActive: receivedData.isActive,
            streamerId: user?.id ?? '',
         },
      })
      return NextResponse.json({
         message: 'Done adding space',
         spaceId: addSpace.id,
      })
   } catch (error) {
      console.error(error)
      return NextResponse.json({
         message: 'Error adding spaces',
      })
   }
}

export async function GET(req: NextRequest) {
   const session = await getServerSession()

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }
   const user = await prisma.user.findFirst({
      where: { email: session.user.email },
   })

   try {
      const spaces = await prisma.space.findMany({
         where: {
            streamerId: user?.id ?? '',
         },
      })
      return NextResponse.json({
         spaces,
      })
   } catch (error) {
      console.error(error)
   }
}
