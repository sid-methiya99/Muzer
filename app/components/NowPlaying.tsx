'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Music, Play, Heart } from 'lucide-react'
import { Video } from '../lib/types'

interface NowPlayingProps {
   currentVideo: Video | null
   queue: Video[]
   onPlayNext: () => void
}

export default function NowPlaying({
   currentVideo,
   queue,
   onPlayNext,
}: NowPlayingProps) {
   return (
      <div className="space-y-6">
         <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <span>Now Playing</span>
            {currentVideo && (
               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            )}
         </h2>

         <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-lg border border-purple-400/30 shadow-2xl">
            <CardContent className="p-6">
               {currentVideo ? (
                  <div className="space-y-6">
                     <div className="relative">
                        <div className="w-full h-48 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                           <Music className="h-16 w-16 text-white/80 z-10" />
                           <div className="absolute inset-0 bg-black/20"></div>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        <div className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center space-x-1 shadow-lg">
                           <div className="w-2 h-2 bg-white rounded-full"></div>
                           <span>LIVE</span>
                        </div>
                     </div>
                     <div className="text-center space-y-3">
                        <h3 className="font-bold text-white text-lg">
                           {currentVideo.title}
                        </h3>
                        <div className="flex justify-center space-x-6 text-sm">
                           <div className="flex items-center space-x-1 text-emerald-400">
                              <Heart className="h-4 w-4 fill-current" />
                              <span>{currentVideo.upVotes}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div className="text-center py-12 space-y-4">
                     <div className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <Music className="h-12 w-12 text-gray-400" />
                     </div>
                     <div className="space-y-2">
                        <p className="text-gray-300 text-lg font-medium">
                           No song playing
                        </p>
                        <p className="text-gray-500 text-sm">
                           Add songs to the queue and hit play!
                        </p>
                     </div>
                  </div>
               )}
            </CardContent>
         </Card>

         <Button
            onClick={onPlayNext}
            disabled={queue.length === 0}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:cursor-not-allowed"
         >
            <Play className="mr-2 h-5 w-5" />
            Play Next {queue.length > 0 && `(${queue.length} in queue)`}
         </Button>
      </div>
   )
}
