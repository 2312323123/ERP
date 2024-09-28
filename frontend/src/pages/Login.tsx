import { GoogleOAuthProvider } from '@react-oauth/google'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import axios from 'axios'
import { AppContext } from '../App'
import { useContext } from 'react'
import { logNetworkError, NetworkError } from '../utils/logNetworkError'
import { logNetworkSuccess } from '../utils/logNetworkSuccess'
import { useGoogleAuth } from '../hooks/auth/useGoogleAuth'

const Login = () => {
  const [receivedIdToken, setReceivedIdToken] = useState('')
  const { apiPathBase, setLoggedIn } = useContext(AppContext)
  const [askedForAccount, setAskedForAccount] = useState(false)
  const [successfullyAskedForAccount, setSuccessfullyAskedForAccount] = useState(false)
  const [accountRequestAlreadyExists, setAccountRequestAlreadyExists] = useState(false)

  const erpGoogleCodeLogin = async (code: string) => {
    const res = await axios.get(`${apiPathBase}/api/auth/login`, {
      headers: {
        Authorization: `Bearer ${code}`,
      },
    })
    logNetworkSuccess(res, '430f394u0')
    return res
  }

  const processGoogleCode = async (code: string) => {
    setReceivedIdToken('')
    setAskedForAccount(false)
    setAccountRequestAlreadyExists(false)
    setSuccessfullyAskedForAccount(false)

    try {
      const res = await erpGoogleCodeLogin(code)

      if (res.data.accountExists) {
        // setLoggedIn(true)
      } else {
        setReceivedIdToken(res.data.id_token)
      }
    } catch (error) {
      // You can also log specific properties of the error
      if (axios.isAxiosError(error)) {
        logNetworkError(error, '294ri44')

        if (error.response?.status === 409) {
          setAccountRequestAlreadyExists(true)
        }
      } else {
        console.error('t46y54r Unexpected error:', error)
      }
    }
  }

  const { getAndProcessGoogleLoginOtpCode } = useGoogleAuth(processGoogleCode)

  const erpAskForAccount = async (googleIdToken: string) => {
    const res = await axios.post(`${apiPathBase}/api/auth/ask-for-account`, null, {
      headers: {
        Authorization: `Bearer ${googleIdToken}`,
      },
    })
    logNetworkSuccess(res, '45t3r2r4r')
    return res
  }

  const askForAccount = async () => {
    try {
      setAskedForAccount(true)
      await erpAskForAccount(receivedIdToken)
      setSuccessfullyAskedForAccount(true)
    } catch (error) {
      logNetworkError(error as NetworkError, 'iu85545t')
    }
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
      alert('Coś poszło bardzo nie tak. Zgłoś administratorowi.')
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message)
        console.error('Axios error response:', error.response?.data)
        console.error('Axios error status:', error.response?.status)
      } else {
        console.error('t457y6 Unexpected error:', error)
      }
    }
  }

  return (
    <div>
      <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
        <div>
          <div>
            <button onClick={getAndProcessGoogleLoginOtpCode}>Zaloguj przy użyciu Google</button>
            <button onClick={acceptMaciek}>Accept Maciek as user</button>
          </div>
          {receivedIdToken && (
            <div>
              <div>Nie masz jeszcze konta!</div>
              <button disabled={askedForAccount} onClick={askForAccount}>
                poproś o konto
              </button>
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
