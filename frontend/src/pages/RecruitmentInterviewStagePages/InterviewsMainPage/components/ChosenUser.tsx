import { Box, Avatar, Typography } from '@mui/material'
import { UserIdNamePicture } from '../../../../services/surveyStage'

const ChosenUser = ({ user }: { user: UserIdNamePicture | undefined }) => {
  return (
    <div>
      {user && (
        <Box component="li" display="flex" alignItems="center" gap={2}>
          <Avatar src={user.picture} alt={user.name} />
          <Box>
            <Typography variant="body1" color="text.primary">
              {user.name}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  )
}

export default ChosenUser
