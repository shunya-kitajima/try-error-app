import React, { useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import useStore from '../store'
import { useMutateTry } from '../hooks/useMutateTry'
import { EditedTry } from '../types'

export const TryForm: React.FC = () => {
  const [editedTry, setEditedTry] = useState<EditedTry>({
    id: '',
    try: '',
    result: '',
  })
  const router = useRouter()
  const session = useStore((state) => state.session)
  const editedDaily = useStore((state) => state.editedDaily)
  const { createTryMutation, updateTryMutation } = useMutateTry()

  const tryHandleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (editedTry.id) {
      await updateTryMutation.mutateAsync(editedTry)
    } else {
      await createTryMutation.mutateAsync(editedTry)
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
