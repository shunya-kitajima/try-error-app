export type Daily = {
  id: string
  created_at: string
  user_id: string | undefined
  year: string
  month: string
  date: string
  ymd: string
}

export type Try = {
  id: string
  created_at: string
  user_id: string
  daily_id: string
  try: string
  result: string
}

export type EditedDaily = Omit<Daily, 'created_at' | 'user_id' | 'ymd'>

export type EditedTry = Omit<Try, 'created_at' | 'user_id'>
