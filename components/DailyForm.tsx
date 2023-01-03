import React, { MouseEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { useMutateDaily } from '../hooks/useMutateDaily'
import { Spinner } from './Spinner'
import { Daily } from '../types'

export const DailyForm: React.FC = () => {
  const { createDailyMutation } = useMutateDaily()
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

  if (createDailyMutation.isLoading || createDailyMutation.isError)
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
        >
          take over previous Dayily
        </button>
      </div>
    </>
  )
}
