import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { SpaceFormData } from '../components/CreateSpaceModal'

export function useAddSpaceMutation() {
   return useMutation({
      mutationFn: async (data: SpaceFormData) => {
         try {
            const res = await axios.post('/api/spaces', {
               data: data,
            })
         } catch (error) {
            console.error(error)
         }
      },
   })
}
