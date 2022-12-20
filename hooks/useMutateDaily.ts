import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Daily, EditedDaily } from '../types'

export const useMutateDaily = () => {
  const queryClient = useQueryClient()
  const resetEditedDaily = useStore((state) => state.resetEditedDaily)

  const createDailyMutation = useMutation(
    async (
      daily: Omit<Daily, 'id' | 'created_at' | 'updated_at' | 'user_id'>
    ) => {
      const { data, error } = await supabase.from('dailies').insert(daily)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        let previousDailies = queryClient.getQueryData<Daily[]>(['dailies'])
        if (!previousDailies) previousDailies = []
        queryClient.setQueryData(['dailies'], [...previousDailies, res[0]])
        resetEditedDaily()
      },
      onError: (err: any) => {
        resetEditedDaily()
        throw new Error(err.message)
      },
    }
  )

  return {}
}

export default useMutateDaily
