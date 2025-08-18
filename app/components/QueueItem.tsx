'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { Video } from '../lib/types'
import { UseMutationResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

interface QueueItemProps {
   video: Video
   onVote: UseMutationResult<
      void,
      Error,
      { id: string; isUpVote: boolean },
      unknown
   >
   isLoggedIn: boolean
}

export default function QueueItem({
   video,
   onVote,
   isLoggedIn,
}: QueueItemProps) {
   const handleUnAuthVote = () => {
      toast.success('Please login to vote', {
         position: 'top-right',
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
      })
   }
   return (
      <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 py-1 max-w-2xl max-h-3xl">
         <div>
            <div className="flex items-center space-x-2 ">
               <div className="relative ">
                  <img
                     src={video.smallImg}
                     alt={video.title}
                     className="h-25 w-50 object-cover rounded mx-2 my-2"
                  />
               </div>
               <div className="flex-grow min-w-0 ">
                  <h3 className="font-semibold text-white text-md mb-2 overflow-clip whitespace-nowrap ml-2">
                     {video.title}
                  </h3>
                  <div className="flex items-center space-x-4 ml-2">
                     {isLoggedIn ? (
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() =>
                              onVote.mutate({
                                 id: video.id,
                                 isUpVote: !video.haveVoted,
                              })
                           }
                           className={`flex items-center space-x-2 ${
                              video.haveVoted
                                 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-400'
                                 : 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30 hover:border-red-400'
                           } transition-all duration-200`}
                        >
                           {video.haveVoted ? (
                              <ThumbsUp className="h-4 w-4" />
                           ) : (
                              <ThumbsDown className="h-4 w-4" />
                           )}
                           <span className="font-medium">{video.upVote}</span>
                        </Button>
                     ) : (
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={handleUnAuthVote}
                           className={`flex items-center space-x-2 ${
                              video.haveVoted
                                 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-400'
                                 : 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30 hover:border-red-400'
                           } transition-all duration-200`}
                        >
                           {video.haveVoted ? (
                              <ThumbsUp className="h-4 w-4" />
                           ) : (
                              <ThumbsDown className="h-4 w-4" />
                           )}
                           <span className="font-medium">{video.upVote}</span>
                        </Button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </Card>
   )
}
