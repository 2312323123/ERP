import { Box, Divider } from '@mui/material'
import EvaluationDisplay from '../../../../components/EvaluationDisplay'
import { useGetAllEvaluationsQuery, useGetCriteriaQuery } from '../../../../services/surveyStage'
import { useParams } from 'react-router-dom'
import EvaluationsSummary from './components/EvaluationsSummary'
import SurveyDisplayIdentitification from '../SurveysSurveyView/components/SurveyDisplayIdentitification'

const AllEvaluationsView = () => {
  const { uuid } = useParams()
  const { data: evaluations } = useGetAllEvaluationsQuery(uuid ?? '')
  const { data: criteria } = useGetCriteriaQuery()

  if (!evaluations || !criteria) {
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ padding: 2, maxWidth: '800px', margin: '0 auto' }}>
      <SurveyDisplayIdentitification />

      <EvaluationsSummary evaluations={evaluations} criteria={criteria} />

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {evaluations.map((evaluation, index) => (
          <EvaluationDisplay
            key={evaluation.id || index} // ensure each item has a unique key, using evaluation.id or index as fallback
            userName={evaluation.name}
            userPicture={evaluation.picture}
            surveyEvaluationResult={{
              marks: evaluation.marks,
              comment: evaluation.comment,
            }}
            criteria={criteria.evaluationCriteria}
          />
        ))}
      </Box>
    </Box>
  )
}

export default AllEvaluationsView
