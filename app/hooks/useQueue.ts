import { useState, useCallback } from 'react'
import { Video } from '../lib/types'
import { Queue } from '../lib/Queue'

export function useQueue(initialItems: Video[] = []) {
   const [queue, setQueue] = useState<Queue<Video>>(new Queue(initialItems))

   // Update queue with new items
   const updateQueue = useCallback((newItems: Video[]) => {
      setQueue(new Queue(newItems))
   }, [])

   // Add item to queue
   const enqueue = useCallback((item: Video) => {
      setQueue(prevQueue => {
         const newQueue = new Queue(prevQueue.toArray())
         newQueue.enqueue(item)
         return newQueue
      })
   }, [])

   // Remove and return first item
   const dequeue = useCallback(() => {
      let dequeuedItem: Video | undefined
      setQueue(prevQueue => {
         const newQueue = new Queue(prevQueue.toArray())
         dequeuedItem = newQueue.dequeue()
         return newQueue
      })
      return dequeuedItem
   }, [])

   // Get first item without removing
   const peek = useCallback(() => {
      return queue.peek()
   }, [queue])

   // Get next item (second in queue)
   const peekNext = useCallback(() => {
      return queue.peekNext()
   }, [queue])

   // Check if queue is empty
   const isEmpty = useCallback(() => {
      return queue.isEmpty()
   }, [queue])

   // Get queue size
   const size = useCallback(() => {
      return queue.size()
   }, [queue])

   // Get all items as array
   const toArray = useCallback(() => {
      return queue.toArray()
   }, [queue])

   // Clear queue
   const clear = useCallback(() => {
      setQueue(new Queue())
   }, [])

   // Remove item at specific index
   const removeAt = useCallback((index: number) => {
      let removedItem: Video | undefined
      setQueue(prevQueue => {
         const newQueue = new Queue(prevQueue.toArray())
         removedItem = newQueue.removeAt(index)
         return newQueue
      })
      return removedItem
   }, [])

   // Get item at specific index
   const getAt = useCallback((index: number) => {
      return queue.getAt(index)
   }, [queue])

   // Add multiple items
   const enqueueMultiple = useCallback((items: Video[]) => {
      setQueue(prevQueue => {
         const newQueue = new Queue(prevQueue.toArray())
         newQueue.enqueueMultiple(items)
         return newQueue
      })
   }, [])

   return {
      queue,
      updateQueue,
      enqueue,
      dequeue,
      peek,
      peekNext,
      isEmpty,
      size,
      toArray,
      clear,
      removeAt,
      getAt,
      enqueueMultiple,
   }
}
