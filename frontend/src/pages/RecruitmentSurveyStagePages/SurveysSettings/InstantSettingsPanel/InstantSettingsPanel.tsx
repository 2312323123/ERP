import { Container, Typography, Box } from '@mui/material'
import TokenDisplay from './components/TokenDisplay'
import { useGetActiveRecruitmentQuery, useGetAllRecruitmentsQuery } from '../../../../services/erp'
import SetActiveRecruitment from './components/SetActiveRecruitment'
import AcceptsSurveysSwitch from './components/AcceptsSurveysSwitch'
import RecruitmentVisibleSwitch from './components/RecruitmentVisibleSwitch'
import EvaluatorsCanEvaluateSwitch from './components/EvaluatorsCanEvaluateSwitch'

const InstantSettingsPanel = () => {
  // const activeRecruitment = useSelector(getActiveRecruitment)
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()
  const { data: recruitments, error, isLoading } = useGetAllRecruitmentsQuery()

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
        <AcceptsSurveysSwitch />

        {/* Użytkownicy systemu widzą rekrutację? Switch */}
        <RecruitmentVisibleSwitch />

        {/* Można Oceniać Switch */}
        <EvaluatorsCanEvaluateSwitch />
      </Box>
    </Container>
  )
}

export default InstantSettingsPanel
