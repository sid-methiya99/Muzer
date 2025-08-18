import { useQuery } from '@tanstack/react-query'
import { getSession } from 'next-auth/react'
import axios from 'axios'

export function useSpaces() {
   return useQuery({
      queryKey: ['spaces'],
      queryFn: async () => {
         const session = await getSession()

         if (!session?.accessToken) {
            throw new Error('No access token available')
         }

         const res = await axios.get(`/api/spaces`, {
            headers: {
               Authorization: `Bearer ${session.accessToken}`,
            },
         })

         const spaces = res.data.spaces ?? []
         const activeSpaces = res.data.totalLiveSpaces ?? 0
         return { spaces, activeSpaces }
      },
      select: (data) => ({
         spaces: data.spaces,
         totalLiveSpaces: data.activeSpaces,
      }),
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
   })
}
