import { useSetOpinionMutation } from '../../services/interviewStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSetInterviewOpinion = () => {
  const [setOpinion, { isLoading: isSetOpinionLoading, isSuccess, isError }] = useSetOpinionMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie zapisano opinię!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zapisywaniu opinii!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isSetOpinionLoading,
    setOpinion,
  }
}

export default useSetInterviewOpinion
