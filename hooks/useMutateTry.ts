import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Try, EditedTry } from '../types'

const useMutateTry = () => {
  const queryClient = useQueryClient()
  const resetEditedTry = useStore((state) => state.resetEditedTry)

  const createTryMutation = useMutation(
    async (paramTry: EditedTry) => {
      const { data, error } = await supabase.from('tries').insert(paramTry)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        let previousTryies = queryClient.getQueryData<Try[]>(['tries'])
        if (!previousTryies) previousTryies = []
        queryClient.setQueryData(['tryies'], [...previousTryies, res[0]])
        resetEditedTry()
      },
      onError: (err: any) => {
        resetEditedTry()
        throw new Error(err.message)
      },
    }
  )
}

export default useMutateTry
