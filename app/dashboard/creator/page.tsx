'use client'
import { useState } from 'react'
import { Plus, Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SpaceCard } from '@/app/components/SpaceCard'
import { CreateSpaceModal } from '@/app/components/CreateSpaceModal'

interface Space {
   id: string
   name: string
   description: string
   genre: string
   isLive: boolean
   memberCount: number
   songCount: number
   createdAt: string
   thumbnail?: string
}

export default function StreamerDashboard() {
   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
   const [spaces, setSpaces] = useState<Space[]>([
      {
         id: '1',
         name: 'Chill Vibes Only',
         description: 'Relaxing music for study and work',
         genre: 'Lo-fi',
         isLive: true,
         memberCount: 47,
         songCount: 23,
         createdAt: '2024-01-15',
      },
      {
         id: '2',
         name: 'Weekend Bangers',
         description: 'High energy music for the weekend',
         genre: 'Electronic',
         isLive: false,
         memberCount: 129,
         songCount: 67,
         createdAt: '2024-01-10',
      },
      {
         id: '3',
         name: 'Indie Discoveries',
         description: 'Hidden gems and new indie artists',
         genre: 'Indie',
         isLive: true,
         memberCount: 85,
         songCount: 156,
         createdAt: '2024-01-08',
      },
   ])

   const handleCreateSpace = (
      spaceData: Omit<Space, 'id' | 'createdAt' | 'memberCount' | 'songCount'>
   ) => {
      const newSpace: Space = {
         ...spaceData,
         id: Date.now().toString(),
         createdAt: new Date().toISOString().split('T')[0],
         memberCount: 0,
         songCount: 0,
      }
      setSpaces([newSpace, ...spaces])
      setIsCreateModalOpen(false)
   }

   const totalMembers = spaces.reduce(
      (sum, space) => sum + space.memberCount,
      0
   )
   const totalSongs = spaces.reduce((sum, space) => sum + space.songCount, 0)
   const liveSpaces = spaces.filter((space) => space.isLive).length

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
         {/* Header */}
         <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-purple-500/10">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
                        Total Spaces
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {spaces.length}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-pink-500/10">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
                        Live Spaces
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-pink-500 dark:text-pink-400">
                        {liveSpaces}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-gray-200/20 dark:border-gray-700/20">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
                        Total Members
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {totalMembers}
                     </div>
                  </CardContent>
               </Card>

               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-gray-200/20 dark:border-gray-700/20">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400">
                        Total Songs
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {totalSongs}
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
                        {liveSpaces} Live
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
