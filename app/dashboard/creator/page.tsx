'use client'
import { useEffect, useState } from 'react'
import { Plus, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SpaceCard } from '@/app/components/SpaceCard'
import {
   CreateSpaceModal,
   SpaceFormData,
} from '@/app/components/CreateSpaceModal'
import { useQueryClient } from '@tanstack/react-query'
import { useAddSpaceMutation } from '@/app/hooks/useAddSpace'
import { useSpaces } from '@/app/hooks/useGetSpaces'

export interface Space {
   id: string
   title: string
   description: string
   isActive: boolean
   createdAt: string
   streamerId: string
}

export default function StreamerDashboard() {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
   const queryClient = useQueryClient()
   const { data: spaces, isLoading, error } = useSpaces()
   const { mutate } = useAddSpaceMutation()

   const handleCreateSpace = (data: SpaceFormData) => {
      console.log('From user dahsboard: ', data)
      mutate(data, {
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spaces'] })
         },
      })
   }
   useEffect(() => {
      console.log('Space from backend: ', spaces)
   }, [spaces])

   if (isLoading) return <div>Loading...</div>
   if (error) return <div>Something went wrong</div>
   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
         {/* Header */}
         <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm top-0 z-10">
            <div className="container mx-auto px-6 py-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                        <Music className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                           Streamer Dashboard
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                           Manage your music spaces
                        </p>
                     </div>
                  </div>
                  <Button
                     onClick={() => setIsCreateModalOpen(true)}
                     className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                  >
                     <Plus className="w-4 h-4 mr-2" />
                     Create Space
                  </Button>
               </div>
            </div>
         </header>

         <main className="container mx-auto px-6 py-8">
            {/* Stats Cards */}
            <div className="flex items-center justify-center gap-2 w-full ">
               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-purple-500/10 w-36">
                  <CardHeader className="pb-2 ">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Total Spaces
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl text-center font-bold text-purple-600 dark:text-purple-400">
                        {spaces.length}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-pink-500/10 w-36">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Live Spaces
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-pink-500 dark:text-pink-400 text-center">
                        0
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Spaces Grid */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                     Your Spaces
                  </h2>
                  <div className="flex items-center gap-2">
                     <Badge
                        variant="secondary"
                        className="bg-pink-100 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
                     >
                        {/* {liveSpaces} Live */}
                     </Badge>
                     <Badge
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                     >
                        {spaces.length} Total
                     </Badge>
                  </div>
               </div>

               {spaces.length === 0 ? (
                  <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900">
                     <CardContent className="flex flex-col items-center justify-center py-16">
                        <Music className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                           No spaces yet
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6 text-center max-w-md">
                           Create your first music space where fans can share
                           their favorite songs and discover new music together.
                        </p>
                        <Button
                           onClick={() => setIsCreateModalOpen(true)}
                           className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                        >
                           <Plus className="w-4 h-4 mr-2" />
                           Create Your First Space
                        </Button>
                     </CardContent>
                  </Card>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {spaces.map((space) => (
                        <SpaceCard key={space.id} space={space} />
                     ))}
                  </div>
               )}
            </div>
         </main>

         <CreateSpaceModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateSpace}
         />
      </div>
   )
}
