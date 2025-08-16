import { getServerSession } from 'next-auth'

export async function POST() {
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
}
