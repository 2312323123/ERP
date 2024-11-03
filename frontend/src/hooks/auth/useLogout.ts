import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../services/auth'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'
import { getRefreshToken, logout } from '../../store/slices/authSlice'
import { router } from '../../router'

// component's goal is to ask api for logout, and if there's error, alert, if not, set logged in to false
const useLogout = () => {
  const [logoutMutation, { isLoading, isSuccess, isError }] = useLogoutMutation()
  const refreshToken = useSelector(getRefreshToken)
  const showSnackbar = useSnackbar()
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess) {
      dispatch(logout())
      router.navigate('/login')
      showSnackbar('Poprawnie wylogowano!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy wylogowywaniu!', 'error')
    }
  }, [dispatch, isSuccess, isError, showSnackbar])

  return () =>
    logoutMutation({
      // It makes sense not to need current access token here as it's
      // more secure and simple and you don't need a fresh token after logging out.
      refresh_token: refreshToken,
    })
}

export default useLogout
