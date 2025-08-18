'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Video } from '@/app/lib/types'
import Header from '@/app/components/StreamHeader'
import AddSong from '@/app/components/AddSong'
import QueueList from '@/app/components/QueueList'
import NowPlaying from '@/app/components/NowPlaying'
import { useAddSongMutation, useVoteMutation } from '../hooks/useMutations'
import { useStreams } from '../hooks/useStreams'
import { YouTubeEvent, YouTubeProps } from 'react-youtube'

export function StreamView({ spaceId }: { spaceId: string }) {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

   const { data: songs, isLoading, error } = useStreams(spaceId ?? '')
   const session = useSession()
   const router = useRouter()
   const addSongMutation = useAddSongMutation(setInputLink)
   const voteMutation = useVoteMutation(setQueue)
   // useEffect(() => {
   //    if (session.status === 'unauthenticated') {
   //       router.push('/')
   //    }
   // }, [session.status, router])
   //
   useEffect(() => {
      if (songs) {
         setQueue(songs)
      }
   }, [songs])

   const playNext = () => {
      if (queue.length > 0) {
         setCurrentVideo(queue[0])
         setQueue(queue.slice(1))
      }
   }

   const onStateChange: YouTubeProps['onStateChange'] = (
      event: YouTubeEvent
   ) => {
      if (event.data === window.YT.PlayerState.ENDED) {
         setCurrentVideo(queue[0])
         setQueue(queue.slice(1))
      }
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
         <Header spaceId={spaceId} />

         <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
            <AddSong
               url={inputLink}
               setInputLink={setInputLink}
               mutation={addSongMutation}
               isLoggedIn={session.data?.user.id ? true : false}
               spaceId={spaceId}
            />

            <div className="grid lg:grid-cols-3">
               <QueueList
                  queue={queue}
                  isLoading={isLoading}
                  onVote={voteMutation}
                  isLoggedIn={session.data?.user.id ? true : false}
               />

               <NowPlaying
                  currentVideo={currentVideo}
                  queue={queue}
                  onPlayNext={playNext}
                  onStateChange={onStateChange}
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
