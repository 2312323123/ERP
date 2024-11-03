import { useSetEvaluatorsCanEvaluateMutation } from '../../services/erp'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSetEvaluatorsCanEvaluate = () => {
  const [setEvaluatorsCanEvaluate, { isLoading, isSuccess, isError }] = useSetEvaluatorsCanEvaluateMutation()
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
    callback: (value: boolean) => setEvaluatorsCanEvaluate(value),
  }
}

export default useSetEvaluatorsCanEvaluate
