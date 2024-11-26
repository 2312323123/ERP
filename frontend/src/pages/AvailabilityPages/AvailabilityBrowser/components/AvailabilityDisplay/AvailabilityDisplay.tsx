import { Box, Typography } from '@mui/material'
import { UserAvailibilityInfo } from '../../../../../services/availability'
import { UserIdNamePicture } from '../../../../../services/surveyStage'
import { AvailabilityGrid } from './components/AvailabilityGrid'
import { AvailabilitySummary } from './components/AvailabilitySummary'

interface Props {
  availabilities: UserAvailibilityInfo[]
  usersIdsNamesPictures: UserIdNamePicture[]
}

export const AvailabilityDisplay = ({ availabilities, usersIdsNamesPictures }: Props) => {
  return (
    <Box m={1}>
      <Typography variant="h5" gutterBottom>
        Dostępność
      </Typography>
      <Box display="flex">
        <AvailabilityGrid />
        <AvailabilitySummary />
      </Box>
      <Box sx={{ height: '25vh' }} />
      availabilities:
      <pre>{JSON.stringify(availabilities, null, 2)}</pre>
    </Box>
  )
}
