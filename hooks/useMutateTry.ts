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
        let previousTries = queryClient.getQueryData<Try[]>(['tries'])
        if (!previousTries) previousTries = []
        queryClient.setQueryData(['tries'], [...previousTries, res[0]])
        resetEditedTry()
      },
      onError: (err: any) => {
        resetEditedTry()
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
      return data
    },
    {
      onSuccess: (res, variables) => {
        let previousTries = queryClient.getQueryData<Try[]>(['tries'])
        if (!previousTries) previousTries = []
        queryClient.setQueryData(
          ['tries'],
          previousTries.map((paramTry) =>
            paramTry.id === variables.id ? res[0] : paramTry
          )
        )
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
