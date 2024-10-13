import { Typography, Container, Divider, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { getAnyEvaluationExists } from '../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useState } from 'react'

const DeleteRecruitmentPanel = () => {
  const anySurveyExists = useSelector(getAnyEvaluationExists)

  const handleDeleteRecruitment = (recruitmentId: string) => {
    const [recruitments, setRecruitments] = useState<{ [key: string]: { canBeDeleted: boolean } }>({
      // Example recruitments object
      recruitment1rreerre: { canBeDeleted: true },
      recruitment2rtrttr: { canBeDeleted: false },
      // Add more recruitments as needed
    })

    const recruitment = recruitments[recruitmentId]
    const confirmDelete = window.confirm('Are you sure you want to delete this recruitment?')

    if (confirmDelete) {
      if (recruitment.canBeDeleted) {
        alert(`Recruitment ${recruitmentId} added to deletions.`) // Placeholder for feedback
      } else {
        alert('Ta rekrutacja nie może już być usunięta')
      }
    }
  }

  return (
    <>
      {/* Info */}
      <Typography variant="h5" gutterBottom align="center">
        Poniższe można zrobić do momentu wpadnięcia pierwszej ankietki. (czyli{' '}
        {anySurveyExists ? 'już nie można' : 'jeszcze można'}):
      </Typography>

      {/* Settings until the first survey section */}
      <Container maxWidth="md" sx={{ mb: 2 }}>
        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Button to delete a recruitment */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDeleteRecruitment('recruitment1')} // Use the relevant recruitment ID
          style={{ marginTop: '16px', color: 'white', padding: '1rem 2rem', fontSize: '1rem' }}
        >
          Usuń rekrutację (działa natychmiastowo)
        </Button>
      </Container>
    </>
  )
}

export default DeleteRecruitmentPanel
