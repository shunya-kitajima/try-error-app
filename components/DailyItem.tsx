import React from 'react'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/solid'
import { useMutateDaily } from '../hooks/useMutateDaily'

type Props = {
  id: string
  year: string
  month: string
  date: string
  index: number
}

export const DailyItem: React.FC<Props> = ({
  id,
  year,
  month,
  date,
  index,
}) => {
  const { deleteDailyMutation } = useMutateDaily()

  return (
    <li className="my-3 flex items-center justify-between">
      <Link
        href={`/daily/${id}`}
        prefetch={false}
        data-testid={`link-to-try-${index}`}
        className="cursor-pointer hover:text-pink-600"
      >
        {`${year}/${month}/${date}`}
      </Link>
      <div className="flex">
        <TrashIcon
          data-testid={`trash-daily-${year}/${month}/${date}`}
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteDailyMutation.mutate(id)}
        />
      </div>
    </li>
  )
}
