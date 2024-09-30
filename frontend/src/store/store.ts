// src/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit'

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

// Create the Redux store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
})

// Optional: Set up typed hooks (useDispatch, useSelector)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
