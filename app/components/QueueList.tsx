'use client'

import { Music } from 'lucide-react'
import QueueItem from './QueueItem'
import { UseMutationResult } from '@tanstack/react-query'
import { Video } from '../lib/types'

interface QueueListProps {
   queue: Video[]
   isLoading?: boolean
   onVote: UseMutationResult<
      void,
      Error,
      { id: string; isUpVote: boolean },
      unknown
   >
   isLoggedIn: boolean
}

export default function QueueList({
   queue,
   isLoading,
   onVote,
   isLoggedIn,
}: QueueListProps) {
   return (
      <div className="lg:col-span-2 space-y-6 max-w-2xl ">
         <div className="space-x-3 justify-center">
            <h2 className="text-3xl font-bold text-white max-w-xl">
               Upcoming Songs
            </h2>
         </div>

         {!isLoading ? (
            <div className="space-y-2 flex-col ">
               {queue.map((video) => (
                  <QueueItem
                     key={video.id}
                     video={video}
                     onVote={onVote}
                     isLoggedIn={isLoggedIn}
                  />
               ))}
               {queue.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                     <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
                     <p className="text-xl">No songs in queue</p>
                     <p>Add some tracks to get started!</p>
                  </div>
               )}
            </div>
         ) : (
            <div className="text-center py-12 text-gray-400">
               <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
               <p className="text-xl">Loading songs</p>
            </div>
         )}
      </div>
   )
}
