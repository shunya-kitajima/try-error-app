import React, { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStore from '../store'
import { useMutateDaily } from '../hooks/useMutateDaily'

export const DailyForm: React.FC = () => {
  const router = useRouter()
  const session = useStore((state) => state.session)
  const editedDaily = useStore((state) => state.editedDaily)
  const { createDailyMutation, updateDailyMutation } = useMutateDaily()

  const dailyHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editedDaily.id === 'create') {
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
      router.push('/')
    } else {
      await updateDailyMutation.mutateAsync(editedDaily)
      router.push('/')
    }
  }

  return (
    <>
      <div className="flex items-center justify-around">
        <Link href={'/'} prefetch={false}>
          <button
            type="button"
            className="flex w-full justify-center rounded-md bg-slate-50 px-4 py-2 text-sm text-indigo-600"
          >
            cancel
          </button>
        </Link>
        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={(e) => dailyHandleSubmit(e)}
        >
          {editedDaily.id === 'create' ? 'create' : 'update'}
        </button>
      </div>
    </>
  )
}
