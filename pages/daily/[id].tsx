import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import useStore from '../../store'
import { Layout } from '../../components/Layout'
import { TryFormMemo } from '../../components/TryForm'
import { TryListMemo } from '../../components/TryList'
import { Daily } from '../../types'

const DailyPage: NextPage = () => {
  const router = useRouter()
  const queryStr = String(router.query.id)
  const queryclient = useQueryClient()
  const previousDailies = queryclient.getQueryData<Daily[]>(['dailies'])
  const targetDaily = previousDailies?.filter((daily) => daily.id === queryStr)
  const { resetEditedTry } = useStore()

  return (
    <Layout title="Try and Error">
      {targetDaily !== undefined ? (
        <>
          <p className="text-3xl font-semibold text-blue-500">{`${targetDaily[0].year}/${targetDaily[0].month}/${targetDaily[0].date}`}</p>
          <TryFormMemo daily_id={targetDaily[0].id} />
          <TryListMemo daily_id={targetDaily[0].id} />
        </>
      ) : (
        <p className="text-3xl font-semibold text-blue-500">not found</p>
      )}
      <ChevronDoubleLeftIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={() => {
          resetEditedTry()
          queryclient.removeQueries(['tries'])
          router.push('/dailies')
        }}
      />
    </Layout>
  )
}

export default DailyPage
