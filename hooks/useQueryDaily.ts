import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { Daily } from '../types'

export const useQueryDaily = () => {
  const getDailies = async () => {
    const { data, error } = await supabase
      .from('dailies')
      .select('*')
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
