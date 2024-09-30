import React, { useState } from 'react'
import { Box, Button, TextField, MenuItem, Typography, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

interface EvalElement {
  name: string
  description: string
  weight: number
}

interface EvaluationFormProps {
  evalElements: EvalElement[]
  gradeNames: string[]
  onSubmit: (data: { marks: { order: number; value: number }[]; comment: string }) => void
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
        <Typography variant="h6">Evaluation Form</Typography>
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
              label="Mark"
              value={marks[index]}
              onChange={(e) => handleMarkChange(index, Number(e.target.value))}
              variant="outlined"
              fullWidth
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
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default EvaluationForm
