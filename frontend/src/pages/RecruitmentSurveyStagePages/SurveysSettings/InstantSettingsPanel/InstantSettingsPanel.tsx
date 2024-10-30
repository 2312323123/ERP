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
import { useGetActiveRecruitmentQuery, useGetAllRecruitmentsQuery } from '../../../../services/erp'
import SetActiveRecruitment from './components/SetActiveRecruitment'

const InstantSettingsPanel = () => {
  // const activeRecruitment = useSelector(getActiveRecruitment)
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()
  const { data: recruitments, error, isLoading } = useGetAllRecruitmentsQuery()

  const acceptsSurveys = useSelector(getAcceptsSurveys)
  const recruitmentVisible = useSelector(getRecruitmentVisible)
  const evaluatorsCanEvaluate = useSelector(getEvaluatorsCanEvaluate)

  return (
    <Container maxWidth="md">
      {/* Settings Header */}
      <Typography variant="h4" gutterBottom>
        Ustawienia zmieniane natychmiastowo
      </Typography>
      {/* <h4>activeRecruitment</h4>
      {JSON.stringify(activeRecruitment)}
      <h4>recruitments</h4>
      {JSON.stringify(recruitments)} */}

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
        <SetActiveRecruitment />

        {/* Token Output */}
        <TokenDisplay />

        {/* Akceptuje ankiety Switch */}
        <OneFieldBooleanTableDbSwitchButton
          theValue={acceptsSurveys}
          setterToDispatch={setAcceptsSurveys}
          label="Akceptuje ankiety?"
          path="/api/surveys/accepts-surveys"
          returnFieldName="accepts_surveys"
          disabled={!activeRecruitment}
        />

        {/* Użytkownicy systemu widzą rekrutację? Switch */}
        <OneFieldBooleanTableDbSwitchButton
          theValue={recruitmentVisible}
          setterToDispatch={setRectuitmentVisible}
          label="Użytkownicy systemu widzą rekrutację?"
          path="/api/surveys/can-people-see-recruitment"
          returnFieldName="can_people_see_recruitment"
          disabled={!activeRecruitment}
        />

        {/* Można Oceniać Switch */}
        <OneFieldBooleanTableDbSwitchButton
          theValue={evaluatorsCanEvaluate}
          setterToDispatch={setEvaluatorsCanEvaluate}
          label="Można oceniać?"
          path="/api/surveys/can-evaluate-surveys"
          returnFieldName="can_evaluate_surveys"
          disabled={!activeRecruitment}
        />
      </Box>
    </Container>
  )
}

export default InstantSettingsPanel
