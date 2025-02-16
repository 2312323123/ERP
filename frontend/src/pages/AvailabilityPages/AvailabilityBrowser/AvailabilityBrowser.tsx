import { Box } from '@mui/material'
import { AvailabilityDisplay } from './components/AvailabilityDisplay/AvailabilityDisplay'
import { AvailabilityUserSelector } from './components/AvailabilityUserSelector/AvailabilityUserSelector'
import { getSelectedUsers } from '../../../store/slices/availabilitySlice'
import { useSelector } from 'react-redux'
import { useGetAvailabilityQuery } from '../../../services/availability'
import { useEffect } from 'react'
import { useGetUsersIdsNamesPicturesQuery } from '../../../services/interviewStage'

export const AvailabilityBrowser = () => {
  const selectedUsers = useSelector(getSelectedUsers)
  const { data: availabilities, refetch } = useGetAvailabilityQuery(selectedUsers, { refetchOnMountOrArgChange: true })
  const { data: usersIdsNamesPictures } = useGetUsersIdsNamesPicturesQuery()

  useEffect(() => {
    console.log('selectedUsers:')
    console.log(selectedUsers)

    setTimeout(() => refetch(), 0)
  }, [selectedUsers, refetch])

  return (
    <div>
      <AvailabilityUserSelector />
      {availabilities && usersIdsNamesPictures && (
        <AvailabilityDisplay availabilities={availabilities} usersIdsNamesPictures={usersIdsNamesPictures} />
      )}
      <Box sx={{ height: '25vh' }} />
    </div>
  )
}
