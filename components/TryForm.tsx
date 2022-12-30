import React, { FormEvent } from 'react'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { useMutateTry } from '../hooks/useMutateTry'
import { Spinner } from './Spinner'

type Props = {
  daily_id: string
}

export const TryForm: React.FC<Props> = ({ daily_id }) => {
  const { editedTry } = useStore()
  const { updateEditedTry } = useStore()
  const { createTryMutation, updateTryMutation } = useMutateTry()

  const tryHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTry.id) {
      await updateTryMutation.mutateAsync({
        id: editedTry.id,
        daily_id: daily_id,
        try: editedTry.try,
        result: editedTry.result,
      })
    } else {
      await createTryMutation.mutateAsync({
        user_id: supabase.auth.user()?.id!,
        daily_id: daily_id,
        try: editedTry.try,
        result: editedTry.result,
      })
    }
  }

  if (createTryMutation.isLoading || updateTryMutation.isLoading)
    return <Spinner />

  return (
    <form onSubmit={tryHandleSubmit}>
      <div>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="try"
          value={editedTry.try}
          onChange={(e) =>
            updateEditedTry({ ...editedTry, try: e.target.value })
          }
        />
      </div>
      <div>
        <textarea
          cols={50}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="result"
          value={editedTry.result}
          onChange={(e) =>
            updateEditedTry({ ...editedTry, result: e.target.value })
          }
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {editedTry.id ? 'update' : 'create'}
        </button>
      </div>
    </form>
  )
}
