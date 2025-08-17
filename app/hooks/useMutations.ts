import {
   useMutation,
   useQueryClient,
   UseMutationResult,
} from '@tanstack/react-query'
import axios, { AxiosResponse, AxiosError } from 'axios'

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
         // Invalidate relevant queries
      },
      onError: (error: AxiosError) => {
         console.error(
            'Failed to add song:',
            error.response?.data || error.message
         )
      },
   })
}

// Usage example:
// const mutation = useAddSongMutation(setInputLink)
// mutation.mutate({ url: 'song-url', spaceId: 'space-123' })
