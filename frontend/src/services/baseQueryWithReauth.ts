import { BaseQueryApi, BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { apiPathBase } from '../config/constants'
import { RootState } from '../store/store'
import { logout, saveRefreshedAccessToken } from '../store/slices/authSlice'
import { setSnackbar } from '../store/slices/snackbarSlice'
import { router } from '../router'

const isTokenExpired = (accessTokenExp: number) => {
  const expirationMinus10Seconds = accessTokenExp * 1000 - 10000 // * 1000 as it's in seconds and Date.now() is in milliseconds
  return Date.now() >= expirationMinus10Seconds
}

interface ExtraOptions {
  skipAuth?: boolean // Define optional properties as needed
  headers?: Record<string, string>
}

// const baseQuery = fetchBaseQuery({ baseUrl: '/api' });
const baseQuery = fetchBaseQuery({ baseUrl: apiPathBase + '/' })

interface RefreshResponse {
  access_token: string // Define other properties as needed
}

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api: BaseQueryApi,
  extraOptions: ExtraOptions,
) => {
  // if skipAuth is true, make the request without authentication
  if (extraOptions?.skipAuth) {
    return await baseQuery(args, api, extraOptions)
  }

  let result
  const { accessToken, refreshToken, accessTokenExp } = (api.getState() as RootState).auth

  // if access token is expired, refresh it
  if (isTokenExpired(accessTokenExp)) {
    const refreshResult = (await baseQuery(
      {
        url: 'api/auth/refresh',
        method: 'POST',
        body: {
          refresh_token: refreshToken,
        },
      },
      api,
      extraOptions,
    )) as { data: RefreshResponse | undefined }

    if (refreshResult.data) {
      // if refresh was successful, update the access token
      api.dispatch(saveRefreshedAccessToken({ accessToken: refreshResult.data.access_token }))

      // make the original request with the new access token
      const modifiedArgs = argsWithAddedBearerToken({
        args,
        extraOptions,
        accessToken: refreshResult.data.access_token,
      })
      // use modifiedArgs when making the request
      result = await baseQuery(modifiedArgs, api, extraOptions)
    } else {
      // if refresh failed, logout
      api.dispatch(logout())
      router.navigate('/login')
      api.dispatch(
        setSnackbar({
          message: 'Session expired. Please log in again. And report this to system admin.',
          severity: 'error',
        }),
      )
      return refreshResult
    }
  } else {
    // if access token is not expired, make the original request
    const modifiedArgs = argsWithAddedBearerToken({ args, extraOptions, accessToken })
    // use modifiedArgs when making the request
    result = await baseQuery(modifiedArgs, api, extraOptions)
  }

  return result || { error: { status: 'CUSTOM_ERROR', error: 'Request failed' } }
}

interface ArgsWithAddedBearerTokenProps {
  args: string | FetchArgs
  extraOptions: ExtraOptions
  accessToken: string
}

const argsWithAddedBearerToken = ({ args, extraOptions, accessToken }: ArgsWithAddedBearerTokenProps) => {
  // prepare headers with Bearer token
  const headers = {
    ...(extraOptions?.headers || {}), // preserve existing headers if any
    Authorization: `Bearer ${accessToken}`, // add Bearer token
  }

  // modify the args to include headers
  const modifiedArgs = typeof args === 'string' ? { url: args, headers } : { ...args, headers }

  return modifiedArgs
}
