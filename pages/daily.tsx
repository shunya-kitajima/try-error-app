import type { NextPage } from 'next'
import DailyForm from '../components/DailyForm'
import { Layout } from '../components/Layout'

const daily: NextPage = () => {
  return (
    <Layout title="Try and Error">
      <DailyForm />
    </Layout>
  )
}

export default daily
