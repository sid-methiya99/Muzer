'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {} from '@tanstack/react-query-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(() => new QueryClient())
   return (
      <SessionProvider>
         <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
      </SessionProvider>
   )
}
