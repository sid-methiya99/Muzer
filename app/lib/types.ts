import { z } from 'zod'
export const CreateStreamSchema = z.object({
   creatorId: z.string(),
   url: z
      .string()
      .refine((val) => val.includes('youtube') || val.includes('spotify')),
})

export const UpVoteSchema = z.object({
   streamId: z.string(),
})
