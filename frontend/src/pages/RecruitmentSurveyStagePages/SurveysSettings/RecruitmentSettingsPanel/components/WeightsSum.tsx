import { Typography } from '@mui/material'
import { useMemo } from 'react'
import {
  getDemoEvaluationState,
  getEvaluationCriteria,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useSelector } from 'react-redux'

const WeightsSum = () => {
  const evaluationCriteria = useSelector(getEvaluationCriteria)
  const demoEvaluationState = useSelector(getDemoEvaluationState)

  const sum = useMemo(() => {
    return evaluationCriteria.reduce((acc, curr, index) => acc + demoEvaluationState.marks[index] * curr.weight, 0)
  }, [evaluationCriteria, demoEvaluationState.marks])

  return (
    <>
      <Typography variant="body1">
        <b>Łączna waga:</b> <output>{isNaN(sum) ? 'Nie można obliczyć' : sum}</output>
      </Typography>
    </>
  )
}

export default WeightsSum
