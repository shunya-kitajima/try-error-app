import React from 'react'
import Link from 'next/link'

const DailyForm: React.FC = () => {
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
        />
        <textarea
          cols={40}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="result"
        />
        <button
          type="button"
          className="w-25 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          create
        </button>
      </div>
    </>
  )
}

export default DailyForm
