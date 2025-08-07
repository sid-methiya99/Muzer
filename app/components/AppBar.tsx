'use client'
import { Music } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function AppBar() {
   const session = useSession()
   return (
      <header className="mx-5 px-4 lg:px-6 h-14 flex items-center">
         <nav className="flex justify-between w-full">
            <Link className="flex items-center justify-center" href="#">
               <Music className="h-6 w-6 text-purple-600" />
               <span className="ml-2 text-lg font-bold text-purple-400">
                  Muzer
               </span>
            </Link>

            {session.data?.user && (
               <button
                  onClick={() => {
                     signOut()
                  }}
                  className="text-xs font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer"
               >
                  Logout
               </button>
            )}
            {!session.data?.user && (
               <button
                  onClick={() => {
                     signIn()
                  }}
                  className="text-xs font-medium  text-white  bg-purple-600 px-3 py-2 rounded-md cursor-pointer"
               >
                  Signin
               </button>
            )}
         </nav>
      </header>
   )
}

{
   /* <div> */
}
{
   /*    {session.data?.user && ( */
}
{
   /*       <button */
}
{
   /*          className="m-2 p-2 bg-blue-300" */
}
{
   /*          onClick={() => signOut()} */
}
{
   /*       > */
}
{
   /*          Logout */
}
{
   /*       </button> */
}
{
   /*    )} */
}
{
   /*    {!session.data?.user && ( */
}
{
   /*       <button className="m-2 p-2 bg-blue-300" onClick={() => signIn()}> */
}
{
   /*          SignIn */
}
{
   /*       </button> */
}
{
   /*    )} */
}
{
   /* </div> */
}
