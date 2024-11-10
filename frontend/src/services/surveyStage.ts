import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { SurveySettingsImported } from './erp'

interface Survey {
  uuid: string
  responses: Array<{ question: string; type: string; answer: string | string[] | null }>
  timestamp: Date
}

export interface SurveyEvaluationToSend {
  surveyUuid: string
  marks: number[]
  comment: string
}

// Define a service using a base URL and expected endpoints
export const surveyStageApi = createApi({
  reducerPath: 'surveyStageApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotEvaluatedOne: builder.query<Survey, void>({
      query: () => 'api/surveys/evaluation/not-evaluated-one',
      providesTags: [{ type: 'SurveyRecruitment', id: 'NOT_EVALUATED_ONE' }],
    }),
    getSurvey: builder.query<Survey, string>({
      query: (uuid) => `api/surveys/survey?uuid=${uuid}`,
      providesTags: [{ type: 'SurveyRecruitment', id: 'SURVEY' }],
    }),
    getCriteria: builder.query<SurveySettingsImported, string>({
      query: () => 'api/surveys/evaluation/criteria',
      providesTags: [{ type: 'SurveyRecruitment', id: 'CRITERIA' }], // TODO: make changing survey settings refresh it
    }),
    saveEvaluation: builder.mutation<void, SurveyEvaluationToSend>({
      query: ({ surveyUuid, marks, comment }) => ({
        url: 'api/surveys/evaluation/evaluate',
        method: 'POST',
        body: {
          survey_uuid: surveyUuid,
          marks,
          comment,
        },
      }),
      // made it not invalidate NOT_EVALUATED_ONE, it caused a loop
    }),
  }),
  tagTypes: ['SurveyRecruitment'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotEvaluatedOneQuery, useGetSurveyQuery, useGetCriteriaQuery, useSaveEvaluationMutation } =
  surveyStageApi
