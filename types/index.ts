export type Daily = {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  year: string
  month: string
  day: string
}

export type EditedDaily = {
  id: string
  year: string
  month: string
  day: string
}

export type Try = {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  daily_id: string
  try: string
  result: string
}

export type EditedTry = {
  id: string
  try: string
  result: string
}