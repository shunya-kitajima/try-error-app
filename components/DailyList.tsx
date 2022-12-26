import React from 'react'
import useStore from '../store'
import { useQueryDaily } from '../hooks/useQueryDaily'
import DailyItem from './DailyItem'

export const DailyList: React.FC = () => {
  const session = useStore((state) => state.session)
  const { data: dailies } = useQueryDaily(session?.user?.id!)

  return (
    <>
      <ul>
        {dailies?.map((daily) => (
          <DailyItem
            key={daily.id}
            id={daily.id}
            user_id={daily.user_id}
            year={daily.year}
            month={daily.month}
            date={daily.date}
          />
        ))}
      </ul>
    </>
  )
}
