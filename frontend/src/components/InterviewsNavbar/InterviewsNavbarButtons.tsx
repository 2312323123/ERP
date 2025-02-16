import FeedbackIcon from '@mui/icons-material/Feedback'
import SettingsIcon from '@mui/icons-material/Settings'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import SurveysNavbarButton from '../SurveysNavbar/SurveysNavbarButton'

export const InterviewsNavbarButtons = () => {
  return (
    <>
      <SurveysNavbarButton
        path="/recruitment-interview-stage/app/main-page"
        text="Rozmowy"
        iconElement={<FactCheckIcon />}
      />
      <SurveysNavbarButton
        path="/recruitment-interview-stage/app/feedback"
        text="Feedback"
        iconElement={<FeedbackIcon />}
      />
      <SurveysNavbarButton
        path="/recruitment-interview-stage/app/settings"
        text="Ustawienia"
        iconElement={<SettingsIcon />}
      />
    </>
  )
}
