import { useSetAcceptsSurveysMutation } from '../../services/erp'
import { useSnackbar } from '../useSnackbar'
import { useEffect, useState } from 'react'

const useSetAcceptsSurveys = () => {
  const [setAcceptsSurveys, { isLoading, isSuccess, isError }] = useSetAcceptsSurveysMutation()
  const [lastSwitchValue, setLastSwitchValue] = useState<boolean | null>(null)
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie zmieniono ustawienia!', 'success')
    }
    if (isSuccess && !lastSwitchValue) {
      setTimeout(() => alert('Teraz powinieneś/aś wyłączyć przyjmowanie ankiet również w formsie'), 200)
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zmianie ustawień!', 'error')
    }
  }, [isSuccess, isError, showSnackbar, lastSwitchValue])

  return {
    isLoading,
    callback: (value: boolean) => {
      setLastSwitchValue(value)
      setAcceptsSurveys(value)
    },
  }
}

export default useSetAcceptsSurveys
