import { useSession } from 'next-auth/react'
import { AppBar } from './components/AppBar'

export default function Home() {
   return (
      <main>
         <AppBar />
      </main>
   )
}
