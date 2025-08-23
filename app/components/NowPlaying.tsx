'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Music, Play } from 'lucide-react'
import { Video } from '../lib/types'

import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube'
interface NowPlayingProps {
   currentVideo: Video | null
   queue: Video[]
   onPlayNext: () => void
   onStateChange: (event: YouTubeEvent) => void
}

export default function NowPlaying({
   currentVideo,
   queue,
   onPlayNext,
   onStateChange,
}: NowPlayingProps) {
   return (
      <div className="space-y-3 min-w-sm">
         <div className="w-full flex justify-center">
            <span className="text-3xl font-bold text-white space-x-3">
               Now Playing
            </span>
         </div>

         <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-lg border border-purple-400/30 shadow-2xl flex items-center justify-center">
            <CardContent>
               {currentVideo ? (
                  <div>
                     <div className="relative">
                        <YouTube
                           videoId={currentVideo.extractedId}
                           opts={{
                              playerVars: {
                                 autoplay: 1,
                                 controls: 0, // ⬅ hides controls
                                 modestbranding: 1, // optional: removes big YouTube logo
                                 rel: 0,
                              },
                              height: '300',
                              width: '450',
                           }}
                           onStateChange={onStateChange}
                        />
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
