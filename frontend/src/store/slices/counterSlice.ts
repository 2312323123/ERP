import { createSlice } from '@reduxjs/toolkit'

// Create a simple slice with an initial state and one reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

// Export the action for dispatching
export const { increment } = counterSlice.actions

// Export the reducer to be added to the store
export default counterSlice.reducer
