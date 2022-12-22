import React from 'react'
import { DailyForm } from '../components/DailyForm'
import { DailyList } from './DailyList'

export const Dailies: React.FC = () => {
  return (
    <>
      <DailyForm />
      <DailyList />
    </>
  )
}
