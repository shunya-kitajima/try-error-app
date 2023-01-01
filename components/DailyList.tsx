import React from 'react'
import { supabase } from '../utils/supabase'
import { useQueryDaily } from '../hooks/useQueryDaily'
import DailyItem from './DailyItem'

const DailyList: React.FC = () => {
  const { data: dailies } = useQueryDaily(supabase.auth.user()?.id!)

  return (
    <ul>
      {dailies?.map((daily) => (
        <DailyItem
          key={daily.id}
          id={daily.id}
          year={daily.year}
          month={daily.month}
          date={daily.date}
        />
      ))}
    </ul>
  )
}

export default DailyList
