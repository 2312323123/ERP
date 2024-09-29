import { createContext, useEffect, useState } from 'react'
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import OtherPage from './pages/OtherPage'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { initialAppAccessTokensValue, initialAppContextValue } from './constants/initialStates'
import { useRefreshAccessToken } from './hooks/auth/useRefreshAccessToken'

export const AppContext = createContext(initialAppContextValue)

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
