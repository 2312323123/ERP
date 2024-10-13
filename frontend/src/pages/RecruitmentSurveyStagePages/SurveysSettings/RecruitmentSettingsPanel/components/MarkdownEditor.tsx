import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography } from '@mui/material'
import {
  getGradingInstruction,
  setGradingInstruction,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useDispatch, useSelector } from 'react-redux'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import Markdown from 'react-markdown'

const MarkdownEditor = () => {
  const dispatch = useDispatch()
  const gradingInstruction = useSelector(getGradingInstruction)
  const [expanded, setExpanded] = useState<boolean>(true) // To keep the accordion open

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded((expanded) => !expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          Instrukcja oceniania (markdown) (Pokazywana na początku przy pierwszym wejściu i w zakładce 'Jak oceniać')
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          multiline
          variant="outlined"
          fullWidth
          minRows={3} // Set the initial height here
          placeholder="Type your text here..."
          value={gradingInstruction}
          onChange={(e) => dispatch(setGradingInstruction(e.target.value))}
          // onChange={(e) => alert(e.target.value)}
        />
      </AccordionDetails>
      <Box
        sx={{
          border: '1px solid #ccc', // Set the border color
          borderRadius: 1, // Round the corners
          padding: 2, // Add padding inside the box
          mt: 2, // Margin top to separate from the text field
        }}
      >
        {/* Content for the box goes here */}
        <Markdown>{gradingInstruction}</Markdown>
      </Box>
    </Accordion>
  )
}

export default MarkdownEditor
