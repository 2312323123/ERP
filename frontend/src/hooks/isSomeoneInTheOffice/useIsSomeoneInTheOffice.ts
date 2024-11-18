import { useCallback, useEffect, useMemo } from 'react'
import { useGetIsSomeoneInTheOfficeQuery } from '../../services/isSomeoneInTheOffice'
import { useSnackbar } from '../useSnackbar'

export type IsSomeoneInTheOfficeState = 'loading' | 'error' | 'yes' | 'no' | 'unknown'

export const useIsSomeoneInTheOffice = () => {
  const { data, error, isLoading, refetch } = useGetIsSomeoneInTheOfficeQuery()
  const showSnackbar = useSnackbar()

  const isSomeoneInTheOfficeState = useMemo((): IsSomeoneInTheOfficeState => {
    if (isLoading) return 'loading'
    if (error) return 'error'
    if (data === true) return 'yes'
    if (data === false) return 'no'
    return 'unknown'
  }, [data, error, isLoading])

  useEffect(() => {
    console.log('isSomeoneInTheOfficeState:', isSomeoneInTheOfficeState)
  }, [isSomeoneInTheOfficeState])

  const loggedRefetch = useCallback(async () => {
    await refetch()
    showSnackbar('Odświeżono!', 'success')
  }, [refetch, showSnackbar])

  return {
    isSomeoneInTheOfficeState,
    loggedRefetch,
  }
}
