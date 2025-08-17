import prisma from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions, handler } from '../../auth/[...nextauth]/route'
// This endpoint will create user for that specific space
export async function POST(req: NextRequest) {
   const session = await getServerSession(authOptions)

   if (!session?.user.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
         status: 401,
      })
   }
   const user = await prisma.spaceUsers.findFirst({
      where: { id: session.user.id },
   })

   if (user) {
      return NextResponse.json({
         message: 'Already a member of this space',
      })
   }

   const data = await req.json()
   const spaceId = data.data.spaceId
   try {
      const addUserInSpace = await prisma.spaceUsers.create({
         data: {
            userId: session?.user.id ?? '',
            spaceId: spaceId,
         },
      })
      return NextResponse.json({
         message: 'Added user to this particular space',
      })
   } catch (error) {
      console.error(error)
      return NextResponse.json({
         message: 'Error adding user to space',
      })
   }
}
