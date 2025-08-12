import { useQuery } from '@tanstack/react-query'
import { refreshStreams } from '../lib/helper'

export function useStreams() {
   return useQuery({
      queryKey: ['streams'],
      queryFn: async () => {
         const streams = await refreshStreams()
         return streams
      },
   })
}
