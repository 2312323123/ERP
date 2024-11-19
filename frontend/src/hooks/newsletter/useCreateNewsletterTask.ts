import { useCreateTaskMutation } from '../../services/newsletter'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useCreateNewsletterTask = () => {
  const [createNewsletterTask, { isLoading: isCreateNewsletterTaskLoading, isSuccess, isError }] =
    useCreateTaskMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie utworzono zadanie!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy tworzeniu zadania!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isCreateNewsletterTaskLoading,
    createNewsletterTask,
  }
}

export default useCreateNewsletterTask
