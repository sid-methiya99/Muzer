'use client'
import { signIn } from 'next-auth/react'

export function AppBar() {
   return (
      <div className="flex justify-between">
         <div>Muzer</div>
         <div>
            <button className="m-2 p-2 bg-blue-300" onClick={() => signIn()}>
               SignIn
            </button>
         </div>
      </div>
   )
}
