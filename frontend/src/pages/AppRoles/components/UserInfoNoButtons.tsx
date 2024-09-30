import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material'
import { AccountCreationRequest } from './AccountCreationRequests'

const UserInfoNoButtons = ({ user }: { user: AccountCreationRequest }) => {
  const { email, email_verified, name, picture } = user

  return (
    <Card sx={{ display: 'flex', maxWidth: 600, margin: 'auto', marginTop: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 150 }} // Fixed width for the image
        image={picture}
        alt={`${name}'s profile picture`}
      />
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {email}
        </Typography>
        <Box mt={1}>
          <Chip
            label={email_verified ? 'Verified' : 'Not Verified'}
            color={email_verified ? 'success' : 'error'}
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserInfoNoButtons
