import React from 'react'
import useStore from '../store'
import { useQueryDaily } from '../hooks/useQueryDaily'

export const DailyList: React.FC = () => {
  const session = useStore((state) => state.session)
  const { data: dailies } = useQueryDaily(session?.user?.id!)

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
