import React from 'react'
import Link from 'next/link'

const DailyForm: React.FC = () => {
  return (
    <>
      <Link href={'/'} prefetch={false}>
        <button
          type="button"
          className="flex w-full justify-center rounded-md bg-slate-50 px-4 py-2 text-sm text-indigo-600"
        >
          cancel
        </button>
      </Link>
    </>
  )
}

export default DailyForm
