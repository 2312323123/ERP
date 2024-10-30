import { Typography, Box, IconButton, TextField, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEvaluationCriteria,
  handleAddCriteria,
  handleCriteriaChange,
  handleDeleteCriteria,
  handleMoveDown,
  handleMoveUp,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useGetActiveRecruitmentQuery, useGetActiveRecruitmentSettingsQuery } from '../../../../../services/erp'

const EvaluationPanelCreator = () => {
  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  const { data: activeRecruitmentSettings } = useGetActiveRecruitmentSettingsQuery(activeRecruitment?.uuid ?? '')

  const criteria = useSelector(getEvaluationCriteria)
  const dispatch = useDispatch()

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Te pola, co wystawianie oceny polega na tym, że je wypełniasz:
      </Typography>

      {criteria.map((field, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2} mt={2} border={1} borderRadius={2} padding={2}>
          {/* Up/Down buttons */}
          <IconButton
            onClick={() => dispatch(handleMoveUp({ index }))}
            disabled={(index === 0 || activeRecruitmentSettings?.isThereAnyMark) ?? true}
          >
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton
            onClick={() => dispatch(handleMoveDown({ index }))}
            disabled={(index === criteria.length - 1 || activeRecruitmentSettings?.isThereAnyMark) ?? true}
          >
            <ArrowDownwardIcon />
          </IconButton>

          {/* Input fields */}
          <TextField
            value={field.name}
            onChange={(e) => dispatch(handleCriteriaChange({ index, key: 'name', value: e.target.value }))}
            variant="outlined"
            label="Nazwa"
            sx={{ marginX: 1, alignSelf: 'start' }}
            disabled={activeRecruitmentSettings?.isThereAnyMark ?? true}
          />
          <TextField
            value={field.description}
            onChange={(e) => dispatch(handleCriteriaChange({ index, key: 'description', value: e.target.value }))}
            variant="outlined"
            label="Opis (wyświetlany po najechaniu na info)"
            multiline
            rows={4}
            sx={{ marginX: 1, flexGrow: 1 }}
            disabled={activeRecruitmentSettings?.isThereAnyMark ?? true}
          />
          <TextField
            type="number"
            value={field.weight}
            onChange={(e) => dispatch(handleCriteriaChange({ index, key: 'weight', value: e.target.value }))}
            variant="outlined"
            label="Waga"
            sx={{ marginX: 1, width: '80px' }}
            disabled={activeRecruitmentSettings?.isThereAnyMark ?? true}
          />

          {/* Delete button */}
          <IconButton
            onClick={() => dispatch(handleDeleteCriteria({ index }))}
            color="secondary"
            disabled={activeRecruitmentSettings?.isThereAnyMark ?? true}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(handleAddCriteria())}
        disabled={activeRecruitmentSettings?.isThereAnyMark ?? true}
      >
        Stwórz kryterium oceniania
      </Button>
    </>
  )
}

export default EvaluationPanelCreator
