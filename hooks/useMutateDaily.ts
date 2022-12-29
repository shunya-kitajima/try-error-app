import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Daily, EditedDaily } from '../types'

export const useMutateDaily = () => {
  const queryClient = useQueryClient()
  const resetEditedDaily = useStore((state) => state.resetEditedDaily)

  const createDailyMutation = useMutation(
    async (daily: Omit<Daily, 'id' | 'created_at' | 'tries'>) => {
      const { data, error } = await supabase.from('dailies').insert(daily)
      if (error) throw new Error(error.message)
      return data[0]
    },
    {
      onError: (err: any) => {
        resetEditedDaily()
        throw new Error(err.message)
      },
    }
  )

  const updateDailyMutation = useMutation(
    async (daily: EditedDaily) => {
      const { data, error } = await supabase
        .from('dailies')
        .update({ year: daily.year, month: daily.month, date: daily.date })
        .eq('id', daily.id)
      if (error) throw new Error(error.message)
      return data[0]
    },
    {
      onError: (err: any) => {
        resetEditedDaily()
        throw new Error(err.message)
      },
    }
  )

  const deleteDailyMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase
        .from('dailies')
        .delete()
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onError: (err: any) => {
        resetEditedDaily()
        throw new Error(err.message)
      },
    }
  )

  return { createDailyMutation, updateDailyMutation, deleteDailyMutation }
}
