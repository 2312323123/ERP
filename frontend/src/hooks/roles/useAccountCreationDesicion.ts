import { useAccountCreationRequestDecisionMutation } from '../../services/auth'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useAccountCreationDecision = (id: string, action: 'accept' | 'reject') => {
  const [accountCreationRequestDecision, { isLoading, isSuccess, isError }] =
    useAccountCreationRequestDecisionMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      if (action === 'accept') {
        showSnackbar('Poprawnie zaakceptowano prośbę!', 'success')
      } else {
        showSnackbar('Poprawnie odrzucono prośbę!', 'success')
      }
    }
    if (isError) {
      if (action === 'accept') {
        showSnackbar('Wystąpił błąd przy akceptowaniu prośby!', 'error')
      } else {
        showSnackbar('Wystąpił błąd przy odrzucaniu prośby!', 'error')
      }
    }
  }, [isSuccess, isError, showSnackbar, action])

  return {
    isLoading,
    callback: () =>
      accountCreationRequestDecision({
        id,
        action,
      }),
  }
}

export default useAccountCreationDecision
