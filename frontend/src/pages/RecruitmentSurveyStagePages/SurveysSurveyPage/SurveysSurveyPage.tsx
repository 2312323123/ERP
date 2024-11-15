import React from 'react'
import SurveysSurveyView from './SurveysSurveyView/SurveysSurveyView'
import { Box, Tabs, Tab, Button, ButtonGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyTabIndex, setTabIndex } from '../../../store/slices/surveyStage/surveyTabsSlice'
import AllEvaluationsView from './AllEvaluationsView/AllEvaluationsView'
import {
  useGetAllEvaluationsQuery,
  useGetNextSurveyUuidQuery,
  useGetPreviousSurveyUuidQuery,
} from '../../../services/surveyStage'
import { useParams } from 'react-router-dom'
import { router } from '../../../router'

interface CustomTabPanelProps {
  children: React.ReactNode
  value: number
  index: number
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="CustomTabPanel" hidden={value !== index}>
      {value === index && children}
    </div>
  )
}

const SurveysSurveyPage = () => {
  const value = useSelector(getSurveyTabIndex)
  const dispatch = useDispatch()

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    dispatch(setTabIndex(newValue))
  }

  const { uuid } = useParams()
  const { data: evaluations } = useGetAllEvaluationsQuery(uuid ?? '', { refetchOnMountOrArgChange: true })

  const { data: objectWithPreviousSurveyUuid } = useGetPreviousSurveyUuidQuery(uuid ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const previousClick = () => {
    if (objectWithPreviousSurveyUuid) {
      const previousSurveyUuid = objectWithPreviousSurveyUuid.uuid
      router.navigate('/recruitment-survey-stage/app/survey/' + previousSurveyUuid)
    }
  }

  const { data: objectWithNextSurveyUuid } = useGetNextSurveyUuidQuery(uuid ?? '', {
    refetchOnMountOrArgChange: true,
  })
  const nextClick = () => {
    if (objectWithNextSurveyUuid) {
      const nextSurveyUuid = objectWithNextSurveyUuid.uuid
      router.navigate('/recruitment-survey-stage/app/survey/' + nextSurveyUuid)
    }
  }

  return (
    <>
      <div
        style={{
          height: '3rem',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Ankieta" />
            <Tab disabled={!evaluations} label="Wszystkie oceny" />
          </Tabs>
        </Box>
        <ButtonGroup variant="contained">
          <Button disabled={!objectWithPreviousSurveyUuid} onClick={previousClick}>
            Poprzednia
          </Button>
          <Button disabled={!objectWithNextSurveyUuid} onClick={nextClick}>
            Następna
          </Button>
        </ButtonGroup>
      </div>
      <CustomTabPanel value={value} index={0}>
        <SurveysSurveyView />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AllEvaluationsView />
      </CustomTabPanel>
    </>
  )
}

export default SurveysSurveyPage
