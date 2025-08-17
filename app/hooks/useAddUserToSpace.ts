import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useAddSpaceUserToSpaceMut() {
   return useMutation({
      mutationFn: async (spaceId: string) => {
         try {
            const res = await axios.post('/api/spaces/join', {
               data: {
                  spaceId: spaceId,
               },
            })
         } catch (error) {
            console.error(error)
         }
      },
   })
}
