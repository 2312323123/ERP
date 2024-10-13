import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

// Define a service using a base URL and expected endpoints
export const erpApi = createApi({
  reducerPath: 'erpApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:10016/' }),
  endpoints: (builder) => ({
    getAllRecruitments: builder.query<SurveyRecruitment[], void>({
      query: () => 'api/surveys/all-recruitments-uuid-name-start-date',
      providesTags: [{ type: 'SurveyRecruitment', id: 'LIST' }], // Add this
    }),

    getActiveRecruitment: builder.query<ActiveRecruitment, void>({
      query: () => 'api/surveys/active-recruitment-name-uuid',
      providesTags: [{ type: 'SurveyRecruitment', id: 'ACTIVE' }], // Add this
    }),

    // Define the POST mutation
    createRecruitment: builder.mutation<SurveyRecruitment, Partial<SurveyRecruitment>>({
      query: (newRecruitment) => ({
        url: 'api/surveys/create-recruitment',
        method: 'POST',
        body: newRecruitment,
      }),
      onQueryStarted: async (newRecruitment, { dispatch, queryFulfilled }) => {
        try {
          // Wait for the mutation to finish
          await queryFulfilled

          // Invalidate the cached data for the list to trigger a refetch
          dispatch(erpApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'LIST' }]))
        } catch (error) {
          console.error('Error creating recruitment', error)
        }
      },
    }),
  }),
  tagTypes: ['SurveyRecruitment'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllRecruitmentsQuery, useGetActiveRecruitmentQuery, useCreateRecruitmentMutation } = erpApi
