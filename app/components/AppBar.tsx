'use client'
import { Music } from 'lucide-react'
import Link from 'next/link'
import UserTypeModal from './ChooseRole'

export function AppBar() {
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
               <div>
                  <UserTypeModal />
               </div>
               <div>
                  {/* {session.data?.user && ( */}
                  {/*    <button */}
                  {/*       onClick={() => { */}
                  {/*       }} */}
                  {/*       className="text-base font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer" */}
                  {/*    > */}
                  {/*       Logout */}
                  {/*    </button> */}
                  {/* )} */}
                  {/* {!session.data?.user && ( */}
                  {/*    <button */}
                  {/*       onClick={() => { */}
                  {/*          signIn() */}
                  {/*       }} */}
                  {/*       className="text-base font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer" */}
                  {/*    > */}
                  {/*       Signin */}
                  {/*    </button> */}
                  {/* )} */}
               </div>
            </div>
         </nav>
      </header>
   )
}
