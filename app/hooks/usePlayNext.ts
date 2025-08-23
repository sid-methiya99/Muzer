import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useMarkSongPlayed() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (songId: string) => {
         const res = await axios.put(`/api/spaces/stream/next?songId=${songId}`)
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['songs'] })
         console.log('Marked song as played')
      },
   })
}
export function useMarkSongFinish() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (songId: string) => {
         const res = await axios.put(
            `/api/spaces/stream/finish?songId=${songId}`
         )
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['songs'] })
         console.log('Marked song as played')
      },
   })
}
