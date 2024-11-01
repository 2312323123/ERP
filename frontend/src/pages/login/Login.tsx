import { GoogleOAuthProvider } from '@react-oauth/google'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { saveTokens } from '../../store/slices/authSlice'
import { apiPathBase } from '../../config/constants'
import { logNetworkError, NetworkError } from '../../utils/logNetworkError'
import { logNetworkSuccess } from '../../utils/logNetworkSuccess'
import { useGoogleAuth } from '../../hooks/auth/useGoogleAuth'
import { jwtDecode } from 'jwt-decode'
import { router } from '../../router'
import { Box, Typography, Button } from '@mui/material'

const Login = () => {
  const [receivedIdToken, setReceivedIdToken] = useState('')
  const [askedForAccount, setAskedForAccount] = useState(false)
  const [successfullyAskedForAccount, setSuccessfullyAskedForAccount] = useState(false)
  const [accountRequestAlreadyExists, setAccountRequestAlreadyExists] = useState(false)
  const dispatch = useDispatch()

  const erpGoogleCodeLogin = async (code: string) => {
    return await axios.get(`${apiPathBase}/api/auth/login`, {
      headers: {
        Authorization: `Bearer ${code}`,
      },
    })
  }

  const processGoogleCode = async (code: string) => {
    setReceivedIdToken('')
    setAskedForAccount(false)
    setAccountRequestAlreadyExists(false)
    setSuccessfullyAskedForAccount(false)

    try {
      const res = await erpGoogleCodeLogin(code)
      logNetworkSuccess(res, '430f394u0')

      if (res.data.accountExists && res.data.accessToken && res.data.refreshToken) {
        const { exp } = jwtDecode(res.data.accessToken)
        if (!exp) {
          throw new Error('Access token does not have exp field 54t3r4r')
        }
        dispatch(
          saveTokens({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            accessTokenExp: exp,
          }),
        )
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
    return await axios.post(`${apiPathBase}/api/auth/ask-for-account`, null, {
      headers: {
        Authorization: `Bearer ${googleIdToken}`,
      },
    })
  }

  const askForAccount = async () => {
    try {
      setAskedForAccount(true)
      const res = await erpAskForAccount(receivedIdToken)
      logNetworkSuccess(res, '45t3r2r4r')
      setSuccessfullyAskedForAccount(true)
    } catch (error) {
      logNetworkError(error as NetworkError, 'iu85545t')
      alert('Coś poszło bardzo nie tak. Zgłoś administratorowi.')
    }
  }

  const acceptMaciek = async () => {
    try {
      const res = await axios.post(`${apiPathBase}/api/auth/account-creation-decision`, {
        id: '105887563550899714086',
        action: 'accept',
      })
      logNetworkSuccess(res, 'i7764t4')
    } catch (error) {
      logNetworkError(error as NetworkError, 'u565t43r')
    }
  }

  const acceptMaciekStupidWay = async () => {
    try {
      const res = await axios.post(`${apiPathBase}/api/auth/account-creation-decision-maciek`)
      logNetworkSuccess(res, '6yi7i8uy')
    } catch (error) {
      logNetworkError(error as NetworkError, '23er46y')
    }
  }

  return (
    // <div className={styles.loginPage}>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundImage: 'url(login_page.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <GoogleOAuthProvider clientId={'630669205687-ukc7rkopmrfomse2g04uei1gkhdvo2o0.apps.googleusercontent.com'}>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            maxWidth: 400,
            width: '100%',
            textAlign: 'center',
            background: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {/* <TextField fullWidth label="Email" variant="outlined" margin="normal" />
          <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" /> */}
          <Button
            onClick={getAndProcessGoogleLoginOtpCode}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Zaloguj przy użyciu Google
          </Button>
          <div>
            <button onClick={acceptMaciek}>Accept Maciek as user</button>
            <button onClick={acceptMaciekStupidWay}>Accept Maciek as user (stupid way)</button>
            <button onClick={() => router.navigate('/home')}>Go Home</button>
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
        </Box>{' '}
      </GoogleOAuthProvider>
    </Box>
  )
}

export default Login
