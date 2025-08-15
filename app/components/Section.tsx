import { Headphones, Radio, Users } from 'lucide-react'
import Link from 'next/link'

export function Section() {
   return (
      <div>
         <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800/50 ">
            <div className="container px-4 md:px-6 mx-auto">
               <div className="w-full flex items-center justify-center">
                  <h2 className="text-2xl text-white font-bold text-center tracking-tighter mb-8 sm:text-3xl">
                     Key Features
                  </h2>
               </div>
               <div className="grid gap-8 sm:grid-cols-3">
                  <div className="flex flex-col items-center space-y-3 text-center">
                     <Users className="h-12 w-12 text-yellow-400" />
                     <h3 className="text-xl font-bold text-white">
                        Fan Interaction
                     </h3>
                     <p className="text-gray-400">Let fans choose the music</p>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-center">
                     <Radio className="h-12 w-12 text-green-400" />
                     <h3 className="text-xl font-bold text-white">
                        Live Streaming
                     </h3>
                     <p className="text-gray-400">
                        Streams with real-time input.
                     </p>
                  </div>
                  <div className="flex flex-col items-center space-y-3 text-center">
                     <Headphones className="h-12 w-12 text-blue-400" />
                     <h3 className="text-xl font-bold text-white">
                        High Quality Audio
                     </h3>
                     <p className="text-gray-400">
                        Crystal Clear sound quality.
                     </p>
                  </div>
               </div>
            </div>
         </section>
         <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto ">
               <div className="w-full flex items-center justify-center space-y-2 flex-col ">
                  <h2 className="text-3xl text-white font-bold text-center tracking-tighter sm:text-4xl">
                     Ready to Transform Your Streams?
                  </h2>
                  <div className="max-w-sm text-center">
                     <span className="text-gray-400 max-w-xl">
                        Join MusicStreamChoice today and create unforgettable
                        experiences.
                     </span>
                  </div>
                  <div className="flex gap-3 items-center justify-between">
                     <input
                        className="flex h-8 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        placeholder="Enter your email"
                     />
                     <button className="text-xs font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer">
                        Sign Up
                     </button>
                  </div>
               </div>
            </div>
         </section>
         <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-gray-700 px-4 py-6 sm:flex-row md:px-6">
            <p className="text-xs text-gray-400">
               © 2023 MusicStreamChoice. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:ml-auto sm:gap-6">
               <Link
                  className="text-xs text-gray-400 transition-colors hover:text-purple-400"
                  href="#"
               >
                  Terms of Service
               </Link>
               <Link
                  className="text-xs text-gray-400 transition-colors hover:text-purple-400"
                  href="#"
               >
                  Privacy
               </Link>
            </nav>
         </footer>
      </div>
   )
}
