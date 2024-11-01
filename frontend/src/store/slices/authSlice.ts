import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  accessToken: '',
  refreshToken: '',
  accessTokenExp: 0,
  loggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveTokens: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.accessTokenExp = action.payload.accessTokenExp
      state.loggedIn = true
    },
    logout: () => {
      return initialState
    },
  },
})

export const { saveTokens, logout } = authSlice.actions

export default authSlice.reducer

export const getAccessToken = (state: RootState) => state.auth.accessToken
export const getRefreshToken = (state: RootState) => state.auth.refreshToken
export const getAccessTokenExp = (state: RootState) => state.auth.accessTokenExp
export const getLoggedIn = (state: RootState) => state.auth.loggedIn
