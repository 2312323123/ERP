import { Box, Typography } from '@mui/material'
import { UserEvaluation } from '../../../../../services/surveyStage'
import { SurveySettingsExported } from '../../../../../services/erp'

const calculateAverageMarks = (evaluations: UserEvaluation[], criteria: SurveySettingsExported) => {
  const criteriaCount = criteria.evaluationCriteria.length

  // initialize an array to hold the sum of marks for each criterion
  const sums = new Array(criteriaCount).fill(0)

  // loop through all evaluations and accumulate the marks for each criterion
  evaluations.forEach((evaluation) => {
    evaluation.marks.forEach((mark, index) => {
      sums[index] += mark
    })
  })

  // calculate the average for each criterion
  const averages = sums.map((sum) => sum / evaluations.length)
  return averages
}

const EvaluationsSummary = ({
  evaluations,
  criteria,
}: {
  evaluations: UserEvaluation[]
  criteria: SurveySettingsExported
}) => {
  // get the average marks for each criterion
  const averages = calculateAverageMarks(evaluations, criteria)

  return (
    // display average marks for each criterion
    <>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }} gutterBottom>
        Średnia ocen:
      </Typography>
      <Box width="100%" display="flex" sx={{ marginBottom: 2 }}>
        <Box pr={2}>
          {criteria.evaluationCriteria.map((criterion, index: number) => (
            <Box key={index} mb={1}>
              <Typography variant="body1">{criterion.name}</Typography>
            </Box>
          ))}
        </Box>

        {/* Column for Marks */}
        <Box pr={2} textAlign="left">
          {criteria.evaluationCriteria.map((_, index: number) => (
            <Box key={index} mb={1}>
              <Typography variant="body1">{averages[index]?.toFixed(2) || 'N/A'}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default EvaluationsSummary
