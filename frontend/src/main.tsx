import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={
        '630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'
      }
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
