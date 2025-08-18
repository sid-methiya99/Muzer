'use client'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
   const [isDark, setIsDark] = useState(false)

   useEffect(() => {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
      const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
      const initialDark = stored ? stored === 'dark' : prefersDark
      setIsDark(initialDark)
      if (initialDark) {
         document.documentElement.classList.add('dark')
      } else {
         document.documentElement.classList.remove('dark')
      }
   }, [])

   const toggle = () => {
      const next = !isDark
      setIsDark(next)
      if (next) {
         document.documentElement.classList.add('dark')
         localStorage.setItem('theme', 'dark')
      } else {
         document.documentElement.classList.remove('dark')
         localStorage.setItem('theme', 'light')
      }
   }

   return (
      <button
         aria-label="Toggle theme"
         onClick={toggle}
         className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow"
      >
         {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
         <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
      </button>
   )
}



