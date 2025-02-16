import { Box, Typography, Avatar, Divider } from '@mui/material'
import { Criterion } from './EvaluationForm'

interface EvaluationDisplayProps {
  userName: string
  userPicture: string
  surveyEvaluationResult: {
    marks: number[]
    comment: string
  }
  criteria: Criterion[]
}

const EvaluationDisplay = ({
  userName,
  userPicture,
  surveyEvaluationResult: { marks, comment },
  criteria,
}: EvaluationDisplayProps) => {
  return (
    <Box p={2} border={1} borderRadius={2} width="100%">
      {/* User Info */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={userPicture} sx={{ width: 50, height: 50, borderRadius: '8px', marginRight: 2 }} />
        <Typography variant="h6">{userName}</Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Evaluation Details */}
      <Box width="100%" display="flex">
        {/* Column for Field Names */}
        <Box pr={2}>
          {criteria.map((field, index) => (
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
          <Typography variant="body2" sx={{ whiteSpace: 'pre' }}>
            {comment}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default EvaluationDisplay
