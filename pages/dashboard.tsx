import { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { DashBoard } from '../components/DashBoard'

const dashboard: NextPage = () => {
  return (
    <Layout title="Try and Error">
      <DashBoard />
    </Layout>
  )
}

export default dashboard
