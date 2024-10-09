import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, MenuItem, Typography, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

export interface Criterion {
  name: string
  description: string
  weight: number
}
export interface SurveyEvaluationResult {
  marks: number[]
  comment: string
}

interface Props {
  criteria: Criterion[]
  markTags: string[]
  onSubmit: (data: SurveyEvaluationResult) => void
  demoMode?: boolean // fires onSubmit on every change
  initialMarks?: number[]
  initialComment?: string
}

const EvaluationForm = ({ criteria, markTags, onSubmit, demoMode, initialMarks, initialComment }: Props) => {
  const initialMarksState = initialMarks ?? Array(criteria.length).fill(0)
  const [marks, setMarks] = useState<number[]>(initialMarksState)
  const [comment, setComment] = useState<string>(initialComment ?? '')

  const handleMarkChange = (index: number, value: number) => {
    const newMarks = [...marks]
    newMarks[index] = value
    setMarks(newMarks)
  }

  // when used in survey stage settings panel
  useEffect(() => {
    if (demoMode) {
      const structuredData = {
        marks,
        comment,
      }
      onSubmit(structuredData)
    }
  }, [marks, comment, demoMode, onSubmit])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // when used in survey stage settings panel
    if (demoMode) {
      const answer = window.confirm(
        'Normalnie w tym momencie ocena zostałaby zapisana. A w tym demo, jeśli teraz potwierdzisz, to odpowiedź zostanie zresetowana.',
      )
      if (answer) {
        setMarks(initialMarksState)
        setComment('')
      }
    }

    const structuredData = {
      marks: criteria.map((_, index) => marks[index]),
      comment,
    }
    onSubmit(structuredData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box my={2}>
        {criteria.map((element, index) => (
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
                  {`${grade} - ${markTags[gradeIndex]}`}
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
          inputProps={{ maxLength: 500 }}
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
