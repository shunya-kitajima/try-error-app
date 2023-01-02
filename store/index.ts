import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedDaily, EditedTry } from '../types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedDaily: EditedDaily
  updateEditedDaily: (payload: EditedDaily) => void
  resetEditedDaily: () => void
  editedTry: EditedTry
  updateEditedTry: (payload: EditedTry) => void
  resetEditedTry: () => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedDaily: { id: '', year: '', month: '', date: '' },
  updateEditedDaily: (payload) =>
    set({
      editedDaily: {
        id: payload.id,
        year: payload.year,
        month: payload.month,
        date: payload.date,
      },
    }),
  resetEditedDaily: () =>
    set({
      editedDaily: { id: '', year: '', month: '', date: '' },
    }),
  editedTry: { id: '', user_id: '', daily_id: '', try: '', result: '' },
  updateEditedTry: (payload) =>
    set({
      editedTry: {
        id: payload.id,
        daily_id: payload.daily_id,
        try: payload.try,
        result: payload.result,
      },
    }),
  resetEditedTry: () =>
    set({
      editedTry: { id: '', daily_id: '', try: '', result: '' },
    }),
}))

export default useStore
