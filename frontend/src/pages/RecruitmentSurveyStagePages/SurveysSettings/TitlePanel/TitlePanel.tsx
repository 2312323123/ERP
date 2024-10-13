import { Container, Typography } from '@mui/material'
import { getActiveRecruitment } from '../../../../store/slices/surveyStage/surveyUniversalSlice'
import { useSelector } from 'react-redux'

const TitlePanel = () => {
  const activeRecruitment = useSelector(getActiveRecruitment)

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
