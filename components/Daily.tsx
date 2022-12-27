import React, { useState } from 'react'
import { DailyForm } from './DailyForm'
import { TryForm } from './TryForm'
import { EditedTry } from '../types'

export const Daily: React.FC = () => {
  const [editedTry, setEditedTry] = useState<EditedTry>({
    id: '',
    user_id: '',
    daily_id: '',
    try: '',
    result: '',
  })

  return (
    <>
      <DailyForm />
      <TryForm editedTry={editedTry} setEditedTry={setEditedTry} />
    </>
  )
}
