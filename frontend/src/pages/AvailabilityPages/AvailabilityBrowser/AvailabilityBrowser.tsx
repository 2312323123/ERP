import { Box } from '@mui/material'
import { AvailabilityDisplay } from './components/AvailabilityDisplay/AvailabilityDisplay'
import { AvailabilityUserSelector } from './components/AvailabilityUserSelector/AvailabilityUserSelector'
import { getSelectedUsers } from '../../../store/slices/availabilitySlice'
import { useSelector } from 'react-redux'
import { useGetAvailabilityQuery } from '../../../services/availability'
import { useEffect } from 'react'

export const AvailabilityBrowser = () => {
  const selectedUsers = useSelector(getSelectedUsers)
  const { data: availabilities, refetch } = useGetAvailabilityQuery(selectedUsers, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    console.log('selectedUsers:')
    console.log(selectedUsers)

    setTimeout(() => refetch(), 0)
  }, [selectedUsers, refetch])

  return (
    <div>
      selectedUsers:
      <pre>{JSON.stringify(selectedUsers, null, 2)}</pre>
      availabilities:
      <pre>{JSON.stringify(availabilities, null, 2)}</pre>
      <AvailabilityUserSelector />
      <AvailabilityDisplay />
      <Box sx={{ height: '25vh' }} />
    </div>
  )
}
