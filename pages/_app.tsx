import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { supabase } from '../utils/supabase'
import useStore from '../store'

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
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)

  const validateSession = async () => {
    const user = await supabase.auth.getUser()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setSession(session)
    if (user && pathname === '/') {
      push('/dashboard')
    } else if (!user && pathname !== '/') {
      push('/')
    }
  }

  supabase.auth.onAuthStateChange((event, _) => {
    setSession(session)
    if (event === 'SIGNED_IN' && pathname === '/') {
      push('/dashboard')
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
