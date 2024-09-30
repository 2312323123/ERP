import React from 'react'
import { Box, Typography, Avatar, Divider } from '@mui/material'

interface EvaluationResult {
  user: { name: string; picture: string }
  marks: number[]
  comment: string
}

interface CustomFieldNoOrder {
  name: string
  description: string
  weight: number
}

interface EvaluationFormProps {
  evalElements: CustomFieldNoOrder[]
  gradeNames: string[]
  onSubmit: (data: any) => void
}

interface EvaluationDisplayProps {
  result: EvaluationResult
  formProps: EvaluationFormProps
}

const EvaluationDisplay: React.FC<EvaluationDisplayProps> = ({ result, formProps }) => {
  const { user, marks, comment } = result
  const { evalElements, gradeNames } = formProps

  return (
    <Box p={2} border={1} borderRadius={2} width="100%">
      {/* User Info */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={user.picture} sx={{ width: 50, height: 50, borderRadius: '8px', marginRight: 2 }} />
        <Typography variant="h6">{user.name}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Evaluation Details */}
      <Box width="100%" display="flex">
        {/* Column for Field Names */}
        <Box pr={2}>
          {evalElements.map((field, index) => (
            <Box key={index} mb={1}>
              <Typography variant="body1">{field.name}</Typography>
            </Box>
          ))}
        </Box>

        {/* Column for Marks */}
        <Box pr={2} textAlign="left">
          {marks.map((mark, index) => (
            <Box key={index} mb={1}>
              <Typography variant="body1">{mark}</Typography>
            </Box>
          ))}
        </Box>

        {/* Comment Column */}
        <Box flexGrow={1} pl={2}>
          <Typography variant="body1">
            <strong>Comment:</strong>
          </Typography>
          <Typography variant="body2">{comment}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default EvaluationDisplay
