import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SurveysFirstVisit = () => {
  return (
    <>
      <div>SurveysFirstVisitPage</div>
      <div>nic tu jeszcze nie ma</div>
      <Button variant="contained" color="secondary">
        <Link to="/recrutiment-survey-stage/app">Dalej</Link>
      </Button>
    </>
  )
}

export default SurveysFirstVisit
