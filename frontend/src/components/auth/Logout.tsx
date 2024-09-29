import { useContext } from 'react'
import { AppContext } from '../../App'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { logNetworkSuccess } from '../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../utils/logNetworkError'
import { initialAppAccessTokensValue } from '../../constants/initialStates'

const Logout = () => {
  // component's goal is to ask api for logout, and if there's error, alert, if not, set logged in to false
  const {
    apiPathBase,
    accessTokens: { accessToken, refreshToken },
    setAccessTokens,
    setLoggedIn,
  } = useContext(AppContext)

  // It makes sense not to need current access token here as it's
  // more secure and simple and you don't need a fresh token after logging out.
  const erpAskForLogout = async () => {
    return await axios.post(`${apiPathBase}/api/auth/logout`, {
      id: (jwtDecode(accessToken) as { id: string }).id,
      refresh_token: refreshToken,
    })
  }

  const askForLogout = async () => {
    try {
      const res = await erpAskForLogout()
      logNetworkSuccess(res, '4t3h349')
      setLoggedIn(false)
      setAccessTokens(initialAppAccessTokensValue)
    } catch (error) {
      logNetworkError(error as NetworkError, '493ru498')
      alert('Error during logout. Contact support.')
    }
  }

  return <button onClick={askForLogout}>Logout</button>
}

export default Logout
