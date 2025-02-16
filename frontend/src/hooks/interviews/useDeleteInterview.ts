import { useDeleteInterviewMutation } from '../../services/interviewStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useDeleteInterview = () => {
  const [deleteInterview, { isLoading: isDeleteInterviewLoading, isSuccess, isError }] = useDeleteInterviewMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie usunięto rozmowę!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy usuwaniu rozmowy!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isDeleteInterviewLoading,
    deleteInterview,
  }
}

export default useDeleteInterview
