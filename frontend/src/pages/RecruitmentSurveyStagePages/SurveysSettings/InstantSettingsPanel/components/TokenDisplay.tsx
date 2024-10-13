import { VisibilityOff, Visibility, ContentCopy } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getGoogleScriptsToken } from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'

const TokenDisplay = () => {
  const [showData, setShowData] = useState(false)
  const sensitiveData = useSelector(getGoogleScriptsToken)

  const handleToggleShowData = () => setShowData(!showData)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sensitiveData)
    alert('Copied to clipboard!')
  }

  return (
    <Box my={3}>
      <Typography variant="body1">Token do wklejenia w skrypt od przesyłania ankiet:</Typography>

      <TextField
        type={showData ? 'text' : 'password'}
        value={sensitiveData}
        label="Token"
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleShowData}>{showData ? <VisibilityOff /> : <Visibility />}</IconButton>
                <IconButton onClick={handleCopyToClipboard}>
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  )
}

export default TokenDisplay
