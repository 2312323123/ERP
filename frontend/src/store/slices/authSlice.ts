import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { jwtDecode } from 'jwt-decode'

const initialState = {
  accessToken: '',
  refreshToken: '',
  accessTokenExp: 0,
  loggedIn: false,
  id: '',
  roles: [] as string[],
}

const extractExp = (accessToken: string) => {
  const { exp } = jwtDecode(accessToken)
  if (!exp) {
    throw new Error('Access token does not have exp field 54t3r4r')
  }
  return exp
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveTokens: (state, action) => {
      const exp = extractExp(action.payload.accessToken)
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.accessTokenExp = exp
      state.loggedIn = true
      state.id = jwtDecode<{ id: string }>(action.payload.accessToken)?.id ?? ''
      state.roles = jwtDecode<{ roles: string[] }>(action.payload.accessToken)?.roles ?? []
    },
    saveRefreshedAccessToken: (state, action) => {
      const exp = extractExp(action.payload.accessToken)
      state.accessToken = action.payload.accessToken
      state.accessTokenExp = exp
    },
    logout: () => {
      return initialState
    },
  },
})

export const { saveTokens, saveRefreshedAccessToken, logout } = authSlice.actions

export default authSlice.reducer

export const getAccessToken = (state: RootState) => state.auth.accessToken
export const getRefreshToken = (state: RootState) => state.auth.refreshToken
export const getAccessTokenExp = (state: RootState) => state.auth.accessTokenExp
export const getLoggedIn = (state: RootState) => state.auth.loggedIn
export const getId = (state: RootState) => state.auth.id
export const getRoles = (state: RootState) => state.auth.roles
