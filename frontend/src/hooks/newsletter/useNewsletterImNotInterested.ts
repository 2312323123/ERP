import { useNotInterestedMutation } from '../../services/newsletter'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

export const useNewsletterImNotInterested = () => {
  const [notInterested, { isLoading: notInterestedLoading, isSuccess, isError }] = useNotInterestedMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie usunięto polubienie!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy usuwaniu polubienia!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    notInterestedLoading,
    notInterested,
  }
}
