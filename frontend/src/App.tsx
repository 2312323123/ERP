import { createContext, useEffect, useState } from 'react'
import './App.css'
import { AppContextInterface } from './App.interface'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import OtherPage from './pages/OtherPage'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { GoogleTokensInterface } from './hooks/auth/useGoogleAuth.interface'

const initialValue: AppContextInterface = {
  apiPathBase: '',
  accessTokens: {
    access_token: '',
    id_token: '',
    refresh_token: '',
    expiry_date: 0,
  },
  setAccessTokens: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
}
export const AppContext = createContext(initialValue)

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const initialAccessTokens: GoogleTokensInterface = {
    access_token: '',
    id_token: '',
    refresh_token: '',
    expiry_date: 0,
  }
  const [accessTokens, setAccessTokens] = useState(initialAccessTokens)

  const value = {
    apiPathBase: 'http://localhost:10016',
    accessTokens,
    setAccessTokens,
    loggedIn,
    setLoggedIn,
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="other-page" element={<OtherPage />} />
        <Route path="login" element={<Login />} />
      </Route>,
    ),
  )

  useEffect(() => {
    // if not logged in, redirect to login page
    if (!loggedIn) {
      router.navigate('/login')
    } else {
      router.navigate('/')
    }
  }, [loggedIn, router])

  return (
    <AppContext.Provider value={value}>
      <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </AppContext.Provider>
  )
}

export default App
