'use client'
import { useState } from 'react'
import { useQueue } from '../hooks/useQueue'
import { Video } from '../lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Example component to demonstrate Queue usage
export function QueueExample() {
   const [inputTitle, setInputTitle] = useState('')
   
   // Initialize queue with some example songs
   const queue = useQueue([
      { id: '1', title: 'Song 1', extractedId: 'abc123', url: 'https://youtube.com/watch?v=abc123', type: 'Youtube', smallImg: '', bigImg: '', spaceId: 'space1', songByUserId: 'user1', upVote: 5, haveVoted: false, streamerId: 'streamer1', active: true },
      { id: '2', title: 'Song 2', extractedId: 'def456', url: 'https://youtube.com/watch?v=def456', type: 'Youtube', smallImg: '', bigImg: '', spaceId: 'space1', songByUserId: 'user1', upVote: 3, haveVoted: false, streamerId: 'streamer1', active: true },
   ])

   const addSong = () => {
      if (inputTitle.trim()) {
         const newSong: Video = {
            id: Date.now().toString(),
            title: inputTitle,
            extractedId: `song${Date.now()}`,
            url: `https://youtube.com/watch?v=song${Date.now()}`,
            type: 'Youtube',
            smallImg: '',
            bigImg: '',
            spaceId: 'space1',
            songByUserId: 'user1',
            upVote: 0,
            haveVoted: false,
            streamerId: 'streamer1',
            active: true,
         }
         queue.enqueue(newSong)
         setInputTitle('')
      }
   }

   const playNext = () => {
      const currentSong = queue.peek()
      if (currentSong) {
         console.log('Now playing:', currentSong.title)
         queue.dequeue()
      }
   }

   return (
      <div className="p-6 space-y-4">
         <Card>
            <CardHeader>
               <CardTitle>Queue System Example</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex gap-2">
                  <input
                     type="text"
                     value={inputTitle}
                     onChange={(e) => setInputTitle(e.target.value)}
                     placeholder="Enter song title"
                     className="flex-1 px-3 py-2 border rounded"
                  />
                  <Button onClick={addSong}>Add Song</Button>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <span>Queue Size: {queue.size()}</span>
                     <Button onClick={playNext} disabled={queue.isEmpty()}>
                        Play Next
                     </Button>
                  </div>

                  <div className="space-y-1">
                     <h4 className="font-semibold">Current Queue:</h4>
                     {queue.toArray().map((song, index) => (
                        <div key={song.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                           <span>{index + 1}. {song.title}</span>
                           <Button
                              size="sm"
                              variant="outline"
                              onClick={() => queue.removeAt(index)}
                           >
                              Remove
                           </Button>
                        </div>
                     ))}
                     {queue.isEmpty() && (
                        <p className="text-gray-500">Queue is empty</p>
                     )}
                  </div>

                  <div className="space-y-1">
                     <h4 className="font-semibold">Queue Operations:</h4>
                     <div className="flex gap-2 flex-wrap">
                        <Button size="sm" onClick={() => queue.clear()}>
                           Clear Queue
                        </Button>
                        <Button size="sm" onClick={() => console.log('Peek:', queue.peek())}>
                           Peek First
                        </Button>
                        <Button size="sm" onClick={() => console.log('Peek Next:', queue.peekNext())}>
                           Peek Next
                        </Button>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   )
}
