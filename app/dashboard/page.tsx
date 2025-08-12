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
import { refreshStreams } from '../lib/helper'
import axios from 'axios'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
   QueryClient,
   useMutation,
   useQuery,
   useQueryClient,
} from '@tanstack/react-query'
type VoteParams = { id: string; isUpVote: boolean }
interface Video {
   id: string
   title: string
   upVotes?: []
   url: string
   active: boolean
   type: 'Youtube'
   smallImg: string
   bigImg: string
   userId: string
   extractedId: string
   haveVoted: boolean
   upVote: number
}

export default function Dashboard() {
   const [inputLink, setInputLink] = useState('')
   const [queue, setQueue] = useState<Video[]>([])
   const [currentVideo, setCurrentVideo] = useState<Video | null>(null)
   const session = useSession()
   const router = useRouter()
   const {
      data: streams,
      isLoading,
      error,
   } = useQuery({
      queryKey: ['streams'],
      queryFn: async () => {
         const streams = await refreshStreams()
         return streams
      },
   })
   const queryClient = useQueryClient()

   useEffect(() => {
      if (session.status === 'unauthenticated') {
         router.push('/')
      }
   }, [session.status, router])

   const mutation = useMutation({
      mutationFn: (url: string) =>
         axios.post('/api/streams', {
            data: {
               url: url,
            },
         }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['streams'] })
         setInputLink('')
      },
   })

   async function getData() {
      setQueue(streams)
   }

   useEffect(() => {
      if (streams) {
         getData()
      }
   }, [streams])

   const handleVoteMutation = useMutation<void, Error, VoteParams>({
      mutationFn: ({ id, isUpVote }: VoteParams) => {
         return axios.post(`/api/streams/${isUpVote ? 'upvote' : 'downvote'}`, {
            data: { streamId: id },
         })
      },
      onMutate: ({ id, isUpVote }: VoteParams) => {
         setQueue((prevQueue) =>
            [...prevQueue] // clone before sorting
               .map((video) =>
                  video.id === id
                     ? {
                          ...video,
                          haveVoted: isUpVote,
                          upVote: isUpVote
                             ? video.upVote + 1
                             : video.upVote - 1,
                       }
                     : video
               )
               .sort((a, b) => b.upVote - a.upVote)
         )
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['streams'] }),
   })
   const playNext = () => {
      if (queue.length > 0) {
         setCurrentVideo(queue[0])
         setQueue(queue.slice(1))
      }
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
               <div className="flex items-center gap-2">
                  <button className="text-md font-medium text-white bg-purple-600 px-4 py-2 rounded-md cursor-pointer flex items-center gap-2">
                     <Share2 />
                     Share
                  </button>
                  {session.data?.user && (
                     <button
                        onClick={() => {
                           signOut()
                        }}
                        className="text-md font-medium  text-white  bg-purple-600 px-4 py-2 rounded-md cursor-pointer"
                     >
                        Logout
                     </button>
                  )}
               </div>
            </nav>
         </header>

         <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
            {/* Add Song Section */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:shadow-purple-500/20 py-2">
               <CardContent className="p-3">
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
                        disabled={mutation.isPending}
                        onClick={() => mutation.mutate(inputLink)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                     >
                        <Plus className="mr-2 h-5 w-5" />
                        {mutation.isPending ? 'Loading ...' : 'Add to Queue'}
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
                  </div>
                  {!isLoading ? (
                     <div className="space-y-2 ">
                        {queue.map((video) => (
                           <Card
                              key={video.id}
                              className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 py-2"
                           >
                              <CardContent className="p-2 ">
                                 <div className="flex items-center space-x-2">
                                    <div className="relative">
                                       <img
                                          src={video.smallImg}
                                          className="h-20 w-40 object-cover"
                                       />
                                    </div>
                                    <div className="flex-grow min-w-0 ">
                                       <h3 className="font-semibold text-white text-md truncate mb-2">
                                          {video.title}
                                       </h3>
                                       <div className="flex items-center space-x-4">
                                          <Button
                                             variant="outline"
                                             size="sm"
                                             onClick={() =>
                                                handleVoteMutation.mutate({
                                                   id: video.id,
                                                   isUpVote: !video.haveVoted,
                                                })
                                             }
                                             className={`flex items-center space-x-2 ${video.haveVoted ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-400' : 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30 hover:border-red-400'} transition-all duration-200`}
                                          >
                                             {video.haveVoted ? (
                                                <ThumbsUp className="h-4 w-4" />
                                             ) : (
                                                <ThumbsDown className="h-4 w-4" />
                                             )}
                                             <span className="font-medium">
                                                {video.upVote}
                                             </span>
                                          </Button>
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
                  ) : (
                     <div className="text-center py-12 text-gray-400">
                        <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-xl">Loading songs</p>
                     </div>
                  )}
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
