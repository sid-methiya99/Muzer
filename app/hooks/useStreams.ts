// In your useStreams hook file
import { useQuery } from '@tanstack/react-query'

export const useStreams = (spaceId: string) => {
   return useQuery({
      queryKey: ['streams', spaceId],
      queryFn: async () => {
         const response = await fetch(`/api/spaces/stream?spaceId=${spaceId}`)
         if (!response.ok) {
            throw new Error('Failed to fetch streams')
         }
         const data = await response.json()

         return {
            currentSongs: data.findSongs || [],
            currentPlayingSong: data.currentPlayingSong || null,
         }
      },
      enabled: !!spaceId,
      // Remove refetchInterval since we're using optimistic updates
   })
}
