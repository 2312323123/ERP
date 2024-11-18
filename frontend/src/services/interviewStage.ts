import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import { UserIdNamePicture } from './surveyStage'

interface InterviewsMainPage {
  fieldToDistinctTheSurvey1: string
  fieldToDistinctTheSurvey2: string
  interviews: Array<{
    survey_uuid: string
    fieldToDistinctTheSurvey1Value: string
    fieldToDistinctTheSurvey2Value: string | undefined
    interviewerId: string | null
    helper1Id: string | null
    helper2Id: string | null
    interviewerOpinion: string | null
    helper1Opinion: string | null
    helper2Opinion: string | null
  }>
}

interface InterviewsSettingsPage {
  fieldToDistinctTheSurvey1: string
  fieldToDistinctTheSurvey2: string
  interviews: Array<{
    survey_uuid: string
    fieldToDistinctTheSurvey1Value: string
    fieldToDistinctTheSurvey2Value: string | undefined
    interviewerId: string | null
    helper1Id: string | null
    helper2Id: string | null
  }>
  notInterviewed: Array<{
    survey_uuid: string
    fieldToDistinctTheSurvey1Value: string
    fieldToDistinctTheSurvey2Value: string | undefined
  }>
}

export interface CreateInterviewDto {
  recruit_uuid: string
  interviewer_uuid?: string
  helper_1_uuid?: string
  helper_2_uuid?: string
}

export interface UpdateInterviewDto extends CreateInterviewDto {
  interviewer_review?: string
  helper_1_review?: string
  helper_2_review?: string
}

// Define a service using a base URL and expected endpoints
export const interviewStageApi = createApi({
  reducerPath: 'interviewStageApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createInterview: builder.mutation<void, CreateInterviewDto>({
      query: (createInterviewDto: CreateInterviewDto) => ({
        url: 'api/interviews/interview',
        method: 'POST',
        body: { createInterviewDto },
      }),
      invalidatesTags: [
        { type: 'InterviewRecruitment', id: 'MAIN_PAGE' },
        { type: 'InterviewRecruitment', id: 'SETTINGS_PAGE' },
      ],
    }),
    deleteInterview: builder.mutation<void, { recruitUuid: string }>({
      query: ({ recruitUuid }) => ({
        url: 'api/interviews/interview',
        method: 'DELETE',
        body: { recruit_uuid: recruitUuid },
      }),
      invalidatesTags: [
        { type: 'InterviewRecruitment', id: 'MAIN_PAGE' },
        { type: 'InterviewRecruitment', id: 'SETTINGS_PAGE' },
      ],
    }),
    setOpinion: builder.mutation<void, UpdateInterviewDto>({
      query: (updateInterviewDto: UpdateInterviewDto) => ({
        url: 'api/interviews/interview',
        method: 'PUT',
        body: { updateInterviewDto },
      }),
      invalidatesTags: [{ type: 'InterviewRecruitment', id: 'MAIN_PAGE' }],
    }),
    setInterviewIdentificationField2: builder.mutation<void, { surveyUuid: string; value: string }>({
      query: ({ surveyUuid, value }) => ({
        url: 'api/interviews/interview-identification-field-2',
        method: 'POST',
        body: {
          survey_uuid: surveyUuid,
          value,
        },
      }),
      invalidatesTags: [
        { type: 'InterviewRecruitment', id: 'MAIN_PAGE' },
        { type: 'InterviewRecruitment', id: 'SETTINGS_PAGE' },
      ],
    }),
    getInterviewMainPage: builder.query<InterviewsMainPage, void>({
      query: () => 'api/interviews/interviews-main-page',
      providesTags: [{ type: 'InterviewRecruitment', id: 'MAIN_PAGE' }],
    }),
    getUsersIdsNamesPictures: builder.query<UserIdNamePicture[], void>({
      query: () => 'api/auth/get-users-id-name-picture',
    }),
    getInterviewSettingsPage: builder.query<InterviewsSettingsPage, void>({
      query: () => 'api/interviews/interviews-settings-page',
      providesTags: [{ type: 'InterviewRecruitment', id: 'SETTINGS_PAGE' }],
    }),
  }),
  tagTypes: ['InterviewRecruitment'], // Keep the tag type for interview recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateInterviewMutation,
  useDeleteInterviewMutation,
  useSetOpinionMutation,
  useSetInterviewIdentificationField2Mutation,
  useGetInterviewMainPageQuery,
  useGetUsersIdsNamesPicturesQuery,
  useGetInterviewSettingsPageQuery,
} = interviewStageApi
