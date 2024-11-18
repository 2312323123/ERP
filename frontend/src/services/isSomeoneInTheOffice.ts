import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isSomeoneInTheOfficeBaseUrl } from '../config/constants'

// Define a service using a base URL and expected endpoints
export const isSomeoneInTheOfficeApi = createApi({
  reducerPath: 'isSomeoneInTheOfficeApi',
  baseQuery: fetchBaseQuery({ baseUrl: isSomeoneInTheOfficeBaseUrl }),
  endpoints: (builder) => ({
    getIsSomeoneInTheOffice: builder.query<boolean, void>({
      query: () => `status`,
      providesTags: [{ type: 'IsSomeoneInTheOffice', id: 'STATUS' }],
    }),
  }),
  tagTypes: ['IsSomeoneInTheOffice'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetIsSomeoneInTheOfficeQuery } = isSomeoneInTheOfficeApi
