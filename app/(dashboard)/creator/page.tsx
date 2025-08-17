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
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAddSpaceUserToSpaceMut } from '@/app/hooks/useAddUserToSpace'

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
   const { mutate: mutates } = useAddSpaceUserToSpaceMut()
   const router = useRouter()

   const handleCreateSpace = (data: SpaceFormData) => {
      mutate(data, {
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spaces'] })
         },
      })
   }

   const handleLogout = () => {
      signOut()
      router.push('/')
   }

   const navUserToSpace = (id: string) => {
      const spaceId = id
      mutates(spaceId, {
         onSuccess: () => {
            console.log('Navigated')
         },
      })
      router.push(`/creator/space/${spaceId}`)
   }
   useEffect(() => {}, [spaces])

   if (isLoading) return <div>Loading...</div>
   if (error) return <div>Something went wrong</div>
   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
         {/* Header */}
         {/* Enhanced Header */}
         <header className="relative border-b border-gray-200/20 dark:border-gray-700/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md top-0 z-50">
            {/* Gradient Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-indigo-500/5 dark:from-purple-400/10 dark:via-pink-400/10 dark:to-indigo-400/10"></div>

            {/* Static Background Pattern */}
            <div className="absolute inset-0 opacity-30">
               <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
               <div className="absolute top-0 right-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative container mx-auto px-6 py-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                     {/* Logo Section */}
                     <div className="relative group">
                        <Link
                           className="flex items-center justify-center"
                           href="#"
                        >
                           <div className="relative">
                              <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-lg"></div>
                           </div>
                           <span className="ml-3 text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                              Muzer
                           </span>
                        </Link>
                     </div>

                     {/* Dashboard Info */}
                     <div className="hidden md:block border-l border-gray-200 dark:border-gray-700 pl-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-1">
                           Streamer Dashboard
                        </h1>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                           <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              Manage your music spaces
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                     {/* Create Space Button */}
                     <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 group"
                     >
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="font-semibold">Create Space</span>
                     </Button>

                     {/* Logout Button */}
                     <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="relative overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-red-400 dark:hover:border-red-500 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 group hover:shadow-lg"
                     >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 opacity-0 group-hover:opacity-100"></div>
                        <span className="relative font-semibold">Logout</span>
                     </Button>
                  </div>
               </div>

               {/* Mobile Dashboard Title */}
               <div className="md:hidden mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-1">
                     Streamer Dashboard
                  </h1>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your music spaces
                     </p>
                  </div>
               </div>
            </div>

            {/* Bottom Glow Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
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
                     {spaces.map((space: Space) => (
                        <SpaceCard
                           key={space.id}
                           space={space}
                           onClick={() => {
                              navUserToSpace(space.id)
                           }}
                        />
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
