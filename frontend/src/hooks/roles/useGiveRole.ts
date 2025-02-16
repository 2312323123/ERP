import { useGiveRoleMutation } from '../../services/auth'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useGiveRole = (id: string, role: string) => {
  const [giveRole, { isLoading, isSuccess, isError }] = useGiveRoleMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie dodano rolę!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy dodawaniu roli!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isLoading,
    callback: () =>
      giveRole({
        id,
        role,
      }),
  }
}

export default useGiveRole
