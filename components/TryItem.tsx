import React, { memo } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import useStore from '../store'
import { useMutateTry } from '../hooks/useMutateTry'

type Props = {
  id: string
  daily_id: string
  paramTry: string
  result: string
  index: number
}

const TryItem: React.FC<Props> = ({
  id,
  daily_id,
  paramTry,
  result,
  index,
}) => {
  const { updateEditedTry } = useStore()
  const { deleteTryMutation } = useMutateTry()

  return (
    <li className="my-3 items-center">
      <div className="flex">
        <div data-testid={`try-${index}`} className="flex w-60 font-semibold">
          {paramTry}
        </div>
        <PencilIcon
          data-testid={`pencil-${index}`}
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
          data-testid={`trash-${index}`}
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteTryMutation.mutate(id)}
        />
      </div>
      <div
        data-testid={`result-${index}`}
        className="ml-2.5 flex whitespace-pre-wrap break-words"
      >
        {result}
      </div>
    </li>
  )
}

export const TryItemMemo = memo(TryItem)
