import React, { MouseEvent } from 'react'
import { useRouter } from 'next/router'
import useStore from '../store'
import { useMutateDaily } from '../hooks/useMutateDaily'
import { EditedDaily } from '../types'

type Props = {
  editedDaily: EditedDaily
}

export const DailyForm: React.FC<Props> = ({ editedDaily }) => {
  const router = useRouter()
  const { deleteDailyMutation } = useMutateDaily()

  const deleteDailyHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await deleteDailyMutation.mutateAsync(editedDaily.id)
    router.push('/')
  }

  return (
    <>
      <div className="flex items-center justify-around">
        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-slate-50 px-4 py-2 text-sm text-indigo-600"
          onClick={(e) => deleteDailyHandler(e)}
        >
          cancel
        </button>

        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={() => router.push('/')}
        >
          back to index
        </button>
      </div>
    </>
  )
}
