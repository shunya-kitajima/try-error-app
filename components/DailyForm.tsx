import React, { MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import useMutateDaily from '../hooks/useMutateDaily'

export const DailyForm: React.FC = () => {
  const router = useRouter()
  const currentSession = supabase.auth.session()
  const editedDaily = useStore((state) => state.editedDaily)
  const editedTry = useStore((state) => state.editedTry)
  const updateEditedTry = useStore((state) => state.updateEditedTry)
  const { createDailyMutation, updateDailyMutation } = useMutateDaily()

  const dailyHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editedDaily.id) {
      await updateDailyMutation.mutateAsync(editedDaily)
      router.push('/')
    } else {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const date = now.getDate()
      await createDailyMutation.mutateAsync({
        user_id: currentSession?.user?.id!,
        year: String(year),
        month: String(month),
        date: String(date),
      })
      router.push('/dashboard')
    }
  }

  return (
    <>
      <div className="flex items-center justify-around">
        <Link href={'/dashboard'} prefetch={false}>
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
          {editedDaily.id ? 'update' : 'create'}
        </button>
      </div>
      <div className="flex items-center justify-around">
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="try"
          value={editedTry.try}
          onChange={(e) =>
            updateEditedTry({ ...editedTry, try: e.target.value })
          }
        />
        <textarea
          cols={40}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="result"
          value={editedTry.result}
          onChange={(e) =>
            updateEditedTry({ ...editedTry, result: e.target.value })
          }
        />
        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          {editedTry.id ? 'update' : 'create'}
        </button>
      </div>
    </>
  )
}
