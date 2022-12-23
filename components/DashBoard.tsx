import React from 'react'
import Link from 'next/link'
import {
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'
import { Layout } from './Layout'
import { Dailies } from './Dailies'

export const DashBoard: React.FC = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <Layout title="Try and Error">
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
      <Dailies />
    </Layout>
  )
}
