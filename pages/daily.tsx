import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { DailyForm } from '../components/DailyForm'

const daily: NextPage = () => {
  return (
    <Layout title="Try and Error">
      <DailyForm />
    </Layout>
  )
}

export default daily
