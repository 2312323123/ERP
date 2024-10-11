// src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import surveySettingsPageReducer from './slices/surveyStage/surveySettingsPageSlice'
import surveyUniversalReducer from './slices/surveyStage/surveyUniversalSlice'

// Create the Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    surveySettingsPage: surveySettingsPageReducer,
    surveyUniversal: surveyUniversalReducer,
  },
})

// Optional: Set up typed hooks (useDispatch, useSelector)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
