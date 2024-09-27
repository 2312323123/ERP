import { GoogleOAuthProvider } from '@react-oauth/google'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AppContext } from '../App'
import { useContext } from 'react'

const Login = () => {
  // const [receivedIdToken, setReceivedIdToken] = useState('')
  const [receivedIdToken, setReceivedIdToken] = useState('')
  const { apiPathBase, accessTokens, setAccessTokens } = useContext(AppContext)
  const [askedForAccount, setAskedForAccount] = useState(false)
  const [failedToAskForAccount, setFailedToAskForAccount] = useState(false)
  const [successfullyAskedForAccount, setSuccessfullyAskedForAccount] = useState(false)
  const [accountRequestAlreadyExists, setAccountRequestAlreadyExists] = useState(false)

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(`${apiPathBase}/api/auth/login`, {
        code,
      })

      console.log(tokens)

      setAccessTokens(tokens.data)
    },
    flow: 'auth-code',
  })

  const googleLoginSuccessCallback = async (code: string) => {
    try {
      const res = await axios.get(`${apiPathBase}/api/auth/login2`, {
        headers: {
          Authorization: `Bearer ${code}`,
        },
      })

      console.log('res:')
      console.log(res)

      // setAccessTokens(tokens.data)
    } catch (error) {
      // You can also log specific properties of the error
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message)
        console.error('Axios error response:', error.response?.data)
        console.error('Axios error status:', error.response?.status)

        if (error.response?.data?.id_token) {
          setReceivedIdToken(error.response?.data?.id_token)
          console.log('id_token:', error.response?.data?.id_token)
        }
        if (error.response?.status === 409) {
          console.log('ddupa udpa upda dupa')
          console.log('error.response?.status:')
          console.log(error.response?.status)
          setAccountRequestAlreadyExists(true)
        }
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  const googleLogin2 = useGoogleLogin({
    onSuccess: ({ code }) => googleLoginSuccessCallback(code),
    flow: 'auth-code',
  })

  const askForAccount = async () => {
    try {
      setAskedForAccount(true)
      const res = await axios.post(`${apiPathBase}/api/auth/ask-for-account`, null, {
        headers: {
          Authorization: `Bearer ${receivedIdToken}`,
        },
      })
      console.log('res:')
      console.log(res)
      setSuccessfullyAskedForAccount(true)
    } catch (error) {
      // You can also log specific properties of the error
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message)
        console.error('Axios error response:', error.response?.data)
        console.error('Axios error status:', error.response?.status)
        if (error.response?.status === 409) {
          setAccountRequestAlreadyExists(true)
        } else {
          setFailedToAskForAccount(true)
        }
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  const refresh = async () => {
    const newAccessToken = await axios.post(`${apiPathBase}/api/auth/refresh`, {
      refreshToken: accessTokens.refresh_token,
    })

    console.log(newAccessToken)
  }

  const acceptMaciek = async () => {
    try {
      const res = await axios.post(`${apiPathBase}/api/auth/account-creation-decision`, {
        id: '105887563550899714086',
        action: 'accept',
      })
      console.log('res:')
      console.log(res)
    } catch (error) {
      // You can also log specific properties of the error
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message)
        console.error('Axios error response:', error.response?.data)
        console.error('Axios error status:', error.response?.status)
        if (error.response?.status === 409) {
          setAccountRequestAlreadyExists(true)
        } else {
          setFailedToAskForAccount(true)
        }
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  return (
    <div>
      Login
      <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
        <div>
          dupa
          <div>
            <button onClick={googleLogin2}>Login2 with Google</button>
            <button onClick={acceptMaciek}>Accept Maciek as user</button>
          </div>
          <button onClick={googleLogin}>Login with Google</button>
          <button onClick={() => console.log(accessTokens)}>console.log tokens</button>
          <button onClick={refresh}>Refresh</button>
          {receivedIdToken && (
            <div>
              <div>Nie masz jeszcze konta!</div>
              <button disabled={askedForAccount} onClick={askForAccount}>
                poproś o konto
              </button>
              {failedToAskForAccount && <div>Coś poszło nie tak. Skontaktuj się z administratorem.</div>}
              {successfullyAskedForAccount && <div>Poprawnie poproszono o konto. Oczekuj na akceptację.</div>}
            </div>
          )}
          {accountRequestAlreadyExists && (
            <div>Poproszono już o konto. Oczekuj na akceptację, bądź skontaktuj się z kimś, kto może zaakceptować.</div>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Login
