// app/api/set-role/route.ts
import { cookies } from 'next/headers'

export async function POST(req: Request) {
   const { role } = await req.json()
   try {
      const res = (await cookies()).set('oauth_role', role, { maxAge: 120 })
      console.log('Control inside set-role', res)
      return new Response(null, { status: 200 })
   } catch (error) {
      console.error(error)
      return new Response(null, { status: 403 })
   }
}
