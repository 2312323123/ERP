import AssignmentIcon from '@mui/icons-material/Assignment'
import HelpIcon from '@mui/icons-material/Help'
import FeedbackIcon from '@mui/icons-material/Feedback'
import SettingsIcon from '@mui/icons-material/Settings'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import SurveysNavbarButton from './SurveysNavbarButton'
import useGoToUnevaluatedSurvey from '../../hooks/surveys/useGoToUnevaluatedSurvey'

export const SurveysNavbarButtons = () => {
  const evaluateClick = useGoToUnevaluatedSurvey()
  return (
    <>
      <SurveysNavbarButton action={() => evaluateClick()} text="Oceniam" iconElement={<FactCheckIcon />} />
      <SurveysNavbarButton path="/recruitment-survey-stage/app/help" text="Jak oceniać" iconElement={<HelpIcon />} />
      <SurveysNavbarButton
        path="/recruitment-survey-stage/app/surveys"
        text="Ankiety"
        iconElement={<AssignmentIcon />}
      />
      {/* <SurveysNavbarButton
          path="/recruitment-survey-stage/app/dashboard"
          text="Statystyki"
          iconElement={<DashboardIcon />}
        /> */}
      <SurveysNavbarButton
        path="/recruitment-survey-stage/app/feedback"
        text="Feedback"
        iconElement={<FeedbackIcon />}
      />
      <SurveysNavbarButton
        path="/recruitment-survey-stage/app/settings"
        text="Ustawienia"
        iconElement={<SettingsIcon />}
      />
    </>
  )
}
