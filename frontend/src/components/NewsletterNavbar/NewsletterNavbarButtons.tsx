import FeedbackIcon from '@mui/icons-material/Feedback'
import SurveysNavbarButton from '../SurveysNavbar/SurveysNavbarButton'
import ShareIcon from '@mui/icons-material/Share'

export const NewsletterNavbarButtons = () => {
  return (
    <>
      <SurveysNavbarButton path="/newsletter/main-page" text="Newsletter" iconElement={<ShareIcon />} />
      <SurveysNavbarButton path="/newsletter/feedback" text="Feedback" iconElement={<FeedbackIcon />} />
    </>
  )
}
