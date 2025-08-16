'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Redirect() {
   const session = useSession()
   const router = useRouter()
   useEffect(() => {
      if (session.data?.user.role === 'Streamer') {
         router.push('/dashboard/creator')
      } else if (session.data?.user.role === 'EndUser') {
         router.push('/dashboard/user')
      }
   }, [])
   return null
}
