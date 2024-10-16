import { Container, Typography } from '@mui/material'
import { useGetActiveRecruitmentQuery } from '../../../../services/erp'

const TitlePanel = () => {
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()

  return (
    <Container maxWidth="md">
      {/* Settings Header */}
      <Typography variant="h4" gutterBottom>
        Rekrutacja {activeRecruitment ? activeRecruitment.name : '- brak rekrutacji w systemie!'}
      </Typography>
    </Container>
  )
}

export default TitlePanel
