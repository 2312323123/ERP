import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export type _Availability = {
  start: number
  end: number
}[]

export interface UserAvailibilityInfo {
  id: string
  availability: _Availability
}

// Define a service using a base URL and expected endpoints
export const availabilityApi = createApi({
  reducerPath: 'availabilityApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAvailability: builder.query<UserAvailibilityInfo[], string[]>({
      query: (ids) => `api/availability/${ids.length ? '?' : ''}${ids.map((id) => `ids=${id}`).join('&')}`,
      providesTags: [{ type: 'Availability', id: 'GET_AVAILABILITY' }],
    }),
    updateUserAvailability: builder.mutation<UserAvailibilityInfo, { availability: _Availability }>({
      query: ({ availability }) => ({
        url: 'api/availability',
        method: 'POST',
        body: { availability },
      }),
      invalidatesTags: [{ type: 'Availability', id: 'GET_AVAILABILITY' }],
    }),
  }),
  tagTypes: ['Availability'],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAvailabilityQuery, useUpdateUserAvailabilityMutation } = availabilityApi
