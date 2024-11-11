import { Typography, Card, CardContent, Divider, Box } from '@mui/material'

interface Response {
  question: string
  type: string
  answer: string | string[] | null
}

interface SurveyProps {
  responses: Response[]
}

const SurveyDisplay: React.FC<SurveyProps> = ({ responses }) => {
  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      {responses.map((response, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          {response.type === 'PAGE_BREAK' ? (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" align="center" sx={{ color: 'text.secondary' }}>
                {response.question}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </>
          ) : (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" color="text.secondary">
                  {response.question}
                </Typography>
                <AnswerDisplay response={response} />
              </CardContent>
            </Card>
          )}
        </Box>
      ))}
    </Box>
  )
}

const AnswerDisplay: React.FC<{ response: Response }> = ({ response }) => {
  const renderAnswer = () => {
    if (response.answer === null || response.answer === '') return <em>No answer</em>

    switch (response.type) {
      case 'TEXT':
      case 'PARAGRAPH_TEXT':
      case 'LIST':
        return <Typography variant="body1">{response.answer}</Typography>

      case 'MULTIPLE_CHOICE':
        return <Typography variant="body1">Selected: {response.answer}</Typography>

      case 'CHECKBOX':
        return Array.isArray(response.answer) ? (
          <ul>
            {response.answer.map((option, idx) => (
              <li key={idx}>
                <Typography variant="body1">{option}</Typography>
              </li>
            ))}
          </ul>
        ) : (
          <em>No answer</em>
        )

      case 'SCALE':
      case 'RATING':
        return <Typography variant="body1">Rating: {response.answer}</Typography>

      case 'GRID':
        return Array.isArray(response.answer) ? (
          <ul>
            {response.answer.map((selected, idx) => (
              <li key={idx}>
                <Typography variant="body1">
                  Row {idx + 1}: {selected}
                </Typography>
              </li>
            ))}
          </ul>
        ) : (
          <em>No answer</em>
        )

      case 'CHECKBOX_GRID':
        return Array.isArray(response.answer) ? (
          response.answer.map((row, rowIdx) => (
            <div key={rowIdx}>
              <Typography variant="body2">Row {rowIdx + 1}:</Typography>
              <ul>
                {row.map((selected, colIdx) => (
                  <li key={colIdx}>
                    <Typography variant="body1">{selected}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <em>No answer</em>
        )

      default:
        return <em>Unsupported question type</em>
    }
  }

  return <>{renderAnswer()}</>
}

export default SurveyDisplay

// const { data: evaluationCriteria, error: error1, isLoading: isLoading1 } = useGetCriteriaQuery(uuid ?? '')
// const { data: survey, error: error2, isLoading: isLoading2 } = useGetSurveyQuery(uuid ?? '')
// return (
//   <>
//     <h3>uuid:</h3>
//     <pre>{JSON.stringify(uuid, null, 2)}</pre>
//     <h3>evaluationCriteria:</h3>
//     <pre>{JSON.stringify(evaluationCriteria, null, 2)}</pre>
//     <h3>survey:</h3>
//     <pre>{JSON.stringify(survey, null, 2)}</pre>
//   </>
// )
