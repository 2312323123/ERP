import { useSetEvaluatorsCanEvaluateMutation } from '../../services/erp'
import { useGetCriteriaQuery } from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSetEvaluatorsCanEvaluate = () => {
  const [setEvaluatorsCanEvaluate, { isLoading, isSuccess, isError }] = useSetEvaluatorsCanEvaluateMutation()
  const showSnackbar = useSnackbar()
  const { refetch } = useGetCriteriaQuery()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie zmieniono ustawienia!', 'success')
      // refetch so that you can immediately see change
      refetch()
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
