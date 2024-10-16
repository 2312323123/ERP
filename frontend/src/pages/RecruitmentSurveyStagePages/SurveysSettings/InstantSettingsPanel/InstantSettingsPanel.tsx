import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import {
  getAcceptsSurveys,
  // getActiveRecruitment,
  getEvaluatorsCanEvaluate,
  getRecruitmentVisible,
  setAcceptsSurveys,
  setEvaluatorsCanEvaluate,
  setRectuitmentVisible,
} from '../../../../store/slices/surveyStage/surveyUniversalSlice'
import OneFieldBooleanTableDbSwitchButton from '../../../../utils/OneFieldBooleanTableDbSwitchButton'
import TokenDisplay from './components/TokenDisplay'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useGetActiveRecruitmentQuery, useGetAllRecruitmentsQuery } from '../../../../services/erp'

const InstantSettingsPanel = () => {
  // const activeRecruitment = useSelector(getActiveRecruitment)
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()
  const { data: recruitments, error, isLoading } = useGetAllRecruitmentsQuery()

  const [selectedRecruitment, setSelectedRecruitment] = useState<string>('')

  const acceptsSurveys = useSelector(getAcceptsSurveys)
  const recruitmentVisible = useSelector(getRecruitmentVisible)
  const evaluatorsCanEvaluate = useSelector(getEvaluatorsCanEvaluate)
  // const activeRecruitment = useSelector(getActiveRecruitment)

  const trySettingSelectedRecruitment = (value: string) => {
    const confirmSave = handleSaveChanges()

    if (!confirmSave) {
      const confirmExit = window.confirm('Czy na pewno chcesz zmienić aktywną rekru?')
      if (confirmExit) {
        setSelectedRecruitment(value)
      }
    }
  }

  const handleSaveChanges = () => {
    const confirmSave = window.confirm(
      `Czy chcesz zapisać zmiany w tej rekru, z której wychodzisz? (${activeRecruitment?.name})`,
    )
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
      <h4>activeRecruitment</h4>
      {JSON.stringify(activeRecruitment)}
      <h4>recruitments</h4>
      {JSON.stringify(recruitments)}

      {/* Create New Recruitment */}
      <Box my={3}>
        {/* Active Recruitment Details */}
        <Typography variant="h5" gutterBottom>
          Wybrana rekrutacja: {activeRecruitment?.name ?? 'brak w systemie'}, początek:{' '}
          {activeRecruitment && recruitments
            ? new Date(
                recruitments.find((recruitment) => recruitment.uuid === activeRecruitment.uuid)?.startDate ?? '',
              ).toLocaleDateString()
            : 'brak'}
        </Typography>

        {/* Choose Recruitment */}
        <Box my={3}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Wybierz rekrutację</InputLabel>
            <Select
              value={activeRecruitment?.uuid}
              onChange={(e) => trySettingSelectedRecruitment(e.target.value)}
              label="Wybierz rekrutację"
            >
              {recruitments?.map((recruitment) => (
                <MenuItem key={recruitment.uuid} value={recruitment.uuid}>
                  {recruitment.name} - utworzono: {new Date(recruitment.startDate).toLocaleDateString()}
                </MenuItem>
              ))}
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
