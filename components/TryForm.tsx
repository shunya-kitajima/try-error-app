import React, { Dispatch, SetStateAction, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import useStore from '../store'
import { useMutateTry } from '../hooks/useMutateTry'
import { EditedDaily, EditedTry } from '../types'

type Props = {
  editedDaily: EditedDaily
  editedTry: EditedTry
  setEditedTry: Dispatch<SetStateAction<EditedTry>>
}

export const TryForm: React.FC<Props> = ({
  editedDaily,
  editedTry,
  setEditedTry,
}) => {
  const router = useRouter()
  const session = useStore((state) => state.session)
  setEditedTry({
    id: '',
    user_id: editedDaily.user_id,
    daily_id: editedDaily.id,
    try: '',
    result: '',
  })

  const { createTryMutation, updateTryMutation } = useMutateTry()

  const tryHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editedTry.id) {
      await updateTryMutation.mutateAsync(editedTry)
    } else {
      await createTryMutation.mutateAsync({
        user_id: editedDaily.user_id,
        daily_id: editedDaily.id,
        try: editedTry.try,
        result: editedTry.result,
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-around">
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="try"
          value={editedTry.try}
          onChange={(e) => setEditedTry({ ...editedTry, try: e.target.value })}
        />
        <textarea
          cols={40}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="result"
          value={editedTry.result}
          onChange={(e) =>
            setEditedTry({ ...editedTry, result: e.target.value })
          }
        />
        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
          onClick={(e) => tryHandleSubmit(e)}
        >
          {editedTry.id ? 'update' : 'create'}
        </button>
      </div>
    </>
  )
}
