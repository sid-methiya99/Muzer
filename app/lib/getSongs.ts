import axios from 'axios'
import { getSession } from 'next-auth/react'

export async function refreshStreams(streamerId: string) {
   try {
      const res = await axios.get(`/api/spaces/stream?spaceId=${streamerId}`)
      const data = res.data.findSongs
      return data
   } catch (error) {
      console.error(error)
   }
}
