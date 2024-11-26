import { Box } from '@mui/material'
import { AvailabilityDisplay } from './components/AvailabilityDisplay/AvailabilityDisplay'
import { AvailabilityUserSelector } from './components/AvailabilityUserSelector/AvailabilityUserSelector'

export const AvailabilityBrowser = () => {
  return (
    <div>
      AvailabilityBrowser
      <AvailabilityUserSelector />
      <AvailabilityDisplay />
      <Box sx={{ height: '25vh' }} />
    </div>
  )
}
