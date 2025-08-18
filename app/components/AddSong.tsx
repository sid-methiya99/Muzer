'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Music, Plus } from 'lucide-react'
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { AddSongData } from '../hooks/useMutations'

interface AddSongProps {
   url: string
   setInputLink: (value: string) => void
   mutation?: UseMutationResult<
      AxiosResponse<any>,
      AxiosError,
      AddSongData,
      unknown
   >
   isLoggedIn: boolean
   spaceId: string
}

export default function AddSong({
   url,
   setInputLink,
   mutation,
   isLoggedIn,
   spaceId,
}: AddSongProps) {
   const handleUnAuthSubmit = () => {
      toast.success('Please login to add link', {
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
      <div>
         {/* Add Song Section */}
         <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 hover:shadow-purple-500/20 py-2">
            <CardContent className="p-3">
               <div className="space-y-4">
                  <div className="relative">
                     <Input
                        type="text"
                        placeholder="🎵 Paste YouTube link here..."
                        value={url}
                        onChange={(e) => setInputLink(e.target.value)}
                        className="bg-black/20 text-white border-white/30 placeholder-gray-300 text-lg py-6 px-4 rounded-xl focus:border-purple-400 mt-2 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
                     />
                  </div>
                  {!isLoggedIn ? (
                     <Button
                        onClick={handleUnAuthSubmit}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                     >
                        <Plus className="mr-2 h-5 w-5" />
                        Add to Queue
                     </Button>
                  ) : (
                     <Button
                        disabled={mutation?.isPending}
                        onClick={() => mutation?.mutate({ url, spaceId })}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                     >
                        <Plus className="mr-2 h-5 w-5" />
                        {mutation?.isPending ? 'Loading ...' : 'Add to Queue'}
                     </Button>
                  )}
               </div>
               <ToastContainer />
            </CardContent>
         </Card>
      </div>
   )
}
