'use client'
import { ArrowRight, Music } from 'lucide-react'
import Link from 'next/link'
import UserTypeModal from './ChooseRole'
import { signIn, signOut, useSession } from 'next-auth/react'
import { id } from 'zod/v4/locales'
import { useRouter } from 'next/navigation'

export function AppBar() {
   const session = useSession()
   const router = useRouter()
   const navigateUser = () => {
      if (session.data?.user.role === 'Streamer') {
         router.push('/user')
      } else {
         router.push('/creator')
      }
   }
   return (
      <header className="mx-5 px-4 lg:px-6 h-14 flex items-center mt-2">
         <nav className="flex justify-between w-full">
            <Link className="flex items-center justify-center" href="#">
               <Music className="h-6 w-6 text-purple-600" />
               <span className="ml-2 text-2xl font-bold text-purple-400">
                  Muzer
               </span>
            </Link>
            <div className="flex gap-2">
               <div>{!session.data?.user && <UserTypeModal />}</div>
               <div>
                  {session.data?.user && (
                     <div className="flex gap-2">
                        <button
                           className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 text-white font-semibold px-3 py-1.5 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center gap-2"
                           onClick={() => navigateUser()}
                        >
                           {/* Shine effect overlay */}
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                           {/* Icon with animation */}
                           <ArrowRight className="w-5 h-5 " />

                           {/* Text */}
                           <span className="relative z-10 text-base">
                              {session.data.user.role === 'Streamer'
                                 ? 'Go To Dashboard'
                                 : 'Go To Spaces'}
                           </span>

                           {/* Glow effect */}
                           <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                        </button>
                        <button
                           onClick={() => signOut()}
                           className="group relative overflow-hidden bg-gradient-to-r from-red-600/70 to-pink-600/70 hover:from-red-500 hover:to-pink-500 text-white font-medium px-5 py-2.5 rounded-lg backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400/50"
                        >
                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                           <span className="relative z-10">Logout</span>
                        </button>
                     </div>
                  )}
                  {!session.data?.user && (
                     <button
                        onClick={() => {
                           signIn()
                        }}
                        className="text-base font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer"
                     >
                        Signin
                     </button>
                  )}
               </div>
            </div>
         </nav>
      </header>
   )
}
