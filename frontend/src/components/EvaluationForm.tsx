import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, MenuItem, Typography, Tooltip, IconButton } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { SurveyEvaluationToSend } from '../services/surveyStage'
import { surveyEvaluatingTurnedOffAlert } from '../utils/surveyEvaluatingTurnedOffAlert'

export interface Criterion {
  name: string
  description: string
  weight: number
}

interface Props {
  surveyUuid?: string
  criteria: Criterion[]
  markTags: string[]
  onSubmit: (data: SurveyEvaluationToSend) => void
  demoMode?: boolean // fires onSubmit on every change
  initialMarks?: number[]
  initialComment?: string
  reEvaluating?: boolean
  isEvaluationTurnedOff?: boolean
}

const EvaluationForm = ({
  surveyUuid,
  criteria,
  markTags,
  onSubmit,
  demoMode,
  initialMarks,
  initialComment,
  reEvaluating, // used just to not clear on submit, but probably could be used in the other place reevaluation is considered in this file
  isEvaluationTurnedOff,
}: Props) => {
  const [marks, setMarks] = useState<(number | string)[]>(initialMarks ?? Array(criteria.length).fill(''))
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
        surveyUuid: '',
        marks,
        comment,
      } as SurveyEvaluationToSend
      onSubmit(structuredData)
    }
  }, [marks, comment, demoMode, onSubmit])

  // for initial values, this worked for the real evaluation
  useEffect(() => {
    if (initialMarks) {
      setMarks(initialMarks)
    } else {
      setMarks(Array(criteria.length).fill(''))
    }

    if (initialComment) {
      setComment(initialComment)
    } else {
      setComment('')
    }
  }, [initialMarks, initialComment, criteria])

  // handle form submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    // when used in survey stage settings panel
    if (demoMode) {
      const answer = window.confirm(
        'Normalnie w tym momencie ocena zostałaby zapisana. A w tym demo, jeśli teraz potwierdzisz, to odpowiedź zostanie zresetowana.',
      )
      if (answer) {
        setMarks([])
        setComment('')
      }
    }

    if (!demoMode) {
      if (isEvaluationTurnedOff) {
        surveyEvaluatingTurnedOffAlert()
        return
      }
      const structuredData = {
        surveyUuid: surveyUuid,
        marks: criteria.map((_, index) => marks[index]),
        comment,
      } as SurveyEvaluationToSend
      onSubmit(structuredData)
      if (!reEvaluating) {
        setMarks([])
        setComment('')
      }
    }
  }

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <form onSubmit={handleSubmit}>
      <Box my={2}>
        {criteria.map((element, index) => (
          <Box key={index} my={1}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">{element.name}</Typography>
              <Tooltip
                title={
                  <div>
                    {element.description}
                    <br />
                    Waga: {element.weight}
                  </div>
                }
                arrow
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                disableHoverListener
              >
                <IconButton
                  onMouseEnter={handleOpen} // For mouse hover
                  onMouseLeave={handleClose} // For mouse leave
                  onTouchStart={handleOpen} // For touch devices
                  size="small"
                  sx={{ marginLeft: 1 }}
                >
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
