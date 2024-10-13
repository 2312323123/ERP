import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import surveySettingsPageReducer from './slices/surveyStage/surveySettingsPageSlice'
import surveyUniversalReducer from './slices/surveyStage/surveyUniversalSlice'
import { erpApi } from '../services/erp' // Import the survey API

// Create the Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    surveySettingsPage: surveySettingsPageReducer,
    surveyUniversal: surveyUniversalReducer,
    [erpApi.reducerPath]: erpApi.reducer, // Add erpApi reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(erpApi.middleware), // Add erpApi middleware
})

// Optional: Set up typed hooks (useDispatch, useSelector)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
