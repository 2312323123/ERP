import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

interface logoutBody {
  refresh_token: string
}

interface AccountCreationRequest {
  email: string
  email_verified: true
  family_name: string
  given_name: string
  id: string
  name: string
  picture: string
}

interface UserWithTheirRoles {
  createdAt: string
  email: string
  email_verified: true
  family_name: string
  given_name: string
  id: string
  name: string
  picture: string
  roles: Array<{ role: string; description: string }>
}

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    logout: builder.mutation<void, logoutBody>({
      query: ({ refresh_token }: logoutBody) => {
        return {
          url: 'api/auth/logout',
          method: 'POST',
          body: { refresh_token },
        }
      },
    }),

    getAllRoles: builder.query<{ role: string; description: string }[], void>({
      query: () => 'api/auth/get-all-roles',
    }),

    getAccountCreationRequests: builder.query<AccountCreationRequest[], void>({
      query: () => 'api/auth/get-account-creation-requests',
      providesTags: [{ type: 'Roles', id: 'ACCOUNT_CREATION_REQUESTS' }],
    }),

    accountCreationRequestDecision: builder.mutation<void, { id: string; action: 'accept' | 'reject' }>({
      query: ({ id, action }) => ({
        url: 'api/auth/account-creation-decision',
        method: 'POST',
        body: { id, action },
      }),
      invalidatesTags: [
        { type: 'Roles', id: 'ACCOUNT_CREATION_REQUESTS' },
        { type: 'Roles', id: 'USERS_WITH_THEIR_ROLES' },
      ],
    }),

    getUsersWithTheirRoles: builder.query<UserWithTheirRoles[], void>({
      query: () => 'api/auth/get-users-with-their-roles',
      providesTags: [{ type: 'Roles', id: 'USERS_WITH_THEIR_ROLES' }],
    }),

    takeAwayRole: builder.mutation<void, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: 'api/auth/take-away-role',
        method: 'POST',
        body: { id, role },
      }),
      invalidatesTags: [{ type: 'Roles', id: 'USERS_WITH_THEIR_ROLES' }],
    }),

    giveRole: builder.mutation<void, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: 'api/auth/give-role',
        method: 'POST',
        body: { id, role },
      }),
      invalidatesTags: [{ type: 'Roles', id: 'USERS_WITH_THEIR_ROLES' }],
    }),
  }),
  tagTypes: ['Roles'], // Keep the tag type for survey recruitments
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLogoutMutation,
  useGetAllRolesQuery,
  useGetAccountCreationRequestsQuery,
  useAccountCreationRequestDecisionMutation,
  useGetUsersWithTheirRolesQuery,
  useTakeAwayRoleMutation,
  useGiveRoleMutation,
} = authApi
