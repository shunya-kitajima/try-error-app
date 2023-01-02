import React from 'react'
import { useQueryTry } from '../hooks/useQueryTry'
import { TryItem } from './TryItem'

type Props = {
  daily_id: string
}

export const TryList: React.FC<Props> = ({ daily_id }) => {
  const { data: tries } = useQueryTry(daily_id)

  return (
    <ul>
      {tries?.map((tr) => (
        <TryItem
          key={tr.id}
          id={tr.id}
          daily_id={tr.daily_id}
          paramTry={tr.try}
          result={tr.result}
        />
      ))}
    </ul>
  )
}
