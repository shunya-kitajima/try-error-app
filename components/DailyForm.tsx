import React from 'react'
import Link from 'next/link'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import useMutateDaily from '../hooks/useMutateDaily'

const DailyForm: React.FC = () => {
  const { editedDaily } = useStore()
  const { editedTry } = useStore()
  const updateEditedTry = useStore((state) => state.updateEditedTry)

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
        >
          submit
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

export default DailyForm
