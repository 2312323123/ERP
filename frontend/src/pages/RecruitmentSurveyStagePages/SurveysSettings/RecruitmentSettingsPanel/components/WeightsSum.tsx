import { Typography } from '@mui/material'
import { useMemo } from 'react'
import {
  getDemoEvaluationState,
  getEvaluationCriteriaSetup,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useSelector } from 'react-redux'

const WeightsSum = () => {
  const evaluationCriteriaSetup = useSelector(getEvaluationCriteriaSetup)
  const demoEvaluationState = useSelector(getDemoEvaluationState)

  const sum = useMemo(() => {
    return evaluationCriteriaSetup.criteria.reduce(
      (acc, curr, index) => acc + demoEvaluationState.marks[index] * curr.weight,
      0,
    )
  }, [evaluationCriteriaSetup.criteria, demoEvaluationState.marks])

  return (
    <>
      <Typography variant="body1">
        <b>Łączna waga:</b> <output>{isNaN(sum) ? 'Nie można obliczyć' : sum}</output>
      </Typography>
    </>
  )
}

export default WeightsSum
