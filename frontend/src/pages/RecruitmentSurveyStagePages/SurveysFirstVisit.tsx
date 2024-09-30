import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SurveysFirstVisit = () => {
  const setSeen = () => {
    localStorage.setItem('erp_recruitment_survey_instruction_seen_1234567890', 'true')
  }

  return (
    <>
      <div>SurveysFirstVisitPage</div>
      <div>nic tu jeszcze nie ma</div>
      <div>jeśli to widzisz to przypomnij Dwaćkowi</div>
      <Button onClick={setSeen} variant="contained" color="secondary">
        <Link to="/recrutiment-survey-stage/app/dashboard">Dalej</Link>
      </Button>
    </>
  )
}

export default SurveysFirstVisit
