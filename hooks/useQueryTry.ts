import { useQuery } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { Try } from '../types'

const useQueryTry = () => {
  const getTries = async () => {
    const { data, error } = await supabase
      .from('tries')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw new Error(error.message)
    return data
  }

  return useQuery<Try[], Error>({
    queryKey: ['tries'],
    queryFn: getTries,
    staleTime: Infinity,
  })
}

export default useQueryTry
