import { useSetAcceptsSurveysMutation } from '../../services/erp'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSetAcceptsSurveys = () => {
  const [setAcceptsSurveys, { isLoading, isSuccess, isError }] = useSetAcceptsSurveysMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie zmieniono ustawienia!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zmianie ustawień!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isLoading,
    callback: (value: boolean) => setAcceptsSurveys(value),
  }
}

export default useSetAcceptsSurveys
