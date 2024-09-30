import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface EvaluationCriteriaSetup {
  criteria: Array<{ name: string; description: string; weight: number }>
  markTags: {
    mark1Tag: string
    mark2Tag: string
    mark3Tag: string
    mark4Tag: string
    mark5Tag: string
  }
}

interface EvaluationResult {
  // picture is an url
  user: { name: string; picture: string }
  marks: number[]
  comment: string
}

const initialState = {
  otherRecruitments: [] as Array<{ name: string; uuid: string }>,
  evaluatorsCanEvaluate: false,
  currentRecruitment: {
    name: '',
    uuid: '',
    googleScriptsToken: '',
    canEvaluatorsEvaluate: false,
    gradingInstruction: '',
    fieldsNotToShow: [] as Array<string>,
    fieldToDistinctTheSurvey: '',
    evaluationCriteriaSetup: {
      criteria: [
        {
          name: 'Przykładowe kryterium',
          description: 'Opis przykładowego kryterium',
          weight: 1,
        },
      ],
      markTags: {
        mark1Tag: '',
        mark2Tag: '',
        mark3Tag: '',
        mark4Tag: '',
        mark5Tag: '',
      },
    } as EvaluationCriteriaSetup,
    anyEvaluationExists: false,
    anySurveyExists: false,
    shouldBeDeleted: false,
  },
  demoEvaluationState: {
    user: {
      name: 'John Doe',
      picture:
        'data:image/jpeg;base64,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',
    },
    marks: [3],
    comment: 'Jestem komentarzem',
  } as EvaluationResult,
}

const surveySettingsPageSlice = createSlice({
  name: 'surveySettingsPage',
  initialState: initialState,
  reducers: {
    setEvaluatorsCanEvaluate: (state, action) => {
      state.evaluatorsCanEvaluate = action.payload
    },
    setGradingInstruction: (state, action) => {
      state.currentRecruitment.gradingInstruction = action.payload
    },
  },
})

// Export actions for dispatching
export const { setEvaluatorsCanEvaluate } = surveySettingsPageSlice.actions

// Reducer to be added to the store
export default surveySettingsPageSlice.reducer

// Selectors
export const getEvaluatorsCanEvaluate = (state: RootState) => state.surveySettingsPage.evaluatorsCanEvaluate
export const getGradingInstruction = (state: RootState) =>
  state.surveySettingsPage.currentRecruitment.gradingInstruction
