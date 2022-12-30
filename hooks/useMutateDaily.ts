import { useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { revalidateList, revalidateSingle } from '../utils/revalidation'
import { Daily, EditedDaily } from '../types'

export const useMutateDaily = () => {
  const createDailyMutation = useMutation(
    async (daily: Omit<Daily, 'id' | 'created_at' | 'tries'>) => {
      const { data, error } = await supabase.from('dailies').insert(daily)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        revalidateList()
      },
      onError: (err: any) => {
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
      return data
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res[0].id)
      },
      onError: (err: any) => {
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
      onSuccess: () => {
        revalidateList()
      },
      onError: (err: any) => {
        throw new Error(err.message)
      },
    }
  )

  return { createDailyMutation, updateDailyMutation, deleteDailyMutation }
}
