import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import { Daily, EditedDaily } from '../types'

export const useMutateDaily = () => {
  const queryClient = useQueryClient()

  const createDailyMutation = useMutation(
    async (daily: Omit<Daily, 'id' | 'created_at' | 'tries'>) => {
      const { data, error } = await supabase.from('dailies').insert(daily)
      if (error) throw new Error(error.message)
      return data[0]
    },
    {
      onSuccess: (res) => {
        let previousDailies = queryClient.getQueryData<Daily[]>(['dailies'])
        if (!previousDailies) previousDailies = []
        queryClient.setQueryData(['dailies'], [...previousDailies, res])
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
      onSuccess: (res, variables) => {
        let previousDailies = queryClient.getQueryData<Daily[]>(['dailies'])
        if (!previousDailies) previousDailies = []
        queryClient.setQueryData(
          ['dailies'],
          previousDailies.map((daily) =>
            daily.id === variables.id ? res : daily
          )
        )
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
      onSuccess: (_, variables) => {
        let previousDailies = queryClient.getQueryData<Daily[]>(['dailies'])
        if (!previousDailies) previousDailies = []
        queryClient.setQueryData(
          ['dailies'],
          previousDailies.filter((daily) => daily.id !== variables)
        )
      },
      onError: (err: any) => {
        throw new Error(err.message)
      },
    }
  )

  return { createDailyMutation, updateDailyMutation, deleteDailyMutation }
}
