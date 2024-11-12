import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

// Define a TypeScript interface for the survey recruitment response
export interface SurveyRecruitment {
  uuid: string
  name: string
  startDate: string // or Date if you convert the string to a Date object
}

export interface ActiveRecruitment {
  uuid: string
  name: string
}

export interface SurveySettingsExported {
  gradingInstruction: string
  fieldsNotToShow: Array<string>
  fieldToDistinctTheSurvey: string
  evaluationCriteria: Array<{
    name: string
    description: string
    weight: number
  }>
  markTags: {
    mark1Tag: string
    mark2Tag: string
    mark3Tag: string
    mark4Tag: string
    mark5Tag: string
  }
}

export interface SurveySettingsImportedForEvaluation extends SurveySettingsExported {
  canEvaluateSurveys: boolean
  canPeopleSeeRecruitment: boolean
}

export interface SurveySettingsImported extends SurveySettingsExported {
  token: string
  isThereAnySurvey: boolean
  isThereAnyMark: boolean
}

// Define a service using a base URL and expected endpoints
export const erpApi = createApi({
  reducerPath: 'erpApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllRecruitments: builder.query<SurveyRecruitment[], void>({
      query: () => 'api/surveys/all-recruitments-uuid-name-start-date',
      providesTags: [{ type: 'SurveyRecruitment', id: 'LIST' }], // Add this
    }),

    getActiveRecruitment: builder.query<ActiveRecruitment, void>({
      query: () => 'api/surveys/active-recruitment-name-uuid',
      providesTags: [{ type: 'SurveyRecruitment', id: 'ACTIVE' }], // Add this
    }),

    setActiveRecruitment: builder.mutation<void, string>({
      query: (recruitmentUuid) => ({
        url: 'api/surveys/active-recruitment',
        method: 'POST',
        body: { recruitment_uuid: recruitmentUuid },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(erpApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'ACTIVE' }]))
        } catch (error) {
          console.error('Error setting active recruitment t5984rt54', error)
        }
      },
    }),

    getAcceptsSurveys: builder.query<{ accepts_surveys: boolean }, void>({
      query: () => 'api/surveys/accepts-surveys',
      providesTags: [{ type: 'SurveyRecruitment', id: 'ACCEPTS_SURVEYS' }],
    }),

    setAcceptsSurveys: builder.mutation<void, boolean>({
      query: (acceptsSurveys) => ({
        url: 'api/surveys/accepts-surveys',
        method: 'POST',
        body: { accepts_surveys: acceptsSurveys },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(erpApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'ACCEPTS_SURVEYS' }]))
        } catch (error) {
          console.error('Error setting accepts surveys', error)
        }
      },
    }),

    getRecruitmentVisible: builder.query<{ can_people_see_recruitment: boolean }, void>({
      query: () => 'api/surveys/can-people-see-recruitment',
      providesTags: [{ type: 'SurveyRecruitment', id: 'RECRUITMENT_VISIBLE' }],
    }),

    setRecruitmentVisible: builder.mutation<void, boolean>({
      query: (recruitmentVisible) => ({
        url: 'api/surveys/can-people-see-recruitment',
        method: 'POST',
        body: { can_people_see_recruitment: recruitmentVisible },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(erpApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'RECRUITMENT_VISIBLE' }]))
        } catch (error) {
          console.error('Error setting recruitment visible', error)
        }
      },
    }),

    getEvaluatorsCanEvaluate: builder.query<{ can_evaluate_surveys: boolean }, void>({
      query: () => 'api/surveys/can-evaluate-surveys',
      providesTags: [{ type: 'SurveyRecruitment', id: 'EVALUATE_SURVEYS' }],
    }),

    setEvaluatorsCanEvaluate: builder.mutation<void, boolean>({
      query: (canEvaluateSurveys) => ({
        url: 'api/surveys/can-evaluate-surveys',
        method: 'POST',
        body: { can_evaluate_surveys: canEvaluateSurveys },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(erpApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'EVALUATE_SURVEYS' }]))
        } catch (error) {
          console.error('Error setting evaluators can evaluate', error)
        }
      },
    }),

    // Define the POST mutation
    createRecruitment: builder.mutation<SurveyRecruitment, Partial<SurveyRecruitment>>({
      query: (newRecruitment) => ({
        url: 'api/surveys/create-recruitment',
        method: 'POST',
        body: newRecruitment,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(
            erpApi.util.invalidateTags([
              { type: 'SurveyRecruitment', id: 'LIST' },
              { type: 'SurveyRecruitment', id: 'ACTIVE' },
            ]),
          )
        } catch (error) {
          console.error('Error creating recruitment', error)
        }
      },
    }),

    saveRecruitmentSettings: builder.mutation<void, SurveySettingsExported>({
      query: (surveySettings) => ({
        url: 'api/surveys/save-survey-settings',
        method: 'POST',
        body: surveySettings,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(erpApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'SETTINGS' }]))
        } catch (error) {
          console.error('Error saving recruitment settings', error)
        }
      },
    }),

    getActiveRecruitmentSettings: builder.query<SurveySettingsImported, string>({
      query: () => 'api/surveys/active-recruitment-settings',
      providesTags: [
        { type: 'SurveyRecruitment', id: 'ACTIVE' },
        { type: 'SurveyRecruitment', id: 'SETTINGS' },
      ], // applies here too
    }),

    deleteRecruitment: builder.mutation<void, string>({
      query: (recruitmentUuid) => {
        console.log('recruitmentUuid:')
        console.log(recruitmentUuid)

        return {
          url: 'api/surveys/delete-recruitment',
          method: 'POST',
          body: { uuid: recruitmentUuid },
        }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(
            erpApi.util.invalidateTags([
              { type: 'SurveyRecruitment', id: 'SETTINGS' },
              { type: 'SurveyRecruitment', id: 'LIST' },
              { type: 'SurveyRecruitment', id: 'ACTIVE' },
            ]),
          )
        } catch (error) {
          console.error('Error deleting recruitment', error)
        }
      },
    }),

    getSurveyGradingInstruction: builder.query<{ grading_instruction: string }, void>({
      query: () => 'api/surveys/active-recruitemnt-grading-instruction',
    }),
  }),
  tagTypes: ['SurveyRecruitment'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllRecruitmentsQuery,
  useGetActiveRecruitmentQuery,
  useCreateRecruitmentMutation,
  useGetActiveRecruitmentSettingsQuery,
  useSetActiveRecruitmentMutation,
  useGetAcceptsSurveysQuery,
  useSetAcceptsSurveysMutation,
  useGetRecruitmentVisibleQuery,
  useSetRecruitmentVisibleMutation,
  useGetEvaluatorsCanEvaluateQuery,
  useSetEvaluatorsCanEvaluateMutation,
  useSaveRecruitmentSettingsMutation,
  useDeleteRecruitmentMutation,
  useGetSurveyGradingInstructionQuery,
} = erpApi
