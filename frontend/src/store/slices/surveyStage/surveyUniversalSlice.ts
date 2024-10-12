import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

interface SurveyUniversalState {
  acceptsSurveys?: boolean
  evaluatorsCanEvaluate?: boolean
  recruitmentVisible?: boolean
  activeRecruitment?: { name: string; uuid: string }
}

const initialState = {
  acceptsSurveys: undefined,
  recruitmentVisible: undefined,
  evaluatorsCanEvaluate: undefined,
  activeRecruitment: undefined,
} as SurveyUniversalState

const surveyUniversalSlice = createSlice({
  name: 'surveyUniversal',
  initialState: initialState,
  reducers: {
    setAcceptsSurveys: (state, action) => {
      state.acceptsSurveys = action.payload
    },
    setRectuitmentVisible: (state, action) => {
      state.recruitmentVisible = action.payload
    },
    setEvaluatorsCanEvaluate: (state, action) => {
      state.evaluatorsCanEvaluate = action.payload
    },
    setActiveRecruitment: (state, action) => {
      state.activeRecruitment = action.payload
    },
  },
})

// Export actions for dispatching
export const { setAcceptsSurveys, setRectuitmentVisible, setEvaluatorsCanEvaluate, setActiveRecruitment } =
  surveyUniversalSlice.actions

// Reducer to be added to the store
export default surveyUniversalSlice.reducer

// Selectors
export const getAcceptsSurveys = (state: RootState) => state.surveyUniversal.acceptsSurveys
export const getRecruitmentVisible = (state: RootState) => state.surveyUniversal.recruitmentVisible
export const getEvaluatorsCanEvaluate = (state: RootState) => state.surveyUniversal.evaluatorsCanEvaluate
export const getActiveRecruitment = (state: RootState) => state.surveyUniversal.activeRecruitment
