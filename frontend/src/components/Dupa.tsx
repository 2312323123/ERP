import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { AppContext } from '../App'
import { useContext } from 'react'

const Dupa = () => {
  const { apiPathBase } = useContext(AppContext)

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post(`${apiPathBase}/api/auth/google`, {
        code,
      })

      console.log(tokens)
    },
    flow: 'auth-code',
  })

  return (
    <div>
      dupa
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  )
}

export { Dupa }
