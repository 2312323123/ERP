import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { logNetworkSuccess } from '../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../utils/logNetworkError'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToken, getRefreshToken, saveTokens } from '../../store/slices/authSlice'
import { apiPathBase } from '../../config/constants'

export const useRefreshAccessToken = () => {
  const refreshToken = useSelector(getRefreshToken)
  const accessToken = useSelector(getAccessToken)
  const dispatch = useDispatch()

  return async (): Promise<void> => {
    try {
      const response = await axios.post(`${apiPathBase}/api/auth/refresh`, {
        id: (jwtDecode(accessToken) as { id: string }).id,
        refresh_token: refreshToken,
      })
      logNetworkSuccess(response, '20949ri1')
      if (response.data && response.data.access_token) {
        const { exp } = jwtDecode(response.data.access_token)
        if (!exp) {
          throw new Error('Access token does not have exp field 34r23e32')
        }
        dispatch(
          saveTokens({
            accessToken: response.data.access_token,
            refreshToken,
            accessTokenExp: exp,
          }),
        )
      }
    } catch (error) {
      logNetworkError(error as NetworkError, 'ei4282o')
      alert('Error during refreshing access token. Contact support.')
    }
  }
}
