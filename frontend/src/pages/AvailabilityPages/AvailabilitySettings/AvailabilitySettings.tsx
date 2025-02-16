import { Box, Button, Typography } from '@mui/material'
import { FormHandle, NonavailabilityInputForm } from './components/NonavailabilityInputForm'
import { useGetAvailabilityQuery } from '../../../services/availability'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../../../store/slices/authSlice'
import { useEffect, useRef } from 'react'
import { getSettingsAvailability, setSettingsAvailability } from '../../../store/slices/availabilitySlice'
import { useUpdateUserAvailability } from '../../../hooks/availability/useUpdateUserAvailability'
import { geAvailabilitytComplement } from './components/getAvailabilityComplement'

export const AvailabilitySettings = () => {
  const myId = useSelector(getId)
  const { data: databaseAvailability } = useGetAvailabilityQuery([myId])
  const formRef = useRef<FormHandle | null>(null)

  const dispatch = useDispatch()

  const { isUpdateUserAvailabilityLoading, updateUserAvailability } = useUpdateUserAvailability()

  useEffect(() => {
    if (databaseAvailability) {
      dispatch(setSettingsAvailability(geAvailabilitytComplement(databaseAvailability[0]?.availability) || []))
      formRef.current?.reset()
    }
  }, [databaseAvailability, dispatch])

  const clear = () => {
    dispatch(setSettingsAvailability([]))
    formRef.current?.reset()
  }

  const reset = () => {
    if (databaseAvailability) {
      dispatch(setSettingsAvailability(databaseAvailability[0]?.availability || []))
      formRef.current?.reset()
    }
  }

  const settingsAvailability = useSelector(getSettingsAvailability)
  const save = () => {
    updateUserAvailability({
      availability: geAvailabilitytComplement(settingsAvailability),
    })
  }

  return (
    <>
      <Box
        p={1}
        sx={{
          position: 'sticky',
          top: '64px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '1px 1px 3px #ccc',
          background: 'white',
          zIndex: 1,
        }}
      >
        <Typography variant="h5" mr={5}>
          Zaznacz, kiedy na pewno nie możesz:
        </Typography>
        <Button
          onClick={save}
          disabled={isUpdateUserAvailabilityLoading}
          sx={{ marginRight: '1rem' }}
          variant="contained"
          color="primary"
        >
          Zapisz
        </Button>
        <Button onClick={clear} sx={{ marginRight: '1rem', color: 'white' }} variant="contained" color="secondary">
          Wyczyść
        </Button>
        <Button onClick={reset} sx={{ marginRight: '1rem', color: 'white' }} variant="contained" color="secondary">
          Resetuj
        </Button>
      </Box>
      <Box m={1}>
        <NonavailabilityInputForm ref={formRef} />
        <Box sx={{ height: '25vh' }} />
      </Box>
    </>
  )
}
