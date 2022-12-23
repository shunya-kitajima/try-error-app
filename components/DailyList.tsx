import React from 'react'
import { supabase } from '../utils/supabase'
import { useQueryDaily } from '../hooks/useQueryDaily'

export const DailyList: React.FC = () => {
  const currentSession = supabase.auth.session()
  const { data: dailies } = useQueryDaily(currentSession?.user?.id!)

  return (
    <>
      <ul>
        {dailies?.map((daily) => (
          <li key={daily.id}>{daily.id}</li>
        ))}
      </ul>
    </>
  )
}
