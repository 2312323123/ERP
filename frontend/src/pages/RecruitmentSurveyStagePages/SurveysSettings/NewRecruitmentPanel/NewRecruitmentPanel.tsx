import { Container, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { useState } from 'react'

const NewRecruitmentPanel = () => {
  const [newRecruitment, setNewRecruitment] = useState('')
  const [recruitmentSettings, setRecruitmentSettings] = useState<string | 'none'>('none')

  const handleCreateRecruitment = () => {
    console.log('New recruitment created:', newRecruitment)
  }

  return (
    <Container maxWidth="md">
      <Box my={3}>
        {/* List of editable fields */}
        <Typography variant="h4" gutterBottom>
          Stwórz nową rekrutację
        </Typography>

        <TextField
          fullWidth
          label="Nazwa"
          value={newRecruitment}
          onChange={(e) => setNewRecruitment(e.target.value)}
          variant="outlined"
          margin="normal"
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Skopiuj ustawienia z</InputLabel>
          <Select
            value={recruitmentSettings}
            onChange={(e) => setRecruitmentSettings(e.target.value)}
            label="Skopiuj ustawienia z"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleCreateRecruitment}>
          Stwórz
        </Button>
      </Box>
    </Container>
  )
}

export default NewRecruitmentPanel
