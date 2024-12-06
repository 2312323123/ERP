import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getAccessToken, getAccessTokenExp, getRefreshToken, saveTokens } from '../store/slices/authSlice'
const useRememberAppCredentialsAndUrl = () => {
  const location = useLocation()
  const accessToken = useSelector(getAccessToken)
  const refreshToken = useSelector(getRefreshToken)
  const accessTokenExp = useSelector(getAccessTokenExp)
  const dispatch = useDispatch()
  useEffect(() => {
    const rememberedAccessToken = localStorage.getItem('accessToken')
    const rememberedRefreshToken = localStorage.getItem('refreshToken')
    if (rememberedAccessToken && rememberedRefreshToken) {
      dispatch(
        saveTokens({
          accessToken: rememberedAccessToken,
          refreshToken: rememberedRefreshToken,
        }),
      )
    }
  }, [dispatch])
  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('accessTokenExp', accessTokenExp.toString())
    }
  }, [accessToken, refreshToken, accessTokenExp]) // Runs when accessToken or refreshToken change
  useEffect(() => {
    localStorage.setItem('rememberedPath', location.pathname)
  }, [location.pathname]) // Runs when location.pathname changes
  // return (
  //   <div>useRememberAppCredentialsAndUrl</div>
  // )
}
export default useRememberAppCredentialsAndUrl
