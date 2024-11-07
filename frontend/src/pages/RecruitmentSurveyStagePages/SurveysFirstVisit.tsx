import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useGetSurveyGradingInstructionQuery } from '../../services/erp'
import Markdown from 'react-markdown'

const SurveysFirstVisit = () => {
  const setSeen = () => {
    localStorage.setItem('erp_recruitment_survey_instruction_seen_1234567890', 'true')
  }
  const { data } = useGetSurveyGradingInstructionQuery()

  return (
    <>
      <div>SurveysFirstVisitPage</div>
      <div>nic tu jeszcze nie ma</div>
      <div>jeśli to widzisz to przypomnij Dwaćkowi</div>
      <Button onClick={setSeen} variant="contained" color="secondary">
        <Link to="/recrutiment-survey-stage/app/dashboard">Dalej</Link>
      </Button>
      {/* Content for the box goes here */}
      <Markdown>{data?.grading_instruction}</Markdown>
    </>
  )
}

export default SurveysFirstVisit
