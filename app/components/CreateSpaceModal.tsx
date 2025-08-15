'use client'
import { useForm } from 'react-hook-form'
import { Music } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog'
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

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

interface SpaceFormData {
   name: string
   description: string
   genre: string
   isLive: boolean
   thumbnail?: string
}

interface CreateSpaceModalProps {
   isOpen: boolean
   onClose: () => void
   onSubmit: (data: SpaceFormData) => void
}

const GENRES = [
   'Pop',
   'Rock',
   'Hip Hop',
   'Electronic',
   'Jazz',
   'Classical',
   'Country',
   'R&B',
   'Indie',
   'Folk',
   'Metal',
   'Reggae',
   'Blues',
   'Lo-fi',
   'Ambient',
]
export const CreateSpaceModal = ({
   isOpen,
   onClose,
   onSubmit,
}: CreateSpaceModalProps) => {
   const form = useForm<SpaceFormData>({
      defaultValues: {
         name: '',
         description: '',
         genre: '',
         isLive: false,
      },
   })

   const handleSubmit = (data: SpaceFormData) => {
      onSubmit(data)
      form.reset()
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                     <Music className="w-4 h-4 text-white" />
                  </div>
                  Create New Music Space
               </DialogTitle>
            </DialogHeader>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6"
               >
                  {/* Space Name */}
                  <FormField
                     control={form.control}
                     name="name"
                     rules={{ required: 'Space name is required' }}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-gray-700 dark:text-gray-300">
                              Space Name
                           </FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="e.g. Chill Vibes Only"
                                 {...field}
                                 className="focus:ring-purple-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                           </FormControl>
                           <FormDescription className="text-gray-500 dark:text-gray-400">
                              Give your space a catchy name that represents the
                              vibe
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Description */}
                  <FormField
                     control={form.control}
                     name="description"
                     rules={{ required: 'Description is required' }}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-gray-700 dark:text-gray-300">
                              Description
                           </FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="Describe what kind of music and atmosphere you want to create..."
                                 className="resize-none focus:ring-purple-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                 rows={3}
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Genre */}
                  <FormField
                     control={form.control}
                     name="genre"
                     rules={{ required: 'Please select a genre' }}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-gray-700 dark:text-gray-300">
                              Primary Genre
                           </FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger className="focus:ring-purple-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                                    <SelectValue placeholder="Select a genre" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                 {GENRES.map((genre) => (
                                    <SelectItem
                                       key={genre}
                                       value={genre}
                                       className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                       {genre}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormDescription className="text-gray-500 dark:text-gray-400">
                              This helps users find spaces that match their
                              taste
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Go Live Toggle */}
                  <FormField
                     control={form.control}
                     name="isLive"
                     render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-500/10 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-500/20">
                           <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium text-gray-900 dark:text-white">
                                 Go Live Immediately
                              </FormLabel>
                              <FormDescription className="text-gray-500 dark:text-gray-400">
                                 Allow users to join and add songs right away
                              </FormDescription>
                           </div>
                           <FormControl>
                              <Switch
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                                 className="data-[state=checked]:bg-purple-600"
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                     <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                     >
                        Cancel
                     </Button>
                     <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                     >
                        <Music className="w-4 h-4 mr-2" />
                        Create Space
                     </Button>
                  </div>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}
