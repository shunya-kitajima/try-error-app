import React, { MouseEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { useMutateDaily } from '../hooks/useMutateDaily'
import { DailyList } from './DailyList'

export const DashBoard: React.FC = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const session = useStore((state) => state.session)
  const updateEditedDaily = useStore((state) => state.updateEditedDaily)
  const { createDailyMutation } = useMutateDaily()

  const signOut = () => {
    queryClient.removeQueries(['dailies'])
    supabase.auth.signOut()
  }

  const addDailyHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const data = await createDailyMutation.mutateAsync({
      user_id: session?.user?.id!,
      year: String(year),
      month: String(month),
      date: String(date),
    })
    updateEditedDaily({
      id: data.id,
      user_id: data.user_id,
      year: data.year,
      month: data.month,
      date: data.date,
    })
    router.push('/daily')
  }

  return (
    <>
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <button
        type="button"
        className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
        onClick={(e) => addDailyHandler(e)}
      >
        add Daily
      </button>
      <DailyList />
    </>
  )
}
