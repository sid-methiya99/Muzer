import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useStreams(streamerId?: string) {
   return useQuery({
      queryKey: ['songs', streamerId],
      queryFn: async () => {
         if (!streamerId) return []

         const res = await axios.get(`/api/spaces/stream?spaceId=${streamerId}`)
         return res.data
      },
      select: (res) => ({
         currentSongs: res.findSongs ?? [],
         currentPlayingSong: res.findCurrentPlayingSongs ?? {},
      }),
      enabled: !!streamerId, // ⬅ don’t run until streamerId is truthy
   })
}
