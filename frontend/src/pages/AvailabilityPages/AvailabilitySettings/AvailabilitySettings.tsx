import { Box, Button, Typography } from '@mui/material'
import { FormHandle, NonavailabilityInputForm } from './components/NonavailabilityInputForm'
import { useGetAvailabilityQuery } from '../../../services/availability'
import { useDispatch, useSelector } from 'react-redux'
import { getId } from '../../../store/slices/authSlice'
import { useEffect, useRef } from 'react'
import { setSettingsAvailability } from '../../../store/slices/availabilitySlice'

export const AvailabilitySettings = () => {
  const myId = useSelector(getId)
  const { data: databaseAvailability } = useGetAvailabilityQuery([myId])
  const formRef = useRef<FormHandle | null>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (databaseAvailability) {
      dispatch(setSettingsAvailability(databaseAvailability[0].availability))
      formRef.current?.reset()
    }
  }, [databaseAvailability, dispatch])

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
        }}
      >
        <Typography variant="h5" mr={5}>
          Zaznacz, kiedy na pewno nie możesz:
        </Typography>
        <Button sx={{ marginRight: '1rem' }} variant="contained" color="primary">
          Zapisz
        </Button>
        <Button sx={{ marginRight: '1rem', color: 'white' }} variant="contained" color="secondary">
          Wyczyść
        </Button>
        <Button sx={{ marginRight: '1rem', color: 'white' }} variant="contained" color="secondary">
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
