import { Card, CardMedia, CardContent, Typography, Chip, Box, Button } from '@mui/material'
import { AccountCreationRequest } from './AccountCreationRequests'
import { logNetworkSuccess } from '../../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../../utils/logNetworkError'
import axios from 'axios'
import { AppContext } from '../../../App'
import { useContext, useState } from 'react'

const UserInfo = ({ user, refresh }: { user: AccountCreationRequest; refresh: () => void }) => {
  const { apiPathBase } = useContext(AppContext)
  const { email, email_verified, name, picture, id } = user
  const [processing, setProcessing] = useState(false)

  const acceptRequest = async () => {
    try {
      setProcessing(true)
      const res = await axios.post(`${apiPathBase}/api/auth/account-creation-decision`, {
        id,
        action: 'accept',
      })
      logNetworkSuccess(res, 'i7764t4')
      refresh()
      setProcessing(false)
    } catch (error) {
      alert('uh oh 4rty645tr4')
      logNetworkError(error as NetworkError, '4rty645tr4')
    }
  }

  const rejectRequest = async () => {
    try {
      setProcessing(true)
      const res = await axios.post(`${apiPathBase}/api/auth/account-creation-decision`, {
        id,
        action: 'reject',
      })
      logNetworkSuccess(res, 'o8iu65ty')
      refresh()
      setProcessing(false)
    } catch (error) {
      alert('uh oh r3re3er3')
      logNetworkError(error as NetworkError, 'r3re3er3')
    }
  }

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
            disabled={processing} // Disable button while processing
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large" // Big accept button
            onClick={acceptRequest} // Handle accept action
            sx={{ flexGrow: 1 }} // Allow button to
            disabled={processing} // Disable button while processing
          >
            Accept
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserInfo
