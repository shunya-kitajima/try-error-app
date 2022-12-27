import React, { Dispatch, SetStateAction } from 'react'
import { useQueryTry } from '../hooks/useQueryTry'
import { TryItem } from './TryItem'
import { EditedTry } from '../types'

type Props = {
  daily_id: string
  setEditedTry: Dispatch<SetStateAction<EditedTry>>
}

export const TryList: React.FC<Props> = ({ daily_id, setEditedTry }) => {
  const { data: tries } = useQueryTry(daily_id)

  return (
    <>
      <ul>
        {tries?.map((paramTry) => (
          <TryItem
            key={paramTry.id}
            id={paramTry.id}
            user_id={paramTry.user_id}
            daily_id={paramTry.daily_id}
            paramTry={paramTry.try}
            result={paramTry.result}
            setEditedTry={setEditedTry}
          />
        ))}
      </ul>
    </>
  )
}
