import {
   useMutation,
   useQueryClient,
   UseMutationResult,
} from '@tanstack/react-query'
import axios, { AxiosResponse, AxiosError } from 'axios'
import { Video, VoteParams } from '../lib/types'

// Define your types
export interface AddSongData {
   url: string
   spaceId: string
}

export function useAddSongMutation(
   setInputLink: (value: string) => void
): UseMutationResult<AxiosResponse<any>, AxiosError, AddSongData, unknown> {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async ({
         url,
         spaceId,
      }: AddSongData): Promise<AxiosResponse<any>> => {
         const res = await axios.post<any>('/api/spaces/stream', {
            data: { url, spaceId },
         })
         console.log(res)
         return res.data // Return the response for better type safety
      },
      onSuccess: (data) => {
         console.log('Added stream successfully', data.data)
         setInputLink('')
         queryClient.invalidateQueries({ queryKey: ['songs'] })
      },
      onError: (error: AxiosError) => {
         console.error(
            'Failed to add song:',
            error.response?.data || error.message
         )
      },
   })
}

export function useVoteMutation(
   setQueue: React.Dispatch<React.SetStateAction<any[]>>
) {
   const queryClient = useQueryClient()

   return useMutation<void, Error, VoteParams>({
      mutationFn: ({ id, isUpVote }: VoteParams) => {
         return axios.post(
            `/api/spaces/stream/${isUpVote ? 'upvote' : 'downvote'}`,
            {
               data: { songId: id },
            }
         )
      },
      onMutate: ({ id, isUpVote }: VoteParams) => {
         setQueue((prevQueue) =>
            [...prevQueue]
               .map((video: Video) =>
                  video.id === id
                     ? {
                          ...video,
                          haveVoted: isUpVote,
                          upVote: isUpVote
                             ? video.upVote + 1
                             : video.upVote - 1,
                       }
                     : video
               )
               .sort((a, b) => b.upVote - a.upVote)
         )
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['songs'] }),
   })
}
