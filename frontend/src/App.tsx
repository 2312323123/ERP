import { createContext, useEffect, useState } from 'react'
// import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import { initialAppAccessTokensValue, initialAppContextValue } from './constants/initialStates'
import { useRefreshAccessToken } from './hooks/auth/useRefreshAccessToken'
import { createTheme, ThemeProvider } from '@mui/material'
import { router } from './router'

export const AppContext = createContext(initialAppContextValue)

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#f50057', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})

function App() {
  const apiPathBase = 'http://localhost:10016'

  const [loggedIn, setLoggedIn] = useState(false)
  const [accessTokens, setAccessTokens] = useState(initialAppAccessTokensValue)
  const refreshAccessToken = useRefreshAccessToken(`${apiPathBase}/api/auth/refresh`, accessTokens, setAccessTokens)

  const value = {
    apiPathBase,
    accessTokens,
    setAccessTokens,
    loggedIn,
    setLoggedIn,
    refreshAccessToken,
  }

  useEffect(() => {
    // if not logged in, redirect to login page
    if (!loggedIn) {
      router.navigate('/login')
    } else {
      router.navigate('/')
    }
  }, [loggedIn])

  return (
    <AppContext.Provider value={value}>
      <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </AppContext.Provider>
  )
}

export default App
