'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Video } from '@/app/lib/types'
// import { useStreams } from '../hooks/useStreams'
// import { useAddSongMutation, useVoteMutation } from '../hooks/useMutation'
import Header from '@/app/components/StreamHeader'
import AddSong from '@/app/components/AddSong'
import QueueList from '@/app/components/QueueList'
import NowPlaying from '@/app/components/NowPlaying'

export default function Dashboard() {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

   const session = useSession()
   const creatorId = session.data?.user?.id
   const router = useRouter()

   // const { data: streams, isLoading, error } = useStreams(creatorId ?? '')
   // const addSongMutation = useAddSongMutation(setInputLink)
   // const voteMutation = useVoteMutation(setQueue)
   //
   useEffect(() => {
      if (session.status === 'unauthenticated') {
         router.push('/')
      }
   }, [session.status, router])

   useEffect(() => {
      if (streams) {
         setQueue(streams)
      }
   }, [streams])

   const playNext = () => {
      if (queue.length > 0) {
         setCurrentVideo(queue[0])
         setQueue(queue.slice(1))
      }
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
         <Header />

         <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
            <AddSong
               inputLink={inputLink}
               setInputLink={setInputLink}
               mutation={addSongMutation}
               isLoggedIn={true}
            />

            <div className="grid lg:grid-cols-3 gap-8">
               <QueueList
                  queue={queue}
                  isLoading={isLoading}
                  onVote={voteMutation}
               />

               <NowPlaying
                  currentVideo={currentVideo}
                  queue={queue}
                  onPlayNext={playNext}
               />
            </div>

            {/* Footer */}
            <div className="text-center py-8 text-gray-400">
               <p className="text-sm">
                  🎵 Powered by community votes • Made with ❤️
               </p>
            </div>
         </div>
      </div>
   )
}
