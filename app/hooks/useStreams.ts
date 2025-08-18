import { useQuery } from '@tanstack/react-query'
import { refreshStreams } from '../lib/getSongs'

export function useStreams(streamerId?: string) {
   return useQuery({
      queryKey: ['songs', streamerId],
      queryFn: async () => {
         if (!streamerId) return []

         return await refreshStreams(streamerId)
      },
      enabled: !!streamerId, // ⬅ don’t run until streamerId is truthy
      refetchInterval: 3000,
   })
}
