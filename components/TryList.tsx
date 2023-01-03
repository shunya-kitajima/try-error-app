import React, { memo } from 'react'
import { useQueryTry } from '../hooks/useQueryTry'
import { TryItemMemo } from './TryItem'

type Props = {
  daily_id: string
}

const TryList: React.FC<Props> = ({ daily_id }) => {
  const { data: tries } = useQueryTry(daily_id)

  return (
    <ul>
      {tries?.map((tr) => (
        <TryItemMemo
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

export const TryListMemo = memo(TryList)
