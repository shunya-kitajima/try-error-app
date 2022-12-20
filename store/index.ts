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
  editedDaily: { id: '', year: '', month: '', day: '' },
  updateEditedDaily: (payload) =>
    set({
      editedDaily: {
        id: payload.id,
        year: payload.year,
        month: payload.month,
        day: payload.day,
      },
    }),
  resetEditedDaily: () =>
    set({ editedDaily: { id: '', year: '', month: '', day: '' } }),
  editedTry: { id: '', try: '', result: '' },
  updateEditedTry: (payload) =>
    set({
      editedTry: { id: payload.id, try: payload.try, result: payload.result },
    }),
  resetEditedTry: () => set({ editedTry: { id: '', try: '', result: '' } }),
}))

export default useStore
