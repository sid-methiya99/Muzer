import axios from 'axios'
import { getSession } from 'next-auth/react'

export async function refreshStreams() {
   console.log('COntrol reacing here')
   try {
      const session = await getSession()
      const res = await axios.get(`/api/streams/my`, {
         headers: {
            Authorization: `Bearer ${session?.accessToken}`,
         },
      })

      console.log(res.data)
      console.log(session?.accessToken)
   } catch (error) {
      console.error(error)
   }

   console.log('COntrol reacing here')
}
