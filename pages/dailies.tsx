import { NextPage } from 'next'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { DailyForm } from '../components/DailyForm'
import { DailyList } from '../components/DailyList'

const Dailies: NextPage = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <Layout title="Try and Error">
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DailyForm />
      <DailyList />
    </Layout>
  )
}

export default Dailies
