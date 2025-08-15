// import React, { useState, useEffect } from 'react'
// import {
//    Search,
//    Music,
//    Users,
//    Clock,
//    Radio,
//    Play,
//    Heart,
//    Share2,
// } from 'lucide-react'
// import { Card } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
//
// // Mock data for live creators
// const mockCreators = [
//    {
//       id: 1,
//       name: 'DJ Luna',
//       avatar:
//          'https://images.unsplash.com/photo-1494790108755-2616c1f1d511?w=150&h=150&fit=crop&crop=faces',
//       isLive: true,
//       currentSong: 'Electric Dreams',
//       artist: 'Neon Vibes',
//       viewers: 1247,
//       queueLength: 15,
//       genre: 'Electronic',
//       followers: 8542,
//    },
//    {
//       id: 2,
//       name: 'Acoustic Alex',
//       avatar:
//          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
//       isLive: true,
//       currentSong: 'Midnight Coffee',
//       artist: 'Alex Rodriguez',
//       viewers: 892,
//       queueLength: 8,
//       genre: 'Acoustic',
//       followers: 5633,
//    },
//    {
//       id: 3,
//       name: 'Beats Baron',
//       avatar:
//          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
//       isLive: true,
//       currentSong: 'Urban Nights',
//       artist: 'City Sounds',
//       viewers: 2156,
//       queueLength: 23,
//       genre: 'Hip-Hop',
//       followers: 12784,
//    },
//    {
//       id: 4,
//       name: 'Melody Rose',
//       avatar:
//          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
//       isLive: true,
//       currentSong: 'Golden Hour',
//       artist: 'Rose Garden',
//       viewers: 654,
//       queueLength: 12,
//       genre: 'Indie',
//       followers: 4321,
//    },
//    {
//       id: 5,
//       name: 'Synth Master',
//       avatar:
//          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
//       isLive: true,
//       currentSong: 'Neon Pulse',
//       artist: 'Digital Dreams',
//       viewers: 1789,
//       queueLength: 18,
//       genre: 'Synthwave',
//       followers: 9876,
//    },
//    {
//       id: 6,
//       name: 'Jazz Jenna',
//       avatar:
//          'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=150&h=150&fit=crop&crop=faces',
//       isLive: true,
//       currentSong: 'Blue Moon Serenade',
//       artist: 'Midnight Jazz Quartet',
//       viewers: 432,
//       queueLength: 7,
//       genre: 'Jazz',
//       followers: 3654,
//    },
// ]
//
// // Live Status Component
// const LiveStatus = ({ isLive }: { isLive: boolean }) => {
//    if (!isLive) return null
//
//    return (
//       <div className="flex items-center gap-2">
//          <div className="w-2 h-2 bg-live-accent rounded-full animate-pulse-live"></div>
//          <Badge
//             variant="secondary"
//             className="bg-live-accent/20 text-live-accent border-live-accent/30 text-xs font-medium"
//          >
//             LIVE
//          </Badge>
//       </div>
//    )
// }
//
// // Creator Card Component
// const CreatorCard = ({
//    creator,
//    onViewSpace,
// }: {
//    creator: any
//    onViewSpace: (id: number) => void
// }) => {
//    const [isHovered, setIsHovered] = useState(false)
//
//    return (
//       <Card
//          className="bg-gradient-card border-border/50 shadow-card hover:shadow-live transition-all duration-300 cursor-pointer group"
//          onMouseEnter={() => setIsHovered(true)}
//          onMouseLeave={() => setIsHovered(false)}
//          onClick={() => onViewSpace(creator.id)}
//       >
//          <div className="p-6 space-y-4">
//             {/* Header with Avatar and Live Status */}
//             <div className="flex items-start justify-between">
//                <div className="flex items-center gap-3">
//                   <div className="relative">
//                      <img
//                         src={creator.avatar}
//                         alt={creator.name}
//                         className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
//                      />
//                      {creator.isLive && (
//                         <div className="absolute -top-1 -right-1 w-5 h-5 bg-live-accent rounded-full border-2 border-card animate-glow"></div>
//                      )}
//                   </div>
//                   <div>
//                      <h3 className="font-semibold text-lg text-foreground">
//                         {creator.name}
//                      </h3>
//                      <p className="text-sm text-muted-foreground">
//                         {creator.followers.toLocaleString()} followers
//                      </p>
//                   </div>
//                </div>
//                <LiveStatus isLive={creator.isLive} />
//             </div>
//
//             {/* Current Song */}
//             <div className="space-y-2">
//                <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Music className="w-4 h-4" />
//                   <span>Now Playing</span>
//                </div>
//                <div className="space-y-1">
//                   <p className="font-medium text-foreground group-hover:text-music-primary transition-colors">
//                      {creator.currentSong}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                      by {creator.artist}
//                   </p>
//                </div>
//             </div>
//
//             {/* Stats */}
//             <div className="flex items-center justify-between text-sm">
//                <div className="flex items-center gap-1 text-muted-foreground">
//                   <Users className="w-4 h-4" />
//                   <span>{creator.viewers.toLocaleString()}</span>
//                </div>
//                <div className="flex items-center gap-1 text-muted-foreground">
//                   <Clock className="w-4 h-4" />
//                   <span>{creator.queueLength} in queue</span>
//                </div>
//                <Badge variant="outline" className="text-xs">
//                   {creator.genre}
//                </Badge>
//             </div>
//
//             {/* Action Buttons */}
//             <div
//                className={`flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
//             >
//                <Button variant="secondary" size="sm" className="flex-1">
//                   <Play className="w-4 h-4 mr-2" />
//                   Join Stream
//                </Button>
//                <Button variant="outline" size="sm">
//                   <Heart className="w-4 h-4" />
//                </Button>
//                <Button variant="outline" size="sm">
//                   <Share2 className="w-4 h-4" />
//                </Button>
//             </div>
//          </div>
//       </Card>
//    )
// }

export default function User() {
   return <div>Hi from user</div>
}
