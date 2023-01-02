import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { Layout } from '../../components/Layout'
import { TryForm } from '../../components/TryForm'
import { TryList } from '../../components/TryList'
import { Daily } from '../../types'

const DailyPage: NextPage = () => {
  const router = useRouter()
  const queryStr = String(router.query.id)
  const queryclient = useQueryClient()
  const previousDailies = queryclient.getQueryData<Daily[]>(['dailies'])
  const targetDaily = previousDailies?.filter((daily) => daily.id === queryStr)

  return (
    <Layout title="Try and Error">
      {targetDaily !== undefined ? (
        <>
          <p className="text-3xl font-semibold text-blue-500">{`${targetDaily[0].year}/${targetDaily[0].month}/${targetDaily[0].date}`}</p>
          <TryForm daily_id={targetDaily[0].id} />
          <TryList daily_id={targetDaily[0].id} />
        </>
      ) : (
        <p className="text-3xl font-semibold text-blue-500">not found</p>
      )}
      <ChevronDoubleLeftIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={() => {
          queryclient.removeQueries(['tries'])
          router.push('/dailies')
        }}
      />
    </Layout>
  )
}

export default DailyPage
