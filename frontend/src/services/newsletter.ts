import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export interface ImportedTask {
  uuid: string
  name: string
  description: string
  author_id: string
  visible_until: Date
  interested: [
    {
      user_id: string
    },
  ]
}

interface ExportedTask {
  name: string
  description: string
  visible_until: Date
}

// Define a service using a base URL and expected endpoints
export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTasks: builder.query<ImportedTask[], void>({
      query: () => 'api/newsletter/tasks',
      providesTags: [{ type: 'Newsletter', id: 'ALL_TASKS' }],
    }),
    createTask: builder.mutation<void, ExportedTask>({
      query: (exportedTask: ExportedTask) => ({
        url: 'api/newsletter/task',
        method: 'POST',
        body: { exportedTask },
      }),
      invalidatesTags: [{ type: 'Newsletter', id: 'ALL_TASKS' }],
    }),
    interested: builder.mutation<void, string>({
      query: (uuid: string) => ({
        url: 'api/newsletter/interested',
        method: 'POST',
        body: { uuid },
      }),
      invalidatesTags: [{ type: 'Newsletter', id: 'ALL_TASKS' }],
    }),
    notInterested: builder.mutation<void, string>({
      query: (uuid: string) => ({
        url: 'api/newsletter/interested',
        method: 'DELETE',
        body: { uuid },
      }),
      invalidatesTags: [{ type: 'Newsletter', id: 'ALL_TASKS' }],
    }),
  }),
  tagTypes: ['Newsletter'],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksQuery, useCreateTaskMutation, useInterestedMutation, useNotInterestedMutation } =
  newsletterApi
