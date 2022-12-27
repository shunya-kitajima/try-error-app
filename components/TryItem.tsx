import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutateTry } from '../hooks/useMutateTry'

type Props = {
  id: string
  user_id: string
  daily_id: string
  paramTry: string
  result: string
}

export const TryItem: React.FC<Props> = ({
  id,
  user_id,
  daily_id,
  paramTry,
  result,
}) => {
  const { deleteTryMutation } = useMutateTry()

  return (
    <li className="my-3 flex items-center justify-between">
      <div className="flex">{paramTry}</div>
      <div className="flex">{result}</div>
      <div className="flex">
        <PencilIcon className="mx-1 h-5 w-5 cursor-pointer text-blue-500" />
        <TrashIcon className="h-5 w-5 cursor-pointer text-blue-500" />
      </div>
    </li>
  )
}
