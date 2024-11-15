import Markdown from 'react-markdown'
import { useGetSurveyGradingInstructionQuery } from '../../services/erp'
import { Box, Typography } from '@mui/material'
import { NotShowRecruitmentIfSetNotTo } from './NotShowRecruitmentIfSetNotTo'

const SurveysHelp = () => {
  const { data } = useGetSurveyGradingInstructionQuery()

  return (
    <NotShowRecruitmentIfSetNotTo>
      <Box sx={{ padding: 2, maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h6" align="center" sx={{ color: 'text.secondary' }}>
          Jak oceniać
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'text.secondary' }}>
          (Ta pomoc jest zawsze dostępna jako zakładka "Jak oceniać" w pasku po lewej stronie)
        </Typography>
        {/* Content for the box goes here */}
        <Markdown>{data?.grading_instruction}</Markdown>
      </Box>
    </NotShowRecruitmentIfSetNotTo>
  )
}

export default SurveysHelp
