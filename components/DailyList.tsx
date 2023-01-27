import React from 'react'
import { supabase } from '../utils/supabase'
import { useQueryDaily } from '../hooks/useQueryDaily'
import { DailyItem } from './DailyItem'
import { Daily } from '../types'

export const DailyList: React.FC = () => {
  const { data: dailies } = useQueryDaily(supabase.auth.user()?.id!)
  const sortedDailies = dailies?.sort((a, b) => {
    return a.ymd < b.ymd ? 1 : -1
  })
  const yearMonthArray: string[] = []
  const yearMonthData: any[] = []
  sortedDailies?.map((daily) => {
    if (!yearMonthArray.includes(`${daily.year}/${daily.month}`)) {
      yearMonthArray.push(`${daily.year}/${daily.month}`)
      yearMonthData.push({
        [`${daily.year}/${daily.month}`]: sortedDailies?.filter(
          (data) => daily.year === data.year && daily.month === data.month
        ),
      })
    }
  })

  return (
    <>
      {yearMonthData?.map((yearMonth, i) => (
        <details key={i} open={i === 0 ? true : false}>
          <summary className="cursor-pointer hover:text-pink-600">
            {yearMonthArray[i]}
          </summary>
          <ul>
            {yearMonth[yearMonthArray[i]].map((daily: Daily, j: number) => (
              <DailyItem
                key={daily.id}
                id={daily.id}
                year={daily.year}
                month={daily.month}
                date={daily.date}
                index={j}
              />
            ))}
          </ul>
        </details>
      ))}
    </>
  )
}
