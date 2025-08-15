'use client'
import { useState } from 'react'
import {
   Music,
   Users,
   Settings,
   MoreVertical,
   Eye,
   Copy,
   ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

interface SpaceCardProps {
   space: Space
}

export const SpaceCard = ({ space }: SpaceCardProps) => {
   const [isLive, setIsLive] = useState(space.isLive)
   // const { toast } = useToast()

   const handleToggleLive = () => {
      setIsLive(!isLive)
      // toast({
      //    title: isLive ? 'Space is now offline' : 'Space is now live!',
      //    description: isLive
      //       ? 'Users can no longer join or add songs'
      //       : 'Users can now join and share their favorite songs',
      // })
   }

   const handleCopyLink = () => {
      navigator.clipboard.writeText(`https://yourapp.com/space/${space.id}`)
      // toast({
      //    title: 'Link copied!',
      //    description: 'Space link has been copied to clipboard',
      // })
   }

   const handleViewSpace = () => {
      console.log('Navigate to space:', space.id)
   }

   return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500/20 hover:border-l-purple-500 bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80">
         <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <CardTitle className="text-lg font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {space.name}
                     </CardTitle>
                     <Badge
                        variant={isLive ? 'default' : 'secondary'}
                        className={
                           isLive
                              ? 'bg-pink-500 text-white animate-pulse dark:bg-pink-600'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }
                     >
                        {isLive ? 'LIVE' : 'OFFLINE'}
                     </Badge>
                  </div>
                  <CardDescription className="text-sm line-clamp-2 text-gray-600 dark:text-gray-400">
                     {space.description}
                  </CardDescription>
               </div>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <MoreVertical className="w-4 h-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuItem onClick={handleViewSpace}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Space
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleCopyLink}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in New Tab
                     </DropdownMenuItem>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
               <Badge
                  variant="outline"
                  className="text-xs border-gray-200 dark:border-gray-700"
               >
                  {space.genre}
               </Badge>
               <span>
                  Created {new Date(space.createdAt).toLocaleDateString()}
               </span>
            </div>
         </CardHeader>

         <CardContent className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                     <span className="font-medium">{space.memberCount}</span>{' '}
                     members
                  </span>
               </div>
               <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                     <span className="font-medium">{space.songCount}</span>{' '}
                     songs
                  </span>
               </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
               <div className="flex items-center gap-2">
                  <Switch
                     checked={isLive}
                     onCheckedChange={handleToggleLive}
                     className="data-[state=checked]:bg-pink-500 dark:data-[state=checked]:bg-pink-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                     {isLive ? 'Live' : 'Offline'}
                  </span>
               </div>

               <div className="flex gap-2">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handleViewSpace}
                     className="hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:border-purple-500/20 dark:hover:text-purple-400"
                  >
                     <Eye className="w-3 h-3 mr-1" />
                     View
                  </Button>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={handleCopyLink}
                     className="hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:border-pink-500/20 dark:hover:text-pink-400"
                  >
                     <Copy className="w-3 h-3 mr-1" />
                     Share
                  </Button>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
