// hooks/useCurrentSong.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Video } from '../lib/types'

export function useCurrentSong(songId?: string) {
   return useQuery<Video>({
      queryKey: ['currentSong', songId],
      queryFn: async () => {
         const res = await axios.get(
            `/api/spaces/stream/current?songId=${songId}`
         )
         return res.data.currentPlayingSong
      },
      enabled: !!songId,
      refetchInterval: 3000, // ⬅ polling (3s), keeps both tabs in sync
   })
}

export function useMarkSongPlayed() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (songId: string) => {
         const res = await axios.patch(
            `/api/spaces/stream/next?songId=${songId}`
         )
         return res.data.currentPlayingSong
      },
      onSuccess: (data) => {
         // ⬅ invalidate to sync across tabs
         queryClient.invalidateQueries({ queryKey: ['currentSong', data.id] })
      },
   })
}
