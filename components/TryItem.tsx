import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '../store'
import { useMutateTry } from '../hooks/useMutateTry'

type Props = {
  id: string
  daily_id: string
  paramTry: string
  result: string
}

export const TryItem: React.FC<Props> = ({
  id,
  daily_id,
  paramTry,
  result,
}) => {
  const { updateEditedTry } = useStore()
  const { deleteTryMutation } = useMutateTry()

  return (
    <li className="my-3 flex items-center justify-between">
      <div className="flex">{paramTry}</div>
      <div className="flex">{result}</div>
      <div className="flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() =>
            updateEditedTry({
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
