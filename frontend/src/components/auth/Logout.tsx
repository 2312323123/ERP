import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { logNetworkSuccess } from '../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../utils/logNetworkError'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToken, getRefreshToken, logout } from '../../store/slices/authSlice'
import { apiPathBase } from '../../config/constants'

interface Props {
  children?: React.ReactNode
}

const Logout = ({ children }: Props) => {
  // component's goal is to ask api for logout, and if there's error, alert, if not, set logged in to false
  const accessToken = useSelector(getAccessToken)
  const refreshToken = useSelector(getRefreshToken)
  const dispatch = useDispatch()

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
      dispatch(logout())
    } catch (error) {
      logNetworkError(error as NetworkError, '493ru498')
      alert('Error during logout. Contact support.')
    }
  }

  return <span onClick={askForLogout}>{children ? children : 'Logout'}</span>
}

export default Logout
