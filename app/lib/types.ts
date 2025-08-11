import { z } from 'zod'
// export const CreateStreamSchema = z.object({
//    url: z.string(),
//    // .refine((val) => val.includes('youtube') || val.includes('spotify')),
// })

export const CreateStreamSchema = z
   .string()
   .refine((val) => val.includes('youtube') || val.includes('spotify'))

export const UpVoteSchema = z.object({
   streamId: z.string(),
})
