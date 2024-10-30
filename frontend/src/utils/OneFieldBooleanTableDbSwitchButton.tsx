import { Box, Typography, CircularProgress, Switch } from '@mui/material'
import axios from 'axios'
import { useState, useContext, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppContext } from '../App'
import { logNetworkError, NetworkError } from './logNetworkError'
import { logNetworkSuccess } from './logNetworkSuccess'
import { UnknownAction } from '@reduxjs/toolkit'

interface Props {
  theValue: boolean | undefined
  setterToDispatch: (value: boolean | undefined) => UnknownAction
  label: string
  path: string
  returnFieldName: string
  disabled?: boolean
}

// by default value is undefined, after fetching it takse true/false, change is fetched and shown
// there have to be GET and POST urls that are the same, but one is for fetching and the other for changing
const OneFieldBooleanTableDbSwitchButton = ({
  theValue,
  setterToDispatch,
  label,
  path,
  returnFieldName,
  disabled,
}: Props) => {
  /* Rekrutacja aktywna (widoczna dla ludzi) Switch */
  // theValue should come from useSelector

  const { apiPathBase } = useContext(AppContext)
  const dispatch = useDispatch()
  const [isFetching, setIsFetching] = useState(false)

  const handleFetchRecruitmentVisible = useCallback(async () => {
    try {
      // setButtonsBlocked(true)
      const res = await axios.get(`${apiPathBase}${path}`)
      logNetworkSuccess(res, 'e24r5rt64')

      if (res.data && res.data[returnFieldName] !== undefined) {
        dispatch(setterToDispatch(res.data[returnFieldName]))
      } else {
        dispatch(setterToDispatch(undefined))
      }
    } catch (error) {
      logNetworkError(error as NetworkError, 'o98u7y6')
    }
  }, [apiPathBase, dispatch, setterToDispatch, path, returnFieldName])

  const trySwitching = useCallback(async () => {
    const startingValue = theValue // false
    dispatch(setterToDispatch(!startingValue))
    setIsFetching(true)
    try {
      const res = await axios.post(`${apiPathBase}${path}`, {
        [returnFieldName]: !startingValue,
      })
      logNetworkSuccess(res, '324rt5')
      setIsFetching(false)
    } catch (error) {
      alert('uh oh: 7ui8u')
      dispatch(setterToDispatch(startingValue))
      setIsFetching(false)
      logNetworkError(error as NetworkError, 'ee6tu77')
    }
  }, [apiPathBase, dispatch, theValue, setterToDispatch, path, returnFieldName])

  useEffect(() => {
    handleFetchRecruitmentVisible()
  }, [handleFetchRecruitmentVisible])

  if (typeof theValue === 'undefined') {
    return (
      <Box my={3} display="flex" alignItems="center">
        <Typography variant="body1" mr={2}>
          {label}
        </Typography>

        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <Box my={3} display="flex" alignItems="center">
      <Typography variant="body1" mr={2}>
        {label}
      </Typography>

      <Switch checked={theValue} onChange={trySwitching} color="primary" disabled={isFetching || disabled} />
      <Typography variant="body1" ml={2}>
        {theValue ? 'TAK' : 'NIE'}
      </Typography>
    </Box>
  )
}

export default OneFieldBooleanTableDbSwitchButton
