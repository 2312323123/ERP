import FeedbackIcon from '@mui/icons-material/Feedback'
import SurveysNavbarButton from '../SurveysNavbar/SurveysNavbarButton'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'

export const AvailabilityNavbarButtons = () => {
  return (
    <>
      <SurveysNavbarButton path="/availability/browser" text="Wyszukiwarka" iconElement={<SearchIcon />} />
      <SurveysNavbarButton path="/availability/feedback" text="Feedback" iconElement={<FeedbackIcon />} />
      <SurveysNavbarButton path="/availability/settings" text="Twoja dostępność" iconElement={<SettingsIcon />} />
    </>
  )
}
