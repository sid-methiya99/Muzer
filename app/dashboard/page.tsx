'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
   Play,
   ThumbsDown,
   ThumbsUp,
   Music,
   Plus,
   Sparkles,
   Heart,
   Share2,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUserId, refreshStreams } from '../lib/helper'
import axios from 'axios'
// Add all types of video here
interface Video {
   id: string
   title: string
   upVotes: number
   downVotes: number
}

export default function Dashboard() {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentVideo, setCurrentVideo] = useState<Video | null>(null)

   const handleSubmit = async () => {
      console.log(inputLink)
      const sendVideoLink = axios.post('/api/streams', {
         data: {
            url: inputLink,
         },
      })
      const newVideo: Video = {
         id: String(Date.now()),
         title: `New Song ${queue.length + 1}`,
         upVotes: 0,
         downVotes: 0,
      }
      setQueue([...queue, newVideo])
      setInputLink('')
   }

   async function getData() {
      const data = await refreshStreams()
      console.log(data.streams)
   }
   useEffect(() => {
      getData()
   }, [handleSubmit])

   const handleVote = (id: string, isUpVote: boolean) => {
      setQueue(
         queue
            .map((video) =>
               video.id === id
                  ? {
                       ...video,
                       upVotes: isUpVote ? video.upVotes + 1 : video.upVotes,
                       downVotes: !isUpVote
                          ? video.downVotes + 1
                          : video.downVotes,
                    }
                  : video
            )
            .sort((a, b) => b.upVotes - b.downVotes - (a.upVotes - a.downVotes))
      )

      axios.get('/api/streams/upvote', {
         data: {
            streamId: id,
         },
      })
   }

   const playNext = () => {
      if (queue.length > 0) {
         setCurrentVideo(queue[0])
         setQueue(queue.slice(1))
      }
   }

   const getScoreColor = (upVotes: number, downVotes: number) => {
      const score = upVotes - downVotes
      if (score > 5) return 'text-emerald-400'
      if (score > 0) return 'text-blue-400'
      if (score === 0) return 'text-gray-400'
      return 'text-red-400'
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
         {/* Header */}
         <header className="mx-5 px-4 lg:px-6 h-14 flex items-center relative z-20">
            <nav className="flex justify-between w-full mt-4">
               <div className="flex items-center justify-center">
                  <Music className="h-6 w-6 text-purple-600" />
                  <span className="ml-2 text-2xl font-bold text-purple-400">
                     Muzer
                  </span>
               </div>

               <button className="text-md font-medium text-white bg-purple-600 px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
                  <Share2 />
                  Share
               </button>
            </nav>
         </header>

         {/* Static background elements */}
         <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl"></div>
         </div>

         <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 py-8">
               <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl">
                     <Music className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                     Music Queue
                  </h1>
                  <Sparkles className="h-8 w-8 text-yellow-400" />
               </div>
               <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Add your favorite tracks and let the community decide what
                  plays next
               </p>
            </div>

            {/* Add Song Section */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:shadow-purple-500/20">
               <CardContent className="p-6">
                  <div className="space-y-4">
                     <div className="relative">
                        <Input
                           type="text"
                           placeholder="🎵 Paste YouTube link here..."
                           value={inputLink}
                           onChange={(e) => setInputLink(e.target.value)}
                           className="bg-black/20 text-white border-white/30 placeholder-gray-300 text-lg py-6 px-4 rounded-xl focus:border-purple-400 mt-2 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                        />
                     </div>
                     <Button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                     >
                        <Plus className="mr-2 h-5 w-5" />
                        Add to Queue
                     </Button>
                  </div>
               </CardContent>
            </Card>

            {/* Preview Card */}
            {inputLink && (
               <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-lg border border-blue-400/30 shadow-2xl">
                  <CardContent className="p-6">
                     <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
                           <Music className="h-8 w-8 text-white" />
                        </div>
                        <div>
                           <p className="text-xl font-semibold text-white mb-1">
                              Preview Ready
                           </p>
                           <p className="text-blue-300">
                              Song will be added to queue
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
               {/* Queue Section */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center space-x-3">
                     <h2 className="text-3xl font-bold text-white">
                        Upcoming Songs
                     </h2>
                     <div className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm font-medium border border-purple-400/30">
                        {queue.length} tracks
                     </div>
                  </div>

                  <div className="space-y-4">
                     {queue.map((video, index) => (
                        <Card
                           key={video.id}
                           className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                        >
                           <CardContent className="p-6">
                              <div className="flex items-center space-x-4">
                                 <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                       <Music className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                                       {index + 1}
                                    </div>
                                 </div>
                                 <div className="flex-grow min-w-0">
                                    <h3 className="font-semibold text-white text-lg truncate mb-2">
                                       {video.title}
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                             handleVote(video.id, true)
                                          }
                                          className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-400 transition-all duration-200"
                                       >
                                          <ThumbsUp className="h-4 w-4" />
                                          <span className="font-medium">
                                             {video.upVotes}
                                          </span>
                                       </Button>
                                       <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                             handleVote(video.id, false)
                                          }
                                          className="flex items-center space-x-2 bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30 hover:border-red-400 transition-all duration-200"
                                       >
                                          <ThumbsDown className="h-4 w-4" />
                                          <span className="font-medium">
                                             {video.downVotes}
                                          </span>
                                       </Button>
                                       <div className="flex items-center space-x-2">
                                          <span className="text-gray-400 text-sm">
                                             Score:
                                          </span>
                                          <span
                                             className={`text-sm font-bold ${getScoreColor(video.upVotes, video.downVotes)}`}
                                          >
                                             {video.upVotes - video.downVotes}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))}
                     {queue.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                           <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
                           <p className="text-xl">No songs in queue</p>
                           <p>Add some tracks to get started!</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Now Playing Section */}
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
                                    <div className="flex items-center space-x-1 text-red-400">
                                       <ThumbsDown className="h-4 w-4" />
                                       <span>{currentVideo.downVotes}</span>
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
                     onClick={playNext}
                     disabled={queue.length === 0}
                     className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:cursor-not-allowed"
                  >
                     <Play className="mr-2 h-5 w-5" />
                     Play Next{' '}
                     {queue.length > 0 && `(${queue.length} in queue)`}
                  </Button>
               </div>
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
