import { NextPage } from 'next'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { DashBoard } from '../components/DashBoard'

const Dashboard: NextPage = () => {
  const session = supabase.auth.session()
  const setSession = useStore((state) => state.setSession)
  setSession(session)

  return (
    <Layout title="Try and Error">
      <DashBoard />
    </Layout>
  )
}

export default Dashboard
