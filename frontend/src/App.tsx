import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { router } from './router'
import { takeMeToSurveyPhase } from './utils/takeMeToSurveyPhase'
import PathChangeListener from './utils/PathChangeListener'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getLoggedIn } from './store/slices/authSlice'
import { getSnackbarValue } from './store/slices/snackbarSlice'
import { useSnackbar } from './hooks/useSnackbar'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F52549', // Primary color
    },
    secondary: {
      main: '#FA6775', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})

function App() {
  // // temporary
  // useEffect(() => {
  //   // if not logged in, redirect to login page
  //   if (!loggedIn) {
  //     router.navigate('/login')
  //   } else {
  //     takeMeToSurveyPhase()
  //   }
  // }, [loggedIn])

  const loggedIn = useSelector(getLoggedIn)

  // permament
  useEffect(() => {
    // if not logged in, redirect to login page
    if (!loggedIn) {
      router.navigate('/login')
    } else {
      router.navigate('/home')
    }
  }, [loggedIn])

  const snackbarValue = useSelector(getSnackbarValue)
  const showSnackbar = useSnackbar()

  useEffect(() => {
    if (snackbarValue) {
      showSnackbar(snackbarValue.message, snackbarValue.severity)
    }
  }, [snackbarValue, showSnackbar])

  return (
    <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
