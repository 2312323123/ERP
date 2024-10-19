import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import {
  useGetActiveRecruitmentQuery,
  useGetAllRecruitmentsQuery,
  useSetActiveRecruitmentMutation,
} from '../../../../../services/erp'
import { useState } from 'react'

const SetActiveRecruitment = () => {
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()
  const { data: recruitments, error, isLoading } = useGetAllRecruitmentsQuery()

  const [selectedRecruitment, setSelectedRecruitment] = useState('')

  // Destructure the mutation hook
  const [
    setActiveRecruitment,
    {
      isLoading: setActiveRecruitmentIsLoading,
      isSuccess: setActiveRecruitmentIsSuccess,
      isError: setActiveRecruitmentIsError,
    },
  ] = useSetActiveRecruitmentMutation()

  const handleSaveChanges = () => {
    const confirmSave = window.confirm(
      `Czy chcesz zapisać zmiany w tej rekru, z której wychodzisz? (${activeRecruitment?.name})`,
    )
    if (confirmSave) {
      // Implement save logic here
      alert('Changes saved!') // Placeholder for actual save logic
    }
    return confirmSave
  }
  const trySettingSelectedRecruitment = (value: string) => {
    setActiveRecruitment(value)
    // const confirmSave = handleSaveChanges()

    // if (!confirmSave) {
    //   const confirmExit = window.confirm('Czy na pewno chcesz zmienić aktywną rekru?')
    //   if (confirmExit) {
    //     setSelectedRecruitment(value)
    //   }
    // }
  }

  return (
    <Box my={3}>
      <Typography variant="body1">Tu możesz zmienić rekrutację:</Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Wybierz rekrutację</InputLabel>
        <Select
          value={activeRecruitment?.uuid}
          onChange={(e) => trySettingSelectedRecruitment(e.target.value)}
          label="Wybierz rekrutację"
        >
          {recruitments?.map((recruitment) => (
            <MenuItem key={recruitment.uuid} value={recruitment.uuid}>
              {recruitment.name} - utworzono: {new Date(recruitment.startDate).toLocaleDateString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default SetActiveRecruitment
