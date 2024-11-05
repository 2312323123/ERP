import { Box, Typography, CircularProgress, Switch } from '@mui/material'
import useSetEvaluatorsCanEvaluate from '../../../../../hooks/surveys/useSetEvaluatorsCanEvaluate'
import { useGetEvaluatorsCanEvaluateQuery } from '../../../../../services/erp'

const EvaluatorsCanEvaluateSwitch = () => {
  const { data, isLoading: evaluatorsCanEvaluateIsLoading } = useGetEvaluatorsCanEvaluateQuery()

  const { isLoading, callback } = useSetEvaluatorsCanEvaluate()

  const label = 'Można oceniać?'

  if (evaluatorsCanEvaluateIsLoading) {
    return (
      <Box my={3} display="flex" alignItems="center">
        <Typography variant="body1" mr={2}>
          {label}
        </Typography>

        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <Box my={3} display="flex" alignItems="center">
      <Typography variant="body1" mr={2}>
        {label}
      </Typography>

      <Switch
        checked={data?.can_evaluate_surveys}
        onChange={() => callback(!data?.can_evaluate_surveys)}
        color="primary"
        disabled={isLoading || evaluatorsCanEvaluateIsLoading || !data}
      />
      <Typography variant="body1" ml={2}>
        {data?.can_evaluate_surveys ? 'TAK' : 'NIE'}
      </Typography>
    </Box>
  )
}

export default EvaluatorsCanEvaluateSwitch
