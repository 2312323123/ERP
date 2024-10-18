import { VisibilityOff, Visibility, ContentCopy } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material'
import { useState } from 'react'
import { useGetActiveRecruitmentQuery, useGetActiveRecruitmentSettingsQuery } from '../../../../../services/erp'

const TokenDisplay = () => {
  const [showData, setShowData] = useState(false)
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()
  const {
    data: activeRecruitmentSettings,
    error: activeRecruitmentSettingsError,
    isLoading: activeRecruitmentSettingsIsLoading,
  } = useGetActiveRecruitmentSettingsQuery(activeRecruitment?.uuid ?? '')

  const handleToggleShowData = () => setShowData(!showData)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(activeRecruitmentSettings?.token ?? '')
    alert('Copied to clipboard!')
  }

  return (
    <Box my={3}>
      <Typography variant="body1">Token do wklejenia w skrypt od przesyłania ankiet:</Typography>

      <TextField
        type={showData ? 'text' : 'password'}
        value={activeRecruitmentSettings?.token ?? ''}
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
