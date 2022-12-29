export type Try = {
  id: string
  created_at: string
  user_id: string
  daily_id: string
  try: string
  result: string
}

export type Daily = {
  id: string
  created_at: string
  user_id: string | undefined
  year: string
  month: string
  date: string
  tries: Try[]
}

export type EditedDaily = Omit<Daily, 'created_at' | 'user_id' | 'tries'>

export type EditedTry = Omit<Try, 'created_at' | 'user_id'>
