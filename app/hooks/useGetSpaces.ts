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

         const spaces = res.data.spaces
         return spaces || [] // Return empty array if spaces is undefined
      },
      // Optional: Add some configuration
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
   })
}
