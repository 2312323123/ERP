import { Box, Typography, TextField } from '@mui/material'
import {
  getFieldToDistinctTheSurvey,
  setFieldToDistinctTheSurvey,
} from '../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useDispatch, useSelector } from 'react-redux'

const FieldToDistinctTheSurveySetup = () => {
  const dispatch = useDispatch()
  const fieldToDistinctTheSurvey = useSelector(getFieldToDistinctTheSurvey)

  return (
    <Box my={3}>
      <Typography variant="h5" gutterBottom>
        Pole z ankiety, którego zawartość widać w liście ankiet, np. imię:
      </Typography>
      <TextField
        fullWidth
        label="Pole"
        value={fieldToDistinctTheSurvey}
        onChange={(e) => dispatch(setFieldToDistinctTheSurvey(e.target.value))}
        variant="outlined"
        margin="normal"
      />
    </Box>
  )
}

export default FieldToDistinctTheSurveySetup
