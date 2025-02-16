import { Box, Typography, CircularProgress, Switch } from '@mui/material'
import useSetAcceptsSurveys from '../../../../../hooks/surveys/useSetAcceptsSurveys'
import { useGetAcceptsSurveysQuery } from '../../../../../services/erp'

const AcceptsSurveysSwitch = () => {
  const { data, isLoading: acceptsSurveysIsLoading } = useGetAcceptsSurveysQuery()

  const { isLoading, callback } = useSetAcceptsSurveys()

  const label = 'Akceptuje ankiety?'

  if (acceptsSurveysIsLoading) {
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
        checked={data?.accepts_surveys}
        onChange={() => callback(!data?.accepts_surveys)}
        color="primary"
        disabled={isLoading || acceptsSurveysIsLoading || !data}
      />
      <Typography variant="body1" ml={2}>
        {data?.accepts_surveys ? 'TAK' : 'NIE'}
      </Typography>
    </Box>
  )
}

export default AcceptsSurveysSwitch
