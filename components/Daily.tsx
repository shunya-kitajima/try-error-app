import React, { useState } from 'react'
import useStore from '../store'
import { DailyForm } from './DailyForm'
import { TryForm } from './TryForm'
import { EditedTry } from '../types'
import { TryList } from './TryList'

export const Daily: React.FC = () => {
  const editedDaily = useStore((state) => state.editedDaily)
  const [editedTry, setEditedTry] = useState<EditedTry>({
    id: '',
    user_id: '',
    daily_id: '',
    try: '',
    result: '',
  })

  return (
    <>
      <DailyForm editedDaily={editedDaily} />
      <TryForm
        editedDaily={editedDaily}
        editedTry={editedTry}
        setEditedTry={setEditedTry}
      />
      <TryList daily_id={editedDaily.id} setEditedTry={setEditedTry} />
    </>
  )
}
