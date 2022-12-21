import type { NextPage } from 'next'
import DailyForm from '../components/DailyForm'

const daily: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <DailyForm />
    </div>
  )
}

export default daily
