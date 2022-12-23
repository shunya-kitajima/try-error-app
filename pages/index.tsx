import type { NextPage } from 'next'
import { Layout } from '../components/Layout'
import { Auth } from '../components/Auth'

const Home: NextPage = () => {
  return (
    <Layout title="Try and Error">
      <Auth />
    </Layout>
  )
}

export default Home
