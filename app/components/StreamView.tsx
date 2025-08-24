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
import { useMarkSongPlayed } from '../hooks/usePlayNext'
import { da } from 'zod/v4/locales'

export function StreamView({ spaceId }: { spaceId: string }) {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentlyPlayingSongId, setCurrentlyPlayingSongId] = useState<
      string | null
   >(null)
   const { data, isLoading } = useStreams(spaceId ?? '')
   const session = useSession()
   const addSongMutation = useAddSongMutation(setInputLink)
   const voteMutation = useVoteMutation(setQueue)
   const markSongPlayed = useMarkSongPlayed()

   useEffect(() => {
      if (data?.currentSongs) {
         setQueue(data.currentSongs)
      }
      // Track the currently playing song
      if (data?.currentPlayingSong) {
         console.log(data.currentPlayingSong)
         setCurrentlyPlayingSongId(data.currentPlayingSong.id)
      }
   }, [data?.currentSongs, data?.currentPlayingSong])

   const playNext = () => {
      if (queue.length === 0) return

      const currentSong = queue[0] // The song that's currently at the top of queue
      console.log('Playing song: ', currentSong.id)

      // Mark this song as played and currently playing
      markSongPlayed.mutate({
         songId: currentSong.id,
         previousSongId: currentlyPlayingSongId || undefined,
      })

      // Update component state
      setCurrentlyPlayingSongId(currentSong.id)

      // Remove the played song from the queue
      setQueue((prevQueue) => prevQueue.slice(1))

      console.log('Remaining queue length:', queue.length - 1)
   }

   const onStateChange: YouTubeProps['onStateChange'] = (
      event: YouTubeEvent
   ) => {
      if (event.data === window.YT.PlayerState.ENDED) {
         // When a song ends, play the next one
         playNext()
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
                  currentVideo={data?.currentPlayingSong} // Pass the actual currently playing song
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
