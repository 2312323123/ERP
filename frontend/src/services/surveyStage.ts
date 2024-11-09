import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

interface Survey {
  uuid: string
  responses: Array<{ question: string; type: string; answer: unknown }>
  timestamp: Date
}

// Define a service using a base URL and expected endpoints
export const surveyStageApi = createApi({
  reducerPath: 'surveyStageApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getNotEvaluatedOne: builder.query<Survey, void>({
      query: () => 'api/surveys/evaluation/not-evaluated-one',
      providesTags: [{ type: 'SurveyRecruitment', id: 'ACCEPTS_SURVEYS' }],
    }),
    getSurvey: builder.query<Survey, string>({
      query: (uuid) => `api/surveys/survey?uuid=${uuid}`,
      providesTags: [{ type: 'SurveyRecruitment', id: 'SURVEY' }],
    }),
    getCriteria: builder.query<Survey, string>({
      query: () => 'api/surveys/evaluation/criteria',
      providesTags: [{ type: 'SurveyRecruitment', id: 'CRITERIA' }], // TODO: make changing survey settings refresh it
    }),
  }),
  tagTypes: ['SurveyRecruitment'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotEvaluatedOneQuery, useGetSurveyQuery, useGetCriteriaQuery } = surveyStageApi
