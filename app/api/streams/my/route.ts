import prisma from '@/app/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(req: NextResponse) {
   const session = await getServerSession()

   // Find way to remove db call
   const user = await prisma.user.findFirst({
      where: {
         email: session?.user?.email ?? '',
      },
   })
   if (!user) {
      return NextResponse.json(
         {
            message: 'Unaunthenticated',
         },
         {
            status: 403,
         }
      )
   }

   const streams = await prisma.stream.findMany({
      where: {
         userId: user.id ?? '',
      },
   })
   return NextResponse.json({
      streams,
   })
}
