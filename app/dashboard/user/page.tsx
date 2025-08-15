'use client'
import React, { useState, useEffect } from 'react'
import {
   Search,
   Music,
   Users,
   Clock,
   Radio,
   Play,
   Heart,
   Share2,
} from 'lucide-react'

// Mock data for live creators
const mockCreators = [
   {
      id: 1,
      name: 'DJ Luna',
      avatar:
         'https://images.unsplash.com/photo-1494790108755-2616c1f1d511?w=150&h=150&fit=crop&crop=faces',
      isLive: true,
      currentSong: 'Electric Dreams',
      artist: 'Neon Vibes',
      viewers: 1247,
      queueLength: 15,
      genre: 'Electronic',
      followers: 8542,
   },
   {
      id: 2,
      name: 'Acoustic Alex',
      avatar:
         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      isLive: true,
      currentSong: 'Midnight Coffee',
      artist: 'Alex Rodriguez',
      viewers: 892,
      queueLength: 8,
      genre: 'Acoustic',
      followers: 5633,
   },
   {
      id: 3,
      name: 'Beats Baron',
      avatar:
         'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
      isLive: true,
      currentSong: 'Urban Nights',
      artist: 'City Sounds',
      viewers: 2156,
      queueLength: 23,
      genre: 'Hip-Hop',
      followers: 12784,
   },
   {
      id: 4,
      name: 'Melody Rose',
      avatar:
         'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
      isLive: true,
      currentSong: 'Golden Hour',
      artist: 'Rose Garden',
      viewers: 654,
      queueLength: 12,
      genre: 'Indie',
      followers: 4321,
   },
   {
      id: 5,
      name: 'Synth Master',
      avatar:
         'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
      isLive: true,
      currentSong: 'Neon Pulse',
      artist: 'Digital Dreams',
      viewers: 1789,
      queueLength: 18,
      genre: 'Synthwave',
      followers: 9876,
   },
   {
      id: 6,
      name: 'Jazz Jenna',
      avatar:
         'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=150&h=150&fit=crop&crop=faces',
      isLive: true,
      currentSong: 'Blue Moon Serenade',
      artist: 'Midnight Jazz Quartet',
      viewers: 432,
      queueLength: 7,
      genre: 'Jazz',
      followers: 3654,
   },
]

// Live Status Component
const LiveStatus = ({ isLive }: { isLive: boolean }) => {
   if (!isLive) return null

   return (
      <div className="flex items-center gap-2">
         <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
         <span className="bg-pink-500/20 text-pink-500 border border-pink-500/30 text-xs font-medium px-2 py-0.5 rounded">
            LIVE
         </span>
      </div>
   )
}

// Creator Card Component
const CreatorCard = ({
   creator,
   onViewSpace,
}: {
   creator: any
   onViewSpace: (id: number) => void
}) => {
   const [isHovered, setIsHovered] = useState(false)

   return (
      <div
         className="bg-gradient-to-br from-slate-800/90 to-purple-800/50 border border-white/10 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer group backdrop-blur-sm p-6 space-y-4"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={() => onViewSpace(creator.id)}
      >
         {/* Header with Avatar and Live Status */}
         <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <img
                     src={creator.avatar}
                     alt={creator.name}
                     className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/20"
                  />
                  {creator.isLive && (
                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full border-2 border-slate-900" />
                  )}
               </div>
               <div>
                  <h3 className="font-semibold text-lg text-white">
                     {creator.name}
                  </h3>
                  <p className="text-sm text-slate-400">
                     {creator.followers.toLocaleString()} followers
                  </p>
               </div>
            </div>
            <LiveStatus isLive={creator.isLive} />
         </div>

         {/* Current Song */}
         <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-400">
               <Music className="w-4 h-4" />
               <span>Now Playing</span>
            </div>
            <div className="space-y-1">
               <p
                  className={`font-medium transition-colors ${isHovered ? 'text-purple-400' : 'text-white'}`}
               >
                  {creator.currentSong}
               </p>
               <p className="text-sm text-slate-400">by {creator.artist}</p>
            </div>
         </div>

         {/* Stats */}
         <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-slate-400">
               <Users className="w-4 h-4" />
               <span>{creator.viewers.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
               <Clock className="w-4 h-4" />
               <span>{creator.queueLength} in queue</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded border border-white/20 text-white">
               {creator.genre}
            </span>
         </div>

         {/* Action Buttons */}
         <div
            className={`flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
         >
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white border-none rounded text-sm transition-colors">
               <Play className="w-4 h-4" />
               Join Stream
            </button>
            <button className="p-2 bg-transparent hover:bg-white/10 text-white border border-white/20 rounded transition-all">
               <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 bg-transparent hover:bg-white/10 text-white border border-white/20 rounded transition-all">
               <Share2 className="w-4 h-4" />
            </button>
         </div>
      </div>
   )
}

// Search Bar Component
const SearchBar = ({
   value,
   onChange,
}: {
   value: string
   onChange: (value: string) => void
}) => {
   return (
      <div className="relative max-w-sm">
         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
         <input
            placeholder="Search creators..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-slate-800/50 border border-white/20 rounded text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-400 transition-colors"
         />
      </div>
   )
}

// Filter Buttons Component
const FilterButtons = ({
   activeGenre,
   onGenreChange,
}: {
   activeGenre: string
   onGenreChange: (genre: string) => void
}) => {
   const genres = [
      'All',
      'Electronic',
      'Acoustic',
      'Hip-Hop',
      'Indie',
      'Synthwave',
      'Jazz',
   ]

   return (
      <div className="flex gap-2 flex-wrap">
         {genres.map((genre) => (
            <button
               key={genre}
               onClick={() => onGenreChange(genre)}
               className={`px-3 py-1.5 text-sm rounded transition-all ${
                  activeGenre === genre
                     ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-none'
                     : 'bg-transparent hover:bg-white/10 text-white border border-white/20'
               }`}
            >
               {genre}
            </button>
         ))}
      </div>
   )
}

// Main Dashboard Component
export default function User() {
   const [creators, setCreators] = useState(mockCreators)
   const [searchTerm, setSearchTerm] = useState('')
   const [activeGenre, setActiveGenre] = useState('All')
   const [liveCount, setLiveCount] = useState(0)

   // Update live count
   useEffect(() => {
      setLiveCount(creators.filter((creator) => creator.isLive).length)
   }, [creators])

   // Filter creators
   const filteredCreators = creators.filter((creator) => {
      const matchesSearch =
         creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         creator.currentSong.toLowerCase().includes(searchTerm.toLowerCase()) ||
         creator.genre.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre =
         activeGenre === 'All' || creator.genre === activeGenre
      return matchesSearch && matchesGenre
   })

   // Handle view creator space
   const handleViewSpace = (creatorId: number) => {
      const creator = creators.find((c) => c.id === creatorId)
      if (creator) {
         // In a real app, this would navigate to the creator's space
         // For now, we'll just show an alert
         alert(
            `Navigating to ${creator.name}'s space with ${creator.queueLength} songs in queue!`
         )
      }
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
         {/* Header */}
         <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-6">
               <div className="flex items-center justify-between mb-6">
                  <div>
                     <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Live Creators
                     </h1>
                     <p className="text-slate-400 mt-2">
                        Discover amazing live music sessions and join the fun
                     </p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 text-sm">
                        <Radio className="w-4 h-4 text-pink-500 animate-pulse" />
                        <span className="text-slate-400">
                           {liveCount} creators live now
                        </span>
                     </div>
                  </div>
               </div>

               {/* Search and Filters */}
               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <SearchBar value={searchTerm} onChange={setSearchTerm} />
                  <FilterButtons
                     activeGenre={activeGenre}
                     onGenreChange={setActiveGenre}
                  />
               </div>
            </div>
         </header>

         {/* Main Content */}
         <main className="max-w-6xl mx-auto px-6 py-8">
            {filteredCreators.length === 0 ? (
               <div className="text-center py-16">
                  <Music className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                     No creators found
                  </h3>
                  <p className="text-slate-400">
                     Try adjusting your search or filters
                  </p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCreators.map((creator) => (
                     <CreatorCard
                        key={creator.id}
                        creator={creator}
                        onViewSpace={handleViewSpace}
                     />
                  ))}
               </div>
            )}
         </main>

         {/* Footer */}
         <footer className="border-t border-white/10 bg-black/10 backdrop-blur-sm mt-16">
            <div className="max-w-6xl mx-auto px-6 py-8 text-center">
               <p className="text-slate-400">
                  Connect with your favorite creators and enjoy live music
                  sessions
               </p>
            </div>
         </footer>
      </div>
   )
}
