import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import {
  getEvaluatorsCanEvaluate,
  setEvaluatorsCanEvaluate,
} from '../../../../store/slices/surveyStage/surveySettingsPageSlice'
import {
  getAcceptsSurveys,
  getActiveRecruitment,
  getRecruitmentVisible,
  setAcceptsSurveys,
  setRectuitmentVisible,
} from '../../../../store/slices/surveyStage/surveyUniversalSlice'
import OneFieldBooleanTableDbSwitchButton from '../../../../utils/OneFieldBooleanTableDbSwitchButton'
import TokenDisplay from './components/TokenDisplay'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const InstantSettingsPanel = () => {
  const activeRecruitment = useSelector(getActiveRecruitment)

  const [selectedRecruitment, setSelectedRecruitment] = useState<string>('')

  const acceptsSurveys = useSelector(getAcceptsSurveys)
  const recruitmentVisible = useSelector(getRecruitmentVisible)
  const evaluatorsCanEvaluate = useSelector(getEvaluatorsCanEvaluate)
  // const activeRecruitment = useSelector(getActiveRecruitment)

  const trySettingSelectedRecruitment = (value: string) => {
    const confirmSave = handleSaveChanges()

    if (!confirmSave) {
      const confirmExit = window.confirm('Czy na pewno chcesz wyjść z tej rekru?')
      if (confirmExit) {
        setSelectedRecruitment(value)
      }
    }
  }

  const handleSaveChanges = () => {
    const confirmSave = window.confirm('Czy chcesz zapisać zmiany w tej rekru, z której wychodzisz?')
    if (confirmSave) {
      // Implement save logic here
      alert('Changes saved!') // Placeholder for actual save logic
    }
    return confirmSave
  }

  return (
    <Container maxWidth="md">
      {/* Settings Header */}
      <Typography variant="h4" gutterBottom>
        Ustawienia zmieniane natychmiastowo
      </Typography>

      {/* Create New Recruitment */}
      <Box my={3}>
        {/* Active Recruitment Details */}
        <Typography variant="h5" gutterBottom>
          Wybrana rekrutacja: {activeRecruitment ? activeRecruitment.name : 'brak w systemie'}, początek:{' '}
          {activeRecruitment ? activeRecruitment?.date : 'brak'}
        </Typography>

        {/* Choose Recruitment */}
        <Box my={3}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Wybierz rekrutację</InputLabel>
            <Select
              value={selectedRecruitment}
              onChange={(e) => trySettingSelectedRecruitment(e.target.value)}
              label="Wybierz rekrutację"
            >
              <MenuItem value="recruitment1">Recruitment 1</MenuItem>
              <MenuItem value="recruitment2">Recruitment 2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Token Output */}
        <TokenDisplay />

        {/* Akceptuje ankiety Switch */}
        <OneFieldBooleanTableDbSwitchButton
          theValue={acceptsSurveys}
          setterToDispatch={setAcceptsSurveys}
          label="Akceptuje ankiety?"
          path="/api/surveys/accepts-surveys"
          returnFieldName="accepts_surveys"
        />

        {/* Rekrutacja aktywna (widoczna dla ludzi) Switch */}
        <OneFieldBooleanTableDbSwitchButton
          theValue={recruitmentVisible}
          setterToDispatch={setRectuitmentVisible}
          label="Rekrutacja aktywna (widoczna dla ludzi)?"
          path="/api/surveys/can-people-see-recruitment"
          returnFieldName="can_people_see_recruitment"
        />

        {/* Można Oceniać Switch */}
        <OneFieldBooleanTableDbSwitchButton
          theValue={evaluatorsCanEvaluate}
          setterToDispatch={setEvaluatorsCanEvaluate}
          label="Można oceniać?"
          path="/api/surveys/can-evaluate-surveys"
          returnFieldName="can_evaluate_surveys"
        />
      </Box>
    </Container>
  )
}

export default InstantSettingsPanel
