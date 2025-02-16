import { Box, Avatar, Typography } from '@mui/material'
import { UserAvailibilityInfo } from '../../../../../../services/availability'
import { UserIdNamePicture } from '../../../../../../services/surveyStage'

interface Props {
  availabilities: UserAvailibilityInfo[]
  position: { x: number; y: number }
  usersIdsNamesPictures: UserIdNamePicture[]
}

const positionToTime = ({ x, y }: { x: number; y: number }) => {
  const day = Math.floor(x / (1000 / 7))
  const time = (y * 1440) / 800
  const totalTime = time + day * 1440
  return totalTime
}

const idToAvatar = (id: string, usersIdsNamesPictures: UserIdNamePicture[]) => {
  const user = usersIdsNamesPictures.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <Box component="li" display="flex" alignItems="center" gap={2}>
      <Avatar src={user.picture} alt={user.name} />
      <Box>
        <Typography variant="body1" color="text.primary">
          {user.name}
        </Typography>
      </Box>
    </Box>
  )
}

export const AvailabilitySummary = ({ availabilities, position, usersIdsNamesPictures }: Props) => {
  const ids = availabilities
    .filter((availability) => {
      const time = positionToTime(position)
      return availability.availability.some((a) => a.start <= time && time <= a.end)
    })
    .map((availability) => availability.id)

  // return <pre>{JSON.stringify(ids, null, 2)}</pre>
  return (
    <Box>
      <Typography variant="h6">Dostępni:</Typography>
      <Box component="ul">{ids.map((id) => idToAvatar(id, usersIdsNamesPictures))}</Box>
    </Box>
  )
}

/*
availabilities:
[
  {
    "id": "105887563550899714086",
    "availability": [
      {
        "start": 480,
        "end": 1080
      },
      {
        "start": 1920,
        "end": 1980
      },
      {
        "start": 2100,
        "end": 2640
      },
      {
*/
