import { useCreateInterviewMutation } from '../../services/interviewStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useCreateInterview = () => {
  const [createInterview, { isLoading: isCreateInterviewLoading, isSuccess, isError }] = useCreateInterviewMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie ustawiono rozmowę!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zmianie rozmowy!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isCreateInterviewLoading,
    createInterview,
  }
}

export default useCreateInterview
