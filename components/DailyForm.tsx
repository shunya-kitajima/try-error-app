import React, { MouseEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { useMutateDaily } from '../hooks/useMutateDaily'
import { useMutateTry } from '../hooks/useMutateTry'
import { Spinner } from './Spinner'
import { Daily } from '../types'

export const DailyForm: React.FC = () => {
  const { createDailyMutation } = useMutateDaily()
  const { createTryMultipleMutation } = useMutateTry()
  const queryclient = useQueryClient()

  const addDailyHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const ymd = `${year}/${month}/${date}`
    const previousDailies = queryclient.getQueryData<Daily[]>(['dailies'])
    const todayDaily = previousDailies?.filter((daily) => daily.ymd === ymd)
    if (todayDaily?.length !== 0) {
      alert('今日の分は既に作成されています')
      return
    }
    await createDailyMutation.mutateAsync({
      user_id: supabase.auth.user()?.id!,
      year: String(year),
      month: String(month),
      date: String(date),
      ymd: ymd,
    })
  }

  const takeOverPrevDailyHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const ymd = `${year}/${month}/${date}`
    let previousDailies = queryclient.getQueryData<Daily[]>(['dailies'])
    let todayDaily = previousDailies?.filter((daily) => daily.ymd === ymd)
    if (todayDaily?.length !== 0) {
      alert('今日の分は既に作成されています')
      return
    }
    const prevDaily = previousDailies?.filter(
      (daily) => daily.ymd === `${year}/${month}/${date - 1}`
    )
    if (prevDaily?.length === 0) {
      alert('前日の分がありません')
      return
    }
    await createDailyMutation.mutateAsync({
      user_id: supabase.auth.user()?.id!,
      year: String(year),
      month: String(month),
      date: String(date),
      ymd: ymd,
    })
    previousDailies = queryclient.getQueryData<Daily[]>(['dailies'])
    todayDaily = previousDailies?.filter((daily) => daily.ymd === ymd)
    const { data: prevTries } = await supabase
      .from('tries')
      .select('*')
      .eq('daily_id', prevDaily !== undefined ? prevDaily[0].id : '')
    const createData = prevTries?.map((paramTry) => {
      return {
        user_id: supabase.auth.user()?.id!,
        daily_id: todayDaily !== undefined ? todayDaily[0].id : '',
        try: paramTry.try,
        result: paramTry.result,
      }
    })
    await createTryMultipleMutation.mutateAsync(createData!)
  }

  if (createDailyMutation.isLoading || createTryMultipleMutation.isLoading)
    return <Spinner />

  return (
    <>
      <div className=" flex flex-col items-center">
        <button
          type="button"
          className="w-25 mb-2.5 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={(e) => addDailyHandler(e)}
        >
          add Daily
        </button>
        <button
          type="button"
          className="w-25 rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={(e) => takeOverPrevDailyHandler(e)}
        >
          take over previous Dayily
        </button>
      </div>
    </>
  )
}
