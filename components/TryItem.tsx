import React, { Dispatch, SetStateAction } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutateTry } from '../hooks/useMutateTry'
import { EditedTry } from '../types'

type Props = {
  id: string
  daily_id: string
  paramTry: string
  result: string
  setEditedTry: Dispatch<SetStateAction<EditedTry>>
}

export const TryItem: React.FC<Props> = ({
  id,
  daily_id,
  paramTry,
  result,
  setEditedTry,
}) => {
  const { deleteTryMutation } = useMutateTry()

  return (
    <li className="my-3 flex items-center justify-between">
      <div className="flex">{paramTry}</div>
      <div className="flex">{result}</div>
      <div className="flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() =>
            setEditedTry({
              id: id,
              daily_id: daily_id,
              try: paramTry,
              result: result,
            })
          }
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteTryMutation.mutate(id)}
        />
      </div>
    </li>
  )
}
