import React from 'react'
import { supabase } from '../utils/supabase'
import { useQueryDaily } from '../hooks/useQueryDaily'
import { DailyItem } from './DailyItem'

export const DailyList: React.FC = () => {
  const { data: dailies } = useQueryDaily(supabase.auth.user()?.id!)
  const sortedDailies = dailies?.sort((a, b) => {
    return a.ymd < b.ymd ? 1 : -1
  })
  const yearMonthArray: string[] = []
  sortedDailies?.map((daily) => {
    if (!yearMonthArray.includes(`${daily.year}/${daily.month}`))
      yearMonthArray.push(`${daily.year}/${daily.month}`)
  })

  return (
    <ul data-testid="ul-daily">
      {sortedDailies?.map((daily, i) => (
        <DailyItem
          key={daily.id}
          id={daily.id}
          year={daily.year}
          month={daily.month}
          date={daily.date}
          index={i}
        />
      ))}
    </ul>
  )
}
