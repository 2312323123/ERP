import { useInterestedMutation } from '../../services/newsletter'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

export const useNewsletterImInterested = () => {
  const [interested, { isLoading: interestedLoading, isSuccess, isError }] = useInterestedMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie polubiono!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy dawaniu polubienia!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    interestedLoading,
    interested,
  }
}
