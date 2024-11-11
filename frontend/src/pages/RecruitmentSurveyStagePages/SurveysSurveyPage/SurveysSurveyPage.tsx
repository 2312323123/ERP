import React from 'react'
import SurveysSurveyView from './SurveysSurveyView/SurveysSurveyView'
import { Box, Tabs, Tab, Button, ButtonGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSurveyTabIndex, setTabIndex } from '../../../store/slices/surveyStage/surveyTabsSlice'

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
            <Tab label="Wszystkie oceny" />
          </Tabs>
        </Box>
        <ButtonGroup variant="contained">
          <Button>Poprzednia</Button>
          <Button>Następna</Button>
        </ButtonGroup>
      </div>
      <CustomTabPanel value={value} index={0}>
        <SurveysSurveyView />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </>
  )
}

export default SurveysSurveyPage
