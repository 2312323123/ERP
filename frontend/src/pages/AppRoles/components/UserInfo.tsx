import { Card, CardMedia, CardContent, Typography, Chip, Box, Button } from '@mui/material'
import { AccountCreationRequest } from './AccountCreationRequests'
import useAccountCreationDecision from '../../../hooks/roles/useAccountCreationDesicion'

const UserInfo = ({ user }: { user: AccountCreationRequest }) => {
  const { email, email_verified, name, picture, id } = user

  const { isLoading: rejectIsLoading, callback: rejectRequest } = useAccountCreationDecision(id, 'reject')
  const { isLoading: acceptIsLoading, callback: acceptRequest } = useAccountCreationDecision(id, 'accept')

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
          <Button
            variant="outlined"
            color="error" // Reject button styled as outlined
            size="large"
            onClick={rejectRequest} // Handle reject action
            sx={{ flexGrow: 1, marginRight: 1 }} // Allow button to grow and add spacing
            disabled={rejectIsLoading || acceptIsLoading} // Disable button while processing
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large" // Big accept button
            onClick={acceptRequest} // Handle accept action
            sx={{ flexGrow: 1 }} // Allow button to
            disabled={acceptIsLoading || rejectIsLoading} // Disable button while processing
          >
            Accept
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserInfo
