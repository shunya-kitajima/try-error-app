import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { supabase } from '../utils/supabase'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: false,
    },
  },
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { push, pathname } = useRouter()

  const validateSession = async () => {
    const session = supabase.auth.session()
    if (session && pathname === '/') {
      push('dailies')
    } else if (!session && pathname !== '/') {
      await push('/')
    }
  }

  supabase.auth.onAuthStateChange((event, _) => {
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('dailies')
    } else if (event === 'SIGNED_OUT') {
      push('/')
    }
  })

  useEffect(() => {
    validateSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
