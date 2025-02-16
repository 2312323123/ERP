import { VisibilityOff, Visibility, ContentCopy } from '@mui/icons-material'
import { Box, Typography, TextField, InputAdornment, IconButton, Link } from '@mui/material'
import { useState } from 'react'
import { useGetActiveRecruitmentQuery, useGetActiveRecruitmentSettingsQuery } from '../../../../../services/erp'

const TokenDisplay = () => {
  const [showData, setShowData] = useState(false)
  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  const { data: activeRecruitmentSettings, error: activeRecruitmentSettingsError } =
    useGetActiveRecruitmentSettingsQuery(activeRecruitment?.uuid ?? '')

  const handleToggleShowData = () => setShowData(!showData)

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(activeRecruitmentSettings?.token ?? '')
    alert('Skopiowano do schowka!')
  }

  return (
    <Box my={3}>
      <Typography variant="body1">Token do wklejenia w skrypt od przesyłania ankiet:</Typography>

      <TextField
        type={showData ? 'text' : 'password'}
        value={activeRecruitmentSettingsError ? '' : (activeRecruitmentSettings?.token ?? '')}
        label="Token"
        fullWidth
        disabled={!activeRecruitment}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleToggleShowData} disabled={!activeRecruitment}>
                  {showData ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                <IconButton onClick={handleCopyToClipboard} disabled={!activeRecruitment}>
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Link
        href="https://docs.google.com/document/d/1mGAQi4MeKBuy0oI1T9Nao1eIQkG7CfyB2zBxUSS-2NM/edit?usp=sharing"
        target="_blank"
      >
        Instrukcja, jak sprawić, żeby przesyłanie ankiet działało
      </Link>
    </Box>
  )
}

export default TokenDisplay
