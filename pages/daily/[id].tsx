import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { supabase } from '../../utils/supabase'
import { Layout } from '../../components/Layout'
import { TryForm } from '../../components/TryForm'
import { TryItem } from '../../components/TryItem'
import { Daily } from '../../types'

const getAllDailyIds = async () => {
  const { data: ids } = await supabase.from('dailies').select('id')
  return ids!.map((id) => {
    return {
      params: {
        id: id.id,
      },
    }
  })
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllDailyIds()
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data: daily } = await supabase
    .from('dailies')
    .select('*, tries(*)')
    .eq('id', ctx.params?.id)
    .single()
  return {
    props: {
      daily,
    },
    revalidate: false,
  }
}

type StaticProps = {
  daily: Daily
}

const DailyPage: NextPage<StaticProps> = ({ daily }) => {
  return (
    <Layout title="Try and Error">
      <p className="text-3xl font-semibold text-blue-500">{`${daily.year}/${daily.month}/${daily.date}`}</p>
      <TryForm daily_id={daily.id} />
      <ul className="my-2">
        {daily.tries?.map((paramTry) => (
          <TryItem
            key={paramTry.id}
            id={paramTry.id}
            daily_id={paramTry.daily_id}
            paramTry={paramTry.try}
            result={paramTry.result}
          />
        ))}
      </ul>
      <Link href="/dailies" passHref prefetch={false}>
        <ChevronDoubleLeftIcon className="my-6 h-6 w-6 cursor-pointer text-blue-500" />
      </Link>
    </Layout>
  )
}

export default DailyPage
