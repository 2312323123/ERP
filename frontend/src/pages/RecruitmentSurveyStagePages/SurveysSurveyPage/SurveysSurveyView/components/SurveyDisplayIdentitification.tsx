import { Divider, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetCriteriaQuery, useGetSurveyQuery } from '../../../../../services/surveyStage'

const SurveyDisplayIdentitification = () => {
  const { uuid } = useParams()
  const { data: criteria } = useGetCriteriaQuery()
  const { data: survey } = useGetSurveyQuery(uuid ?? '')

  return (
    <>
      {criteria?.fieldToDistinctTheSurvey &&
        survey?.responses?.find((response) => response?.question === criteria.fieldToDistinctTheSurvey)?.answer && (
          <>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }} gutterBottom>
              {survey?.responses?.find((response) => response?.question === criteria.fieldToDistinctTheSurvey)?.answer}
            </Typography>

            <Divider sx={{ mb: 2 }} />
          </>
        )}
    </>
  )
}

export default SurveyDisplayIdentitification
