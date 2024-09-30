import { Typography, Box, IconButton, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { CustomField } from '../SurveysSettings'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const EvaluationPanelCreator = () => {
  const [customFields, setCustomFields] = useState<CustomField[]>([])

  // priceless, but only while debugging
  useEffect(() => {
    setCustomFields([
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

  const handleAddCustomField = () => {
    const newField = {
      order: customFields.length + 1,
      name: '',
      description: '',
      weight: 0,
    }
    setCustomFields([...customFields, newField])

    // suctomFields.push(newField)
  }

  const handleCustomFieldChange = (index: number, key: string, value: string | number) => {
    const newFields = [...customFields]
    newFields[index] = { ...newFields[index], [key]: value }
    setCustomFields(newFields)

    // customFields[index][key] = value
  }

  const handleDeleteCustomField = (index: number) => {
    const newFields = customFields.filter((_, i) => i !== index).map((field, i) => ({ ...field, order: i + 1 }))
    setCustomFields(newFields)
    
    // customFields.splice(index, 1)
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newFields = [...customFields]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(index - 1, 0, movedField)
      setCustomFields(newFields)

      // const fromIndex = customFields[index]
      // customFields[index] = customFields[index - 1]
      // customFields[index - 1] = fromIndex
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < customFields.length - 1) {
      const newFields = [...customFields]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(index + 1, 0, movedField)
      setCustomFields(newFields)

      // const fromIndex = customFields[index]
      // customFields[index] = customFields[index + 1]
      // customFields[index + 1] = fromIndex
    }
  }

  return (
    <>
      {/* Custom fields info */}
      <Typography variant="h6" gutterBottom>
        Te pola co wystawianie oceny polega na tym że je wypełniasz:
      </Typography>

      {/* List of custom fields */}
      {customFields.map((field, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2} mt={2} border={1} borderRadius={2} padding={2}>
          {/* Up/Down buttons */}
          <IconButton onClick={() => handleMoveUp(index)} disabled={index === 0}>
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton onClick={() => handleMoveDown(index)} disabled={index === customFields.length - 1}>
            <ArrowDownwardIcon />
          </IconButton>

          {/* Input fields */}
          <TextField
            value={field.name}
            onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
            variant="outlined"
            label="Nazwa"
            sx={{ marginX: 1, alignSelf: 'start' }}
          />
          <TextField
            value={field.description}
            onChange={(e) => handleCustomFieldChange(index, 'description', e.target.value)}
            variant="outlined"
            label="Opis (wyświetlany po najechaniu na info)"
            multiline // Set to true for a long input text area
            rows={4} // Number of visible rows
            sx={{ marginX: 1, flexGrow: 1 }}
          />
          <TextField
            type="number"
            value={field.weight}
            onChange={(e) => handleCustomFieldChange(index, 'weight', Number(e.target.value))}
            variant="outlined"
            label="Waga"
            sx={{ marginX: 1, width: '80px' }} // Set width to a specific value
          />

          {/* Delete button */}
          <IconButton onClick={() => handleDeleteCustomField(index)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {/* Button to add a new custom field */}
      <Button variant="contained" color="primary" onClick={handleAddCustomField}>
        Stwórz kryterium oceniania
      </Button>
    </>
  )
}

export default EvaluationPanelCreator
