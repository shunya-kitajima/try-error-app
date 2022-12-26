import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import {
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { DailyList } from './DailyList'

export const DashBoard: React.FC = () => {
  const queryClient = useQueryClient()

  const signOut = () => {
    queryClient.removeQueries(['dailies'])
    supabase.auth.signOut()
  }

  return (
    <>
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <Link href={'/daily'} prefetch={false}>
        <button
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          add Daily
        </button>
      </Link>
      <DailyList />
    </>
  )
}
