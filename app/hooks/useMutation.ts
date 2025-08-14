import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { VoteParams } from '../lib/types'

export function useAddSongMutation(setInputLink: (value: string) => void) {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: (url: string) =>
         axios.post('/api/streams', {
            data: { url },
         }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['streams'] })
         setInputLink('')
      },
   })
}

export function useVoteMutation(
   setQueue: React.Dispatch<React.SetStateAction<any[]>>
) {
   const queryClient = useQueryClient()

   return useMutation<void, Error, VoteParams>({
      mutationFn: ({ id, isUpVote }: VoteParams) => {
         return axios.post(`/api/streams/${isUpVote ? 'upvote' : 'downvote'}`, {
            data: { streamId: id },
         })
      },
      onMutate: ({ id, isUpVote }: VoteParams) => {
         setQueue((prevQueue) =>
            [...prevQueue]
               .map((video) =>
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
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['streams'] }),
   })
}
