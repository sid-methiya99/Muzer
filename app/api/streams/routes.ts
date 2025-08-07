import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CreateStreamSchema = z.object({
   createrId: z.string(),
   url: z
      .string()
      .refine((val) => val.includes('youtube') || val.includes('spotify')),
})

export async function POST(req: NextRequest) {
   try {
      const data = await req.json()
      const validateInput = CreateStreamSchema.safeParse(data)

      if (!validateInput.success) {
         return NextResponse.json({
            message: 'Invalid url',
         })
      }
   } catch (error) {}
}
