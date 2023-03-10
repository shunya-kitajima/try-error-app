import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { Try } from '../types'

export const useQueryTry = (dailyId: string) => {
  const getTries = async () => {
    const { data, error } = await supabase
      .from('tries')
      .select('*')
      .eq('daily_id', dailyId)
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data
  }

  return useQuery<Try[], Error>({
    queryKey: ['tries'],
    queryFn: getTries,
    staleTime: 0,
  })
}
