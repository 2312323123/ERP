import {
  Container,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Snackbar,
} from '@mui/material'
import { useState } from 'react'
import { useCreateRecruitmentMutation } from '../../../../services/erp'

interface Props {
  isFirstRecruitment?: boolean
}

const NewRecruitmentPanel = ({ isFirstRecruitment }: Props) => {
  const [recruitmentName, setRecruitmentName] = useState<string>('')
  const [recruitmentSettings, setRecruitmentSettings] = useState<string | 'none'>('none')

  // Destructure the mutation hook
  const [createRecruitment, { isLoading, isSuccess, isError }] = useCreateRecruitmentMutation()

  const [touched, setTouched] = useState(false) // Track if the button was clicked

  const handleCreateRecruitment = () => {
    setTouched(true) // Mark the field as touched when the button is clicked

    if (!recruitmentName) {
      return // Do not proceed if the field is empty
    }

    const newRecruitment = {
      name: recruitmentName,
    }

    createRecruitment(newRecruitment)
  }

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          Stwórz {isFirstRecruitment ? 'pierwszą' : 'nową'} rekrutację
        </Typography>

        <TextField
          fullWidth
          label="Nazwa"
          value={recruitmentName}
          onChange={(e) => setRecruitmentName(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          error={touched && !recruitmentName} // Show error only after button click
          helperText={touched && !recruitmentName ? 'Nazwa jest wymagana' : ''}
        />

        {!isFirstRecruitment && (
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
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRecruitment}
          disabled={isLoading} // Disable if required field is empty
        >
          Stwórz
        </Button>

        <Snackbar open={isError} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Wystąpił błąd przy tworzeniu rekrutacji!
          </Alert>
        </Snackbar>

        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            An error occurred!
          </Alert>
        </Snackbar> */}
      </Box>
    </Container>
  )
}

export default NewRecruitmentPanel
