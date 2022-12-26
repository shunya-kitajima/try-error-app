import React from 'react'

type Props = {
  id: string
  user_id: string
  year: string
  month: string
  date: string
}

const DailyItem: React.FC<Props> = ({ id, user_id, year, month, date }) => {
  return <li>{`${year}/${month}/${date}`}</li>
}

export default DailyItem
