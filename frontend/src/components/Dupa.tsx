import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AppContext } from '../App'
import { useContext } from 'react'

const Dupa = () => {
  const { apiPathBase, accessTokens, setAccessTokens } = useContext(AppContext)

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
      } else {
        console.error('Unexpected error:', error)
      }
    }
  }

  const googleLogin2 = useGoogleLogin({
    onSuccess: ({ code }) => googleLoginSuccessCallback(code),
    flow: 'auth-code',
  })

  const refresh = async () => {
    const newAccessToken = await axios.post(`${apiPathBase}/api/auth/refresh`, {
      refreshToken: accessTokens.refresh_token,
    })

    console.log(newAccessToken)
  }

  return (
    <div>
      dupa
      <button onClick={googleLogin}>Login with Google</button>
      <button onClick={googleLogin2}>Login2 with Google</button>
      <button onClick={() => console.log(accessTokens)}>
        console.log tokens
      </button>
      <button onClick={refresh}>Refresh</button>
    </div>
  )
}

export { Dupa }
