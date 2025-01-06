import { useSetInterviewIdentificationField2Mutation } from '../../services/interviewStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSetInterviewIdentificationField2 = () => {
  const [
    setInterviewIdentificationField2,
    { isLoading: isSetInterviewIdentificationField2Loading, isSuccess, isError },
  ] = useSetInterviewIdentificationField2Mutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie zapisano pole!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zapisywaniu pola!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isSetInterviewIdentificationField2Loading,
    setInterviewIdentificationField2,
  }
}

export default useSetInterviewIdentificationField2
