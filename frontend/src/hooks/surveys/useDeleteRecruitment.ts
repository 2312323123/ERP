import { useDeleteRecruitmentMutation, useGetActiveRecruitmentQuery } from '../../services/erp'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useDeleteRecruitment = () => {
  const [deleteRecruitment, { isSuccess, isError }] = useDeleteRecruitmentMutation()
  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Usunięto rekrutację!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy usuwaniu rekrutacji!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return () => deleteRecruitment(activeRecruitment?.uuid ?? '')
}

export default useDeleteRecruitment
