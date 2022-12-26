import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Daily } from '../components/Daily'

const DailyPage: NextPage = () => {
  return (
    <Layout title="Try and Error">
      <Daily />
    </Layout>
  )
}

export default DailyPage
