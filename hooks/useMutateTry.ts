import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { revalidateSingle } from '../utils/revalidation'
import { Try, EditedTry } from '../types'

export const useMutateTry = () => {
  const queryClient = useQueryClient()
  const resetEditedTry = useStore((state) => state.resetEditedTry)

  const createTryMutation = useMutation(
    async (paramTry: Omit<EditedTry, 'id'>) => {
      const { data, error } = await supabase.from('tries').insert(paramTry)
      if (error) throw new Error(error.message)
      return data[0]
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res.daily_id)
      },
      onError: (err: any) => {
        throw new Error(err.message)
      },
    }
  )

  const updateTryMutation = useMutation(
    async (paramTry: EditedTry) => {
      const { data, error } = await supabase
        .from('tries')
        .update({ try: paramTry.try, result: paramTry.result })
        .eq('id', paramTry.id)
      if (error) throw new Error(error.message)
      return data[0]
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res.daily_id)
      },
      onError: (err: any) => {
        throw new Error(err.message)
      },
    }
  )

  const deleteTryMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('tries').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data[0]
    },
    {
      onSuccess: (res) => {
        revalidateSingle(res.daily_id)
      },
      onError: (err: any) => {
        throw new Error(err.message)
      },
    }
  )

  return { createTryMutation, updateTryMutation, deleteTryMutation }
}
