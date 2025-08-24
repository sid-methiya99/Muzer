'use client'
import { useState } from 'react'
import { Music, Users, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock data for live spaces
const mockLiveSpaces = [
   {
      id: '1',
      title: 'Chill Music Session',
      description:
         'Relaxing music for studying and working. Join us for some peaceful vibes.',
      streamerName: 'MusicLover123',
      isActive: true,
      createdAt: '2025-01-15',
      listeners: 47,
      streamerId: 'streamer1',
   },
   {
      id: '2',
      title: 'Party Hits Live',
      description:
         'High energy music to get you pumped up! Perfect for workouts.',
      streamerName: 'PartyDJ',
      isActive: true,
      createdAt: '2025-01-14',
      listeners: 89,
      streamerId: 'streamer2',
   },
   {
      id: '3',
      title: 'Acoustic Sessions',
      description: 'Live acoustic performances and covers from indie artists.',
      streamerName: 'AcousticVibes',
      isActive: true,
      createdAt: '2025-01-13',
      listeners: 23,
      streamerId: 'streamer3',
   },
   {
      id: '4',
      title: 'Late Night Radio',
      description:
         'Smooth tunes for late night listening. Perfect background music.',
      streamerName: 'NightOwl',
      isActive: true,
      createdAt: '2025-01-12',
      listeners: 156,
      streamerId: 'streamer4',
   },
]

const SpaceCard = ({ space, onClick }) => {
   return (
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {space.title}
               </CardTitle>
               <div className="flex items-center gap-2">
                  <Badge className="bg-red-500 text-white">
                     <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                     LIVE
                  </Badge>
               </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
               <span>by {space.streamerName}</span>
               <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{space.listeners} listening</span>
               </div>
            </div>
         </CardHeader>
         <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
               {space.description}
            </p>
            <Button
               onClick={onClick}
               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
               <Play className="w-4 h-4 mr-2" />
               Join Space
            </Button>
         </CardContent>
      </Card>
   )
}

export default function UserDashboard() {
   const joinSpace = (spaceId) => {
      // Navigate to space
      console.log(`Joining space ${spaceId}`)
   }

   const handleLogout = () => {
      // Handle logout
      console.log('Logging out')
   }

   const totalListeners = mockLiveSpaces.reduce(
      (sum, space) => sum + space.listeners,
      0
   )

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
         {/* Header */}
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
                        <a className="flex items-center justify-center cursor-pointer">
                           <div className="relative">
                              <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-lg"></div>
                           </div>
                           <span className="ml-3 text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                              Muzer
                           </span>
                        </a>
                     </div>
                     {/* Dashboard Info */}
                     <div className="hidden md:block border-l border-gray-200 dark:border-gray-700 pl-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-1">
                           Live Spaces
                        </h1>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                           <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              Discover live music streams
                           </p>
                        </div>
                     </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
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
                     Live Spaces
                  </h1>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        Discover live music streams
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
                        Live Spaces
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl text-center font-bold text-purple-600 dark:text-purple-400">
                        {mockLiveSpaces.length}
                     </div>
                  </CardContent>
               </Card>
               <Card className="bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 border border-pink-500/10 w-36">
                  <CardHeader className="pb-2">
                     <CardTitle className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Total Listeners
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="text-3xl font-bold text-pink-500 dark:text-pink-400 text-center">
                        {totalListeners}
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Spaces Grid */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                     Live Spaces
                  </h2>
                  <div className="flex items-center gap-2">
                     <Badge
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                     >
                        {mockLiveSpaces.length} Live
                     </Badge>
                  </div>
               </div>

               {mockLiveSpaces.length === 0 ? (
                  <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900">
                     <CardContent className="flex flex-col items-center justify-center py-16">
                        <Music className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                           No live spaces
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6 text-center max-w-md">
                           There are no live music spaces at the moment. Check
                           back later to discover new streams.
                        </p>
                     </CardContent>
                  </Card>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {mockLiveSpaces.map((space) => (
                        <SpaceCard
                           key={space.id}
                           space={space}
                           onClick={() => joinSpace(space.id)}
                        />
                     ))}
                  </div>
               )}
            </div>
         </main>
      </div>
   )
}
