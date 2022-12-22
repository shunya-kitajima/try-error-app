import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Daily, EditedDaily } from '../types'

export const useMutateDaily = () => {
  const queryClient = useQueryClient()
  const resetEditedDaily = useStore((state) => state.resetEditedDaily)

  const createDailyMutation = useMutation(
    async (daily: Omit<EditedDaily, 'id'>) => {
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

  const updateDailyMutation = useMutation(
    async (daily: EditedDaily) => {
      const { data, error } = await supabase
        .from('dailies')
        .update({ year: daily.year, month: daily.month, day: daily.day })
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
            daily.id === variables.id ? res[0] : daily
          )
        )
        resetEditedDaily()
      },
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
      onSuccess: (_, variables) => {
        let previousDailies = queryClient.getQueryData<Daily[]>(['dailies'])
        if (!previousDailies) previousDailies = []
        queryClient.setQueryData(
          ['dailies'],
          previousDailies.filter((daily) => daily.id !== variables)
        )
        resetEditedDaily()
      },
      onError: (err: any) => {
        resetEditedDaily()
        throw new Error(err.message)
      },
    }
  )

  return { createDailyMutation, updateDailyMutation, deleteDailyMutation }
}

export default useMutateDaily