import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dupa } from './components/Dupa'
import { AccessTokens, AppContextInterface } from './App.interface'
import { GoogleOAuthProvider } from '@react-oauth/google'

const initialValue: AppContextInterface = {
  apiPathBase: '',
  accessTokens: {
    access_token: '',
    id_token: '',
    refresh_token: '',
    expiry_date: 0,
  },
  setAccessTokens: () => {},
}
export const AppContext = createContext(initialValue)

function App() {
  const [count, setCount] = useState(0)

  const initialAccessTokens: AccessTokens = {
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
  }

  return (
    <AppContext.Provider value={value}>
      <GoogleOAuthProvider
        clientId={
          '630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'
        }
      >
        <Dupa />
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </GoogleOAuthProvider>
    </AppContext.Provider>
  )
}

export default App
