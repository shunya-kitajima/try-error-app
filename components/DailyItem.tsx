import React from 'react'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/solid'
import { useMutateDaily } from '../hooks/useMutateDaily'

type Props = {
  id: string
  year: string
  month: string
  date: string
}

const DailyItem: React.FC<Props> = ({ id, year, month, date }) => {
  const { deleteDailyMutation } = useMutateDaily()

  return (
    <li className="my-3">
      <Link href={`/daily/${id}`} prefetch={false}>
        <a className="cursor-pointer hover:text-pink-600">{`${year}/${month}/${date}`}</a>
      </Link>
      <div className="flex">
        <TrashIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteDailyMutation.mutate(id)}
        />
      </div>
    </li>
  )
}

export default DailyItem
