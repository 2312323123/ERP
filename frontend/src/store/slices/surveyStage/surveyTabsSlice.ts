import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

// Create a simple slice with an initial state and one reducer
const surveyTabsSlice = createSlice({
  name: 'surveyTabs',
  initialState: { tabIndex: 0 },
  reducers: {
    setTabIndex: (state, action) => {
      state.tabIndex = action.payload
    },
  },
})

// Export the action for dispatching
export const { setTabIndex } = surveyTabsSlice.actions

// Export the reducer to be added to the store
export default surveyTabsSlice.reducer

// Export a selector for the counter value
export const getSurveyTabIndex = (state: RootState) => state.surveyTabs.tabIndex
