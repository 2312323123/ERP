import { GoogleOAuthProvider } from '@react-oauth/google'
import { Dupa } from '../components/Dupa'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react'

const Login = () => {
  const [count, setCount] = useState(0)

  const [receivedCode, setReceivedCode] = useState(false)

  return (
    <div>
      Login
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
    </div>
  )
}

export default Login
