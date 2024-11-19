import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import surveySettingsPageReducer from './slices/surveyStage/surveySettingsPageSlice'
import { erpApi } from '../services/erp' // Import the survey API
import authReducer from './slices/authSlice'
import { authApi } from '../services/auth'
import snackbarReducer from './slices/snackbarSlice'
import { surveyStageApi } from '../services/surveyStage'
import surveyTabsReducer from './slices/surveyStage/surveyTabsSlice'
import { interviewStageApi } from '../services/interviewStage'
import { isSomeoneInTheOfficeApi } from '../services/isSomeoneInTheOffice'
import { newsletterApi } from '../services/newsletter'

// Create the Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    surveySettingsPage: surveySettingsPageReducer,
    [erpApi.reducerPath]: erpApi.reducer, // Add erpApi reducer
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    snackbar: snackbarReducer,
    [surveyStageApi.reducerPath]: surveyStageApi.reducer,
    surveyTabs: surveyTabsReducer,
    [interviewStageApi.reducerPath]: interviewStageApi.reducer,
    [isSomeoneInTheOfficeApi.reducerPath]: isSomeoneInTheOfficeApi.reducer,
    [newsletterApi.reducerPath]: newsletterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(erpApi.middleware)
      .concat(authApi.middleware)
      .concat(surveyStageApi.middleware)
      .concat(interviewStageApi.middleware)
      .concat(isSomeoneInTheOfficeApi.middleware)
      .concat(newsletterApi.middleware), // Add middlewares
})

// Optional: Set up typed hooks (useDispatch, useSelector)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
