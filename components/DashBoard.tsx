import React from 'react'
import {
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import { supabase } from '../utils/supabase'

export const DashBoard: React.FC = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }

  return (
    <div>
      <ArrowRightOnRectangleIcon
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
    </div>
  )
}
