import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
// import { useRefreshAccessToken } from './hooks/auth/useRefreshAccessToken'
import { createTheme, ThemeProvider } from '@mui/material'
import { router } from './router'
import { takeMeToSurveyPhase } from './utils/takeMeToSurveyPhase'
import PathChangeListener from './utils/PathChangeListener'
import { SnackbarProvider } from './context/SnackbarProvider'

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

  // // permament
  // useEffect(() => {
  //   // if not logged in, redirect to login page
  //   if (!loggedIn) {
  //     router.navigate('/login')
  //   } else {
  //     router.navigate('/')
  //   }
  // }, [loggedIn])

  return (
    <SnackbarProvider>
      <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  )
}

export default App
