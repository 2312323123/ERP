import { Box, Typography } from '@mui/material'
import { UserAvailibilityInfo } from '../../../../../services/availability'
import { UserIdNamePicture } from '../../../../../services/surveyStage'
import { AvailabilityGrid } from './components/AvailabilityGrid'
import { AvailabilitySummary } from './components/AvailabilitySummary'
import { useCallback, useEffect, useState } from 'react'
import { debounce, throttle } from 'lodash'

interface Props {
  availabilities: UserAvailibilityInfo[]
  usersIdsNamesPictures: UserIdNamePicture[]
}

const positionToTime = ({ x, y }: { x: number; y: number }) => {
  const day = Math.floor(x / (1000 / 7))
  const time = (y * 1440) / 800
  const totalTime = time + day * 1440
  return totalTime
}

export const AvailabilityDisplay = ({ availabilities, usersIdsNamesPictures }: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Debounced and throttled handler
  const updatePosition = useCallback(
    throttle(
      debounce((offsetX: number, offsetY: number) => {
        setPosition({ x: offsetX, y: offsetY })
      }, 100), // Debounce: wait 100ms
      200, // Throttle: at most every 200ms
    ),
    [],
  )

  const handleMouseMove = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent
    updatePosition(offsetX, offsetY)
  }

  const allAvailabilities = availabilities.map((obj) => obj.availability).reduce((acc, val) => acc.concat(val), [])

  /*
0
availability
Array(10)
0
{start: 480, end: 1080}
1
{start: 1920, end: 1980}
  */

  useEffect(() => {
    console.log('allAvailabilities:')
    console.log(allAvailabilities)

    console.log('position:', positionToTime(position))
  }, [position])

  return (
    <Box m={1}>
      <Typography variant="h5" gutterBottom>
        Dostępność
      </Typography>
      <Box display="flex">
        <AvailabilityGrid handleMouseMove={handleMouseMove} allAvailabilities={allAvailabilities} />
        <AvailabilitySummary
          availabilities={availabilities}
          position={position}
          usersIdsNamesPictures={usersIdsNamesPictures}
        />
      </Box>
      <Box sx={{ height: '25vh' }} />
    </Box>
  )
}
