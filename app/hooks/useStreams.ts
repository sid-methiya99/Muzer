import { useQuery } from '@tanstack/react-query'
import { refreshStreams } from '../lib/helper'

export function useStreams(creatorId?: string) {
   return useQuery({
      queryKey: ['streams', creatorId],
      queryFn: async () => {
         if (!creatorId) return []
         return refreshStreams(creatorId)
      },
      enabled: !!creatorId, // ⬅ don’t run until creatorId is truthy
   })
}
