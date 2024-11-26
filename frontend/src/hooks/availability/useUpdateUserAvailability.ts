import { useUpdateUserAvailabilityMutation } from '../../services/availability'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

export const useUpdateUserAvailability = () => {
  const [updateUserAvailability, { isLoading: isUpdateUserAvailabilityLoading, isSuccess, isError }] =
    useUpdateUserAvailabilityMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie zaktualizowano dostępność!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy aktualizowaniu dostępności!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isUpdateUserAvailabilityLoading,
    updateUserAvailability,
  }
}
