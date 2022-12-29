import React, { MouseEvent } from 'react'
import useStore from '../store'
import { useMutateDaily } from '../hooks/useMutateDaily'
import { Spinner } from './Spinner'

export const DailyForm: React.FC = () => {
  const { session } = useStore()
  const { createDailyMutation } = useMutateDaily()

  const addDailyHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    await createDailyMutation.mutateAsync({
      user_id: session?.user?.id!,
      year: String(year),
      month: String(month),
      date: String(date),
    })
  }

  if (createDailyMutation.isLoading || createDailyMutation.isError)
    return <Spinner />

  return (
    <>
      <div className="flex items-center justify-around">
        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={(e) => addDailyHandler(e)}
        >
          add Daily
        </button>
      </div>
    </>
  )
}
