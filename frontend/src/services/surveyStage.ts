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

interface UserIdNamePicture {
  id: string
  name: string
  picture: string
}
export interface UserEvaluation extends UserIdNamePicture {
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
    getCriteria: builder.query<SurveySettingsImported, void>({
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
      invalidatesTags: [
        { type: 'SurveyRecruitment', id: 'NOT_EVALUATED_ONE' },
        { type: 'SurveyRecruitment', id: 'ALL_EVALUATIONS' },
      ],
    }),
    // same as above, but PUT and different invalidation
    saveReEvaluation: builder.mutation<void, SurveyEvaluationToSend>({
      query: ({ surveyUuid, marks, comment }) => ({
        url: 'api/surveys/evaluation/evaluate',
        method: 'PUT',
        body: {
          survey_uuid: surveyUuid,
          marks,
          comment,
        },
      }),
      invalidatesTags: [
        { type: 'SurveyRecruitment', id: 'ALL_EVALUATIONS' },
      ],
    }),
    getAllEvaluations: builder.query<UserEvaluation[] | null, string>({
      query: (surveyUuid) => `api/surveys/evaluation/all-evaluations?survey_uuid=${surveyUuid}`,
      providesTags: [{ type: 'SurveyRecruitment', id: 'ALL_EVALUATIONS' }],
    }),
    getPreviousSurveyUuid: builder.query<{ uuid: string } | null, string>({
      query: (uuid) => `api/surveys/evaluation/previous-survey-uuid?current_survey_uuid=${uuid}`,
    }),
    getNextSurveyUuid: builder.query<{ uuid: string } | null, string>({
      query: (uuid) => `api/surveys/evaluation/next-survey-uuid?current_survey_uuid=${uuid}`,
    }),
  }),
  tagTypes: ['SurveyRecruitment'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetNotEvaluatedOneQuery,
  useGetSurveyQuery,
  useGetCriteriaQuery,
  useSaveEvaluationMutation,
  useSaveReEvaluationMutation,
  useGetAllEvaluationsQuery,
  useGetPreviousSurveyUuidQuery,
  useGetNextSurveyUuidQuery,
} = surveyStageApi
