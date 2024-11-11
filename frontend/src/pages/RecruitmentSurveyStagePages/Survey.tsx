import { Box, Paper, Typography } from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'

const Survey = () => {
  const { uuid } = useParams()

  if (uuid) {
    return (
      <>
        <Outlet />
      </>
    )
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#fef8f7" padding={2}>
      <Paper
        elevation={3}
        style={{
          padding: '24px 48px',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" style={{ fontWeight: '600' }}>
          Brawo! Wszystkie ankiety ocenione
        </Typography>
      </Paper>
    </Box>
  )
}

export default Survey
