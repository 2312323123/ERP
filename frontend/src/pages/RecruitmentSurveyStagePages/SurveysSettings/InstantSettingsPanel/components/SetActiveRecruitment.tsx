import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import {
  useGetActiveRecruitmentQuery,
  useGetAllRecruitmentsQuery,
  useSetActiveRecruitmentMutation,
} from '../../../../../services/erp'
import useSaveRecruitmentSettings from '../../../../../hooks/surveys/useSaveRecruitmentSettings'

const SetActiveRecruitment = () => {
  const saveRecruitmentSettings = useSaveRecruitmentSettings()

  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  const { data: recruitments } = useGetAllRecruitmentsQuery()

  // Destructure the mutation hook
  const [setActiveRecruitment] = useSetActiveRecruitmentMutation()

  const handleSaveChanges = () => {
    const confirmSave = window.confirm(
      `Czy chcesz zapisać zmiany w tej rekru, z której wychodzisz? (${activeRecruitment?.name})`,
    )
    if (confirmSave) {
      saveRecruitmentSettings()
      alert('Zapisano!') // Placeholder for actual save logic
    }
    return confirmSave
  }
  const trySettingSelectedRecruitment = (value: string) => {
    if (!activeRecruitment) {
      setActiveRecruitment(value)
      return
    }

    const confirmSave = handleSaveChanges()

    if (!confirmSave) {
      const confirmExit = window.confirm('Czy na pewno chcesz zmienić aktywną rekru?')
      if (confirmExit) {
        setActiveRecruitment(value)
      }
    } else {
      setActiveRecruitment(value)
    }
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
