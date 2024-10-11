import { Box, Typography, TextField, IconButton, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFieldsNotToShow,
  handleAddFieldsNotToShow,
  handleDeleteFieldsNotToShow,
  handleFieldsNotToShowChange,
} from '../../../../store/slices/surveyStage/surveySettingsPageSlice'
import DeleteIcon from '@mui/icons-material/Delete'

const HiddenFieldsSetup = () => {
  const dispatch = useDispatch()
  const fieldsNotToShow = useSelector(getFieldsNotToShow)

  return (
    <Box my={3}>
      {/* List of editable fields */}
      <Typography variant="h5" gutterBottom>
        Pola z ankiety, których nie pokazujemy
      </Typography>

      {fieldsNotToShow.map((field, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2}>
          <TextField
            value={field}
            onChange={(e) => dispatch(handleFieldsNotToShowChange({ index, value: e.target.value }))}
            variant="outlined"
            fullWidth
            label={`Pole ${index + 1}`} // Fixing the label syntax
          />
          <IconButton onClick={() => dispatch(handleDeleteFieldsNotToShow({ index }))} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {/* Button to add a new field */}
      <Button variant="contained" color="primary" onClick={() => dispatch(handleAddFieldsNotToShow())}>
        Add Field
      </Button>
    </Box>
  )
}

export default HiddenFieldsSetup
