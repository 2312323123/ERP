import { Container, Box, Typography, Button } from '@mui/material'
import useSaveRecruitmentSettings from '../../../../hooks/surveys/useSaveRecruitmentSettings'

const SaveSettingsButtonPanel = () => {
  const saveRecruitmentSettings = useSaveRecruitmentSettings()

  const handleSave = () => {
    saveRecruitmentSettings()
  }

  return (
    <Container
      sx={{
        position: 'sticky',
        zIndex: 10,
        top: '4rem',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid lightgray',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '0.75rem',
      }}
    >
      <Box maxWidth="md" width="100%" display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
        {/* Left Column */}
        <Box flex={1} flexBasis="75%">
          <Typography variant="h4" gutterBottom>
            Ustawienia wybranej rekrutacji
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            (jak skończysz, kliknij 'Zapisz', albo się nie zapisze)
          </Typography>
        </Box>

        {/* Right Column */}
        <Box flex={1} display="flex" justifyContent="flex-end" flexBasis="25%">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{
              fontSize: '1.25rem',
            }}
          >
            Zapisz
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default SaveSettingsButtonPanel
