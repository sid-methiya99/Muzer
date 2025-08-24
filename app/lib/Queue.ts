import { Video } from './types'

export class Queue<T> {
   private items: T[] = []

   constructor(initialItems: T[] = []) {
      this.items = [...initialItems]
   }

   // Add item to the end of the queue
   enqueue(item: T): void {
      this.items.push(item)
   }

   // Remove and return the first item from the queue
   dequeue(): T | undefined {
      return this.items.shift()
   }

   // Get the first item without removing it
   peek(): T | undefined {
      return this.items[0]
   }

   // Get the second item (next in queue)
   peekNext(): T | undefined {
      return this.items[1]
   }

   // Check if queue is empty
   isEmpty(): boolean {
      return this.items.length === 0
   }

   // Get queue size
   size(): number {
      return this.items.length
   }

   // Get all items as array
   toArray(): T[] {
      return [...this.items]
   }

   // Clear the queue
   clear(): void {
      this.items = []
   }

   // Remove item at specific index
   removeAt(index: number): T | undefined {
      if (index < 0 || index >= this.items.length) {
         return undefined
      }
      return this.items.splice(index, 1)[0]
   }

   // Get item at specific index without removing
   getAt(index: number): T | undefined {
      return this.items[index]
   }

   // Update the entire queue with new items
   updateItems(newItems: T[]): void {
      this.items = [...newItems]
   }

   // Add multiple items to the queue
   enqueueMultiple(items: T[]): void {
      this.items.push(...items)
   }

   // Get items from index to end
   sliceFrom(index: number): T[] {
      return this.items.slice(index)
   }

   // Get items from start to index
   sliceTo(index: number): T[] {
      return this.items.slice(0, index)
   }
}
