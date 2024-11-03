import { useSetRecruitmentVisibleMutation } from '../../services/erp'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSetRecruitmentVisible = () => {
  const [setRecruitmentVisible, { isLoading, isSuccess, isError }] = useSetRecruitmentVisibleMutation()
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
    callback: (value: boolean) => {
      console.log(value)
      setRecruitmentVisible(value)
    },
  }
}

export default useSetRecruitmentVisible
