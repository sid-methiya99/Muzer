import z from 'zod'

export const CreateSpaceSchema = z.object({
   isActive: z.boolean(),
   title: z.string(),
   description: z.string(),
})
