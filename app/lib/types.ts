import { z } from 'zod'

export const CreateStreamSchema = z
   .string()
   .refine((val) => val.includes('youtube') || val.includes('spotify'))

export const UpVoteSchema = z.object({
   streamId: z.string(),
})

export type VoteParams = { id: string; isUpVote: boolean }

export interface Video {
   id: string
   title: string
   upVotes?: []
   url: string
   active: boolean
   type: 'Youtube'
   smallImg: string
   bigImg: string
   userId: string
   extractedId: string
   haveVoted: boolean
   upVote: number
}
