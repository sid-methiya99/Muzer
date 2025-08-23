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
import { useMarkSongFinish, useMarkSongPlayed } from '../hooks/usePlayNext'
import { useQueryClient } from '@tanstack/react-query'

export function StreamView({ spaceId }: { spaceId: string }) {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentVideoId, setCurrentVideo] = useState<Video | null>(null)

   const { data, isLoading } = useStreams(spaceId ?? '')
   const session = useSession()
   const addSongMutation = useAddSongMutation(setInputLink)
   const voteMutation = useVoteMutation(setQueue)

   const [currentSongId, setCurrentSongId] = useState<string | null>(null)
   const [nextSong, setNextSong] = useState()
   const [previousSong, setPreviousSong] = useState<Video | null>(null)
   const markSongPlayed = useMarkSongPlayed()
   const markSongFinsih = useMarkSongFinish()

   useEffect(() => {
      if (data?.currentSongs) {
         setQueue(data.currentSongs)
      }
   }, [data?.currentSongs])

   const playNext = () => {
      if (queue.length === 0) return

      const currentSong = queue[0] // This will become the previous song
      console.log('Current songId: ', currentSong.id)
      markSongFinsih.mutate(currentSong.id)

      if (queue.length === 1) {
         setCurrentSongId(currentSong.id)
         markSongPlayed.mutate(currentSong.id)
         setCurrentVideo(currentSong)
         setPreviousSong(currentSong) // Store as previous
         setQueue([])
         return
      }

      if (queue.length > 1) {
         const nextSong = queue[1]
         console.log('Next Song Id: ', nextSong.id)
         setCurrentSongId(nextSong.id)
         setCurrentVideo(nextSong)
         markSongPlayed.mutate(nextSong.id)
         setPreviousSong(currentSong)
         console.log(previousSong?.id)
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
                  currentVideo={data?.currentPlayingSong}
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
