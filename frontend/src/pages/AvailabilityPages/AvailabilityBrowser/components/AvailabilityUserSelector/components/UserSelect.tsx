import { Box, Avatar, Typography, Button } from '@mui/material'
import { UserIdNamePicture } from '../../../../../../services/surveyStage'

interface Props {
  user: UserIdNamePicture
  callback: (id: string) => void
  isSelected: boolean
}

const UserSelect = ({ user, callback, isSelected }: Props) => {
  return (
    <Box component="li" display="flex" alignItems="center" gap={2}>
      <Avatar src={user.picture} alt={user.name} />
      <Box>
        <Typography variant="body1" color="text.primary">
          {user.name}
        </Typography>
      </Box>
      {!isSelected ? (
        <Button onClick={() => callback(user.id)} variant="contained" color="primary">
          Uwzględnij
        </Button>
      ) : (
        <Button onClick={() => callback(user.id)} sx={{ color: 'white' }} variant="contained" color="secondary">
          Nie uwzględniaj
        </Button>
      )}
    </Box>
  )
}

export default UserSelect
