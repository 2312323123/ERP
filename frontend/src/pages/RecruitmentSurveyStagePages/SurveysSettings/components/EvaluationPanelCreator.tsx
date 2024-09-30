import { Typography, Box, IconButton, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { CustomField } from '../SurveysSettings'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const EvaluationPanelCreator = () => {
  const [criteria, setCriteria] = useState<CustomField[]>([])

  // priceless, but only while debugging
  useEffect(() => {
    setCriteria([
      {
        order: 1,
        name: 'Pierwsze kryterium',
        description: 'Opis pierwszego kryterium',
        weight: 1,
      },
      {
        order: 2,
        name: 'Drugie kryterium',
        description: 'Opis drugiego kryterium',
        weight: 2,
      },
      {
        order: 3,
        name: 'Trzecie kryterium',
        description: 'Opis trzeciego kryterium',
        weight: 3,
      },
    ])
  }, [])

  const handleAddCriteria = () => {
    const newField = {
      order: criteria.length + 1,
      name: '',
      description: '',
      weight: 0,
    }
    setCriteria([...criteria, newField])

    // suctomFields.push(newField)
  }

  const handleCriteriaChange = (index: number, key: string, value: string | number) => {
    const newFields = [...criteria]
    newFields[index] = { ...newFields[index], [key]: value }
    setCriteria(newFields)

    // customFields[index][key] = value
  }

  const handleDeleteCriteria = (index: number) => {
    const newFields = criteria.filter((_, i) => i !== index).map((field, i) => ({ ...field, order: i + 1 }))
    setCriteria(newFields)

    // customFields.splice(index, 1)
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newFields = [...criteria]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(index - 1, 0, movedField)
      setCriteria(newFields)

      // const fromIndex = customFields[index]
      // customFields[index] = customFields[index - 1]
      // customFields[index - 1] = fromIndex
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < criteria.length - 1) {
      const newFields = [...criteria]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(index + 1, 0, movedField)
      setCriteria(newFields)

      // const fromIndex = customFields[index]
      // customFields[index] = customFields[index + 1]
      // customFields[index + 1] = fromIndex
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Te pola co wystawianie oceny polega na tym że je wypełniasz:
      </Typography>

      {criteria.map((field, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2} mt={2} border={1} borderRadius={2} padding={2}>
          {/* Up/Down buttons */}
          <IconButton onClick={() => handleMoveUp(index)} disabled={index === 0}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton onClick={() => handleMoveDown(index)} disabled={index === criteria.length - 1}>
            <ArrowDownwardIcon />
          </IconButton>

          {/* Input fields */}
          <TextField
            value={field.name}
            onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
            variant="outlined"
            label="Nazwa"
            sx={{ marginX: 1, alignSelf: 'start' }}
          />
          <TextField
            value={field.description}
            onChange={(e) => handleCriteriaChange(index, 'description', e.target.value)}
            variant="outlined"
            label="Opis (wyświetlany po najechaniu na info)"
            multiline
            rows={4}
            sx={{ marginX: 1, flexGrow: 1 }}
          />
          <TextField
            type="number"
            value={field.weight}
            onChange={(e) => handleCriteriaChange(index, 'weight', Number(e.target.value))}
            variant="outlined"
            label="Waga"
            sx={{ marginX: 1, width: '80px' }}
          />

          {/* Delete button */}
          <IconButton onClick={() => handleDeleteCriteria(index)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleAddCriteria}>
        Stwórz kryterium oceniania
      </Button>
    </>
  )
}

export default EvaluationPanelCreator
