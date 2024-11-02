import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiPathBase } from '../config/constants'

interface logoutBody {
  id: string
  refresh_token: string
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiPathBase + '/' }),
  endpoints: (builder) => ({
    logout: builder.mutation<void, logoutBody>({
      query: ({ id, refresh_token }: logoutBody) => {
        return {
          url: 'api/auth/logout',
          method: 'POST',
          body: { id, refresh_token },
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLogoutMutation } = authApi
