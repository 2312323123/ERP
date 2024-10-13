import { Box, CircularProgress } from '@mui/material'

const BigSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh" // Full viewport height for centering
    >
      <CircularProgress size={80} /> {/* Large loading spinner */}
    </Box>
  )
}

export default BigSpinner
