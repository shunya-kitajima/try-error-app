import type { NextPage } from 'next'
import { useEffect } from 'react'
import { supabase } from '../utils/supabase'
import useStore from '../store/indx'
import { Layout } from '../components/Layout'
import { Auth } from '../components/Auth'
import { DashBoard } from '../components/DashBoard'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)

  useEffect(() => {
    const defaultSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
    }
    defaultSession()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])

  return (
    <Layout title="Try and Error">{!session ? <Auth /> : <DashBoard />}</Layout>
  )
}

export default Home
