import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { Daily } from '../types'

export const useQueryDaily = (userId: string) => {
  const getDailies = async () => {
    const { data, error } = await supabase
      .from('dailies')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data
  }

  return useQuery<Daily[], Error>({
    queryKey: ['dailies'],
    queryFn: getDailies,
    staleTime: Infinity,
  })
}
