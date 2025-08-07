'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export function AppBar() {
   const session = useSession()
   return (
      <div className="flex justify-between">
         <div>Muzer</div>
         <div>
            {session.data?.user && (
               <button
                  className="m-2 p-2 bg-blue-300"
                  onClick={() => signOut()}
               >
                  Logout
               </button>
            )}
            {!session.data?.user && (
               <button className="m-2 p-2 bg-blue-300" onClick={() => signIn()}>
                  SignIn
               </button>
            )}
         </div>
      </div>
   )
}
