import { NextPage, GetStaticProps } from 'next'
import {
  ArrowRightOnRectangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { Layout } from '../components/Layout'
import { DailyForm } from '../components/DailyForm'
import { Daily } from '../types'

export const getStaticProps: GetStaticProps = async () => {
  const { data: dailies, error } = await supabase
    .from('dailies')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return {
    props: { dailies },
    revalidate: false,
  }
}

type StaticProps = {
  dailies: Daily[]
}

const Dailies: NextPage<StaticProps> = ({ dailies }) => {
  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <Layout title="Try and Error">
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      <DailyForm />
    </Layout>
  )
}

export default Dailies
