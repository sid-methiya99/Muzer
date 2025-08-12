'use client'

import { Music, Share2 } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'

export default function Header() {
   const session = useSession()
   const userId = session?.data?.user?.id
   const handleShare = async () => {
      const shareableLink = `${window.location.host}/creator/${userId}`
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
                  onClick={handleShare}
                  className="text-md font-medium text-white bg-purple-600 px-4 py-2 rounded-md cursor-pointer flex items-center gap-2"
               >
                  <Share2 />
                  Share
               </button>
               {session.data?.user && (
                  <button
                     onClick={() => signOut()}
                     className="text-md font-medium text-white bg-purple-600 px-4 py-2 rounded-md cursor-pointer"
                  >
                     Logout
                  </button>
               )}
            </div>
         </nav>
         <ToastContainer />
      </header>
   )
}
