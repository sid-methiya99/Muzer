'use client'

import { ArrowLeft, Music, Share2 } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

export default function Header({ spaceId }: { spaceId: string }) {
   const session = useSession()
   const router = useRouter()
   const handleShare = async () => {
      const shareableLink = `${window.location.host}/creator/space/${spaceId}`
      navigator.clipboard.writeText(shareableLink).then(
         () => {
            toast.success('Link copied to clipboard', {
               position: 'top-right',
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            })
         },
         (err) => {
            console.error('Could not copy to clipboard: ', err)
            toast.error('Could not copy link to clipboard', {
               position: 'top-right',
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            })
         }
      )
   }
   const handleGoBack = () => {
      router.push('/creator')
   }
   return (
      <header className="mx-5 px-4 lg:px-6 h-14 flex items-center relative z-20">
         <nav className="flex justify-between w-full mt-4">
            <div className="flex items-center justify-center">
               <Music className="h-6 w-6 text-purple-600" />
               <span className="ml-2 text-2xl font-bold text-purple-400">
                  Muzer
               </span>
            </div>
            <div className="flex items-center gap-2">
               <button
                  onClick={handleGoBack}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-semibold px-3 py-2 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center gap-3"
               >
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                  {/* Icon with animation */}
                  <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />

                  {/* Text */}
                  <span className="relative z-10 text-lg">Go Back</span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
               </button>
               <button
                  onClick={handleShare}
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-semibold px-3 py-2 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center gap-3"
               >
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                  {/* Icon with animation */}
                  <Share2 className="w-5 h-5 " />

                  {/* Text */}
                  <span className="relative z-10 text-lg">Share</span>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
               </button>
               {session.data?.user ? (
                  <button
                     onClick={() => signOut()}
                     className="group relative overflow-hidden bg-gradient-to-r from-red-600/70 to-pink-600/70 hover:from-red-500 hover:to-pink-500 text-white font-medium px-5 py-2.5 rounded-lg backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                     <span className="relative z-10">Logout</span>
                  </button>
               ) : (
                  <button
                     onClick={() => signIn()}
                     className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-semibold px-3 py-2 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center gap-3"
                  >
                     {/* Shine effect overlay */}
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                     {/* Icon with animation */}

                     {/* Text */}
                     <span className="relative z-10 text-lg">SignIn</span>

                     {/* Glow effect */}
                     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                  </button>
               )}
            </div>
         </nav>
         <ToastContainer />
      </header>
   )
}
