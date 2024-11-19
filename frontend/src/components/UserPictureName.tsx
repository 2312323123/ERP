import { Box, Avatar, Typography } from '@mui/material'
import { useGetUsersIdsNamesPicturesQuery } from '../services/interviewStage'

interface Props {
  picture?: string
  name?: string
  userId?: string
}

const UserPictureName = ({ picture, name, userId }: Props) => {
  const { data: usersArray, isLoading: isLoadingUsers } = useGetUsersIdsNamesPicturesQuery()

  if (picture && name) {
    return (
      <Box display="flex" alignItems="center">
        <Avatar src={picture} alt={name} sx={{ marginRight: '0.75rem' }} />
        <Typography variant="body1" color="text.primary">
          {name}
        </Typography>
      </Box>
    )
  }

  if (usersArray && userId) {
    const user = usersArray.find((user) => user.id === userId)

    return (
      <Box display="flex" alignItems="center">
        <Avatar src={user?.picture} alt={user?.name} sx={{ marginRight: '0.75rem' }} />
        <Typography variant="body1" color="text.primary">
          {user?.name}
        </Typography>
      </Box>
    )
  }

  if (isLoadingUsers) {
    return <Typography variant="body1">Ładowanie...</Typography>
  }

  return 'Złe wartości użytkownika'
}

export default UserPictureName
