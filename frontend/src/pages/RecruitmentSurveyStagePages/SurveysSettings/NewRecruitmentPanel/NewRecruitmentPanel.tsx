import { Container, Box, Typography, TextField, Button, Alert, Snackbar } from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'
import { useCreateRecruitmentMutation } from '../../../../services/erp'
import CopyFrom from './components/CopyFrom'
import {
  getRecruitmentToCopyFrom,
  setRecruitmentToCopyFrom,
} from '../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useDispatch, useSelector } from 'react-redux'

interface Props {
  isFirstRecruitment?: boolean
}

const NewRecruitmentPanel = ({ isFirstRecruitment }: Props) => {
  const [recruitmentName, setRecruitmentName] = useState('')

  // Destructure the mutation hook
  const [createRecruitment, { isLoading, isSuccess, isError }] = useCreateRecruitmentMutation()

  const [touched, setTouched] = useState(false) // Track if the button was clicked

  const recruitmentToCopyFrom = useSelector(getRecruitmentToCopyFrom)
  const handleCreateRecruitment = (event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault()
    }

    setTouched(true) // Mark the field as touched when the button is clicked

    if (!recruitmentName) {
      return // Do not proceed if the field is empty
    }

    const newRecruitment = {
      name: recruitmentName,
      ...(recruitmentToCopyFrom && { copy_from_uuid: recruitmentToCopyFrom }),
    }

    createRecruitment(newRecruitment)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess) {
      setRecruitmentName('') // Clear the input field after successful creation
      setTouched(false) // Reset the touched state
      dispatch(setRecruitmentToCopyFrom(''))
    }
  }, [isSuccess, dispatch])

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Typography variant="h4" gutterBottom>
          Stwórz {isFirstRecruitment ? 'pierwszą' : 'nową'} rekrutację
        </Typography>

        <form onSubmit={handleCreateRecruitment}>
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

          <CopyFrom isFirstRecruitment={isFirstRecruitment} />

          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateRecruitment}
              disabled={isLoading} // Disable if required field is empty
            >
              Stwórz
            </Button>
          </div>
        </form>

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
