'use client'

import { StreamView } from '@/app/components/StreamView'
interface CreatorPageProps {
   params: {
      creatorId: string
   }
}
export default async function ({ params }: CreatorPageProps) {
   const slug = params.creatorId
   return <StreamView creatorId={slug} />
}
