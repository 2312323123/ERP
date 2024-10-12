import { Box, CircularProgress, Switch, Typography } from '@mui/material'
import { getRecruitmentVisible, setRectuitmentVisible } from '../../../../store/slices/surveyStage/surveyUniversalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { logNetworkError, NetworkError } from '../../../../utils/logNetworkError'
import { logNetworkSuccess } from '../../../../utils/logNetworkSuccess'
import { AppContext } from '../../../../App'

// by default value is undefined, after fetching it takse true/false, change is fetched and shown
// there have to be GET and POST urls that are the same, but one is for fetching and the other for changing
const CanPeopleSeeRecruitmentButton = () => {
  /* Rekrutacja aktywna (widoczna dla ludzi) Switch */
  const recruitmentVisible = useSelector(getRecruitmentVisible)

  const [isFetching, setIsFetching] = useState(false)

  const { apiPathBase } = useContext(AppContext)
  const dispatch = useDispatch()

  const handleFetchRecruitmentVisible = useCallback(async () => {
    try {
      // setButtonsBlocked(true)
      const res = await axios.get(`${apiPathBase}/api/surveys/can-people-see-recruitment`)
      logNetworkSuccess(res, 't56ytert5')

      if (res.data && res.data.can_people_see_recruitment !== undefined) {
        dispatch(setRectuitmentVisible(res.data.can_people_see_recruitment))
      } else {
        dispatch(setRectuitmentVisible(undefined))
      }
    } catch (error) {
      logNetworkError(error as NetworkError, 'y6768iuy6t')
    }
  }, [apiPathBase, dispatch])

  const trySwitching = useCallback(async () => {
    const startingValue = recruitmentVisible // false
    dispatch(setRectuitmentVisible(!startingValue))
    setIsFetching(true)
    try {
      const res = await axios.post(`${apiPathBase}/api/surveys/can-people-see-recruitment`, {
        can_people_see_recruitment: !startingValue,
      })
      logNetworkSuccess(res, '0u425')
      setIsFetching(false)
    } catch (error) {
      alert('uh oh: 34r3e8')
      dispatch(setRectuitmentVisible(startingValue))
      setIsFetching(false)
      logNetworkError(error as NetworkError, '9ut44u')
    }
  }, [apiPathBase, dispatch, recruitmentVisible])

  useEffect(() => {
    handleFetchRecruitmentVisible()
  }, [handleFetchRecruitmentVisible])

  if (typeof recruitmentVisible === 'undefined') {
    return (
      <Box my={3} display="flex" alignItems="center">
        <Typography variant="body1" mr={2}>
          Rekrutacja aktywna (widoczna dla ludzi)?
        </Typography>

        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <Box my={3} display="flex" alignItems="center">
      <Typography variant="body1" mr={2}>
        Rekrutacja aktywna (widoczna dla ludzi)?
      </Typography>

      <Switch checked={recruitmentVisible} onChange={trySwitching} color="primary" disabled={isFetching} />
      <Typography variant="body1" ml={2}>
        {recruitmentVisible ? 'TAK' : 'NIE'}
      </Typography>
    </Box>
  )
}

export default CanPeopleSeeRecruitmentButton
