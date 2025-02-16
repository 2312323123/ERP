import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// by the time of creating this it's used for an alternative
// way to show snackbar, just by dispatching an action
// (this way it can be done from inside RTK Query hooks as well)
// (its useEffect is in App.tsx)
interface SnackbarStateProper {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
}
type SnackbarState = SnackbarStateProper | null

// Create a simple slice with an initial state and one reducer
const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: null as SnackbarState,
  reducers: {
    setSnackbar: (_, action: { payload: SnackbarState }) => {
      return action.payload
    },
  },
})

// Export the action for dispatching
export const { setSnackbar } = snackbarSlice.actions

// Export the reducer to be added to the store
export default snackbarSlice.reducer

// Export a selector for the snackbar value
export const getSnackbarValue = (state: RootState) => (state.snackbar ? state.snackbar : null)
