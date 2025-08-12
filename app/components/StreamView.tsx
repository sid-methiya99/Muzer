'use client'

import { useEffect, useState } from 'react'
import { Video } from '../lib/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useStreams } from '../hooks/useStreams'
import { useAddSongMutation, useVoteMutation } from '../hooks/useMutation'
import Header from './DashboardHeader'
import AddSong from './AddSong'
import QueueList from './QueueList'
import NowPlaying from './NowPlaying'
import { AppBar } from './AppBar'
interface Creator {
   creatorId: string
}
export function StreamView({ creatorId }: Creator) {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

   const session = useSession()
   const router = useRouter()

   const { data: streams, isLoading, error } = useStreams(creatorId ?? '')
   const addSongMutation = useAddSongMutation(setInputLink)
   const voteMutation = useVoteMutation(setQueue)

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
         <AppBar />

         <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
            <AddSong
               inputLink={inputLink}
               setInputLink={setInputLink}
               mutation={addSongMutation}
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
