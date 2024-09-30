import React, { useState } from 'react'
import { Box, Button, TextField, MenuItem, Typography, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

// for use in result view
interface EvaluationResult {
  // picture is an url
  user: { name: string; picture: string }
  marks: { value: number }[]
  comment: string
}

interface CustomFieldNoOrder {
  name: string
  description: string
  weight: number
}
interface EvaluationSubmission {
  marks: { order: number; value: number }[]
  comment: string
}

interface EvaluationFormProps {
  evalElements: CustomFieldNoOrder[]
  gradeNames: string[]
  onSubmit: (data: EvaluationSubmission) => void
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ evalElements, gradeNames, onSubmit }) => {
  const [marks, setMarks] = useState<number[]>(Array(evalElements.length).fill(0))
  const [comment, setComment] = useState<string>('')

  const handleMarkChange = (index: number, value: number) => {
    const newMarks = [...marks]
    newMarks[index] = value
    setMarks(newMarks)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const structuredData = {
      marks: evalElements.map((_, index) => ({
        order: index + 1,
        value: marks[index],
      })),
      comment,
    }
    onSubmit(structuredData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box my={2}>
        <Typography variant="h6">Formularz oceny</Typography>
        {evalElements.map((element, index) => (
          <Box key={index} my={1}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">{element.name}</Typography>
              <Tooltip title={element.description} arrow>
                <IconButton size="small" sx={{ marginLeft: 1 }}>
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              select
              label="Ocena"
              value={marks[index]}
              onChange={(e) => handleMarkChange(index, Number(e.target.value))}
              variant="outlined"
              fullWidth
              required
            >
              {[1, 2, 3, 4, 5].map((grade, gradeIndex) => (
                <MenuItem key={gradeIndex} value={gradeIndex + 1}>
                  {`${grade} - ${gradeNames[gradeIndex]}`}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        ))}

        <TextField
          label="Komentarz"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ my: 2 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Zapisz ocenę
        </Button>
      </Box>
    </form>
  )
}

export default EvaluationForm
