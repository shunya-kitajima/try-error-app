import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Dailies } from '../components/Dailies'

const daily: NextPage = () => {
  return (
    <Layout title="Try and Error">
      <Dailies />
    </Layout>
  )
}

export default daily
