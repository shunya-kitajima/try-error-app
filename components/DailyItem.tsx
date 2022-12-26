import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutateDaily } from '../hooks/useMutateDaily'

type Props = {
  id: string
  user_id: string
  year: string
  month: string
  date: string
}

const DailyItem: React.FC<Props> = ({ id, user_id, year, month, date }) => {
  const { deleteDailyMutation } = useMutateDaily()

  return (
    <li className="my-3 flex items-center justify-between">
      <div className="flex">{`${year}/${month}/${date}`}</div>
      <div className="flex">
        <PencilIcon className="mx-1 h-5 w-5 cursor-pointer text-blue-500" />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteDailyMutation.mutate(id)}
        />
      </div>
    </li>
  )
}

export default DailyItem
