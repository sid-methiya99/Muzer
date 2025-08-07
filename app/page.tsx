import { AppBar } from './components/AppBar'
import { MainContent } from './components/MainContent'
import { Section } from './components/Section'

export default function Home() {
   return (
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
         <AppBar />
         <MainContent />
         <Section />
      </main>
   )
}
