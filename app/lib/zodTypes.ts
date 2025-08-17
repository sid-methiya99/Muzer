import z from 'zod'

export const CreateSpaceSchema = z.object({
   isActive: z.boolean(),
   title: z.string(),
   description: z.string(),
})

export const CreateStreamSchema = z.object({
   url: z
      .string()
      .refine((val) => val.includes('youtube') || val.includes('spotify')),
   spaceId: z.string(),
})
