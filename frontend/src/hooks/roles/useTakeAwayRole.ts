import { useTakeAwayRoleMutation } from '../../services/auth'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useTakeAwayRole = (id: string, role: string) => {
  const [takeAwayRole, { isLoading, isSuccess, isError }] = useTakeAwayRoleMutation()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Poprawnie usunięto rolę!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy usuwaniu roli!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return {
    isLoading,
    callback: () =>
      takeAwayRole({
        id,
        role,
      }),
  }
}

export default useTakeAwayRole
