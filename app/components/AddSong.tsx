'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Music, Plus } from 'lucide-react'
import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

interface AddSongProps {
   inputLink: string
   setInputLink: (value: string) => void
   mutation: UseMutationResult<AxiosResponse<any>, Error, string, unknown>
}

export default function AddSong({
   inputLink,
   setInputLink,
   mutation,
}: AddSongProps) {
   return (
      <>
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
      </>
   )
}
