// In your usePlayNext hook file
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useMarkSongPlayed = (spaceId?: string) => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async ({
         songId,
         previousSongId,
      }: {
         songId: string
         previousSongId?: string
      }) => {
         const params = new URLSearchParams({ songId })
         if (previousSongId) {
            params.append('previousSongId', previousSongId)
         }

         const response = await fetch(`/api/spaces/stream/next?${params}`, {
            method: 'PUT',
         })

         if (!response.ok) {
            throw new Error('Failed to mark song as played')
         }

         return response.json()
      },
      onSuccess: () => {
         // Invalidate specific query with spaceId
         if (spaceId) {
            queryClient.invalidateQueries({ queryKey: ['streams', spaceId] })
            queryClient.refetchQueries({ queryKey: ['streams', spaceId] })
         } else {
            // Fallback to invalidate all streams queries
            queryClient.invalidateQueries({ queryKey: ['streams'] })
            queryClient.refetchQueries({ queryKey: ['streams'] })
         }
      },
   })
}
