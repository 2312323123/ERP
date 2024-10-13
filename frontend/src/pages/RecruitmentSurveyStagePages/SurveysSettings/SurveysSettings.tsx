import TitlePanel from './TitlePanel/TitlePanel'
import InstantSettingsPanel from './InstantSettingsPanel/InstantSettingsPanel'
import NewRecruitmentPanel from './NewRecruitmentPanel/NewRecruitmentPanel'
import SaveSettingsButtonPanel from './SaveSettingsButtonPanel/SaveSettingsButtonPanel'
import RecruitmentSettingsPanel from './RecruitmentSettingsPanel/RecruitmentSettingsPanel'
import DeleteRecruitmentPanel from './DeleteRecruitmentPanel/DeleteRecruitmentPanel'
import { Divider } from '@mui/material'
import { getAllRecruitmentsUuidNameStartDate } from '../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useSelector } from 'react-redux'
import BigSpinner from './components/BigSpinner'

const SurveysSettings = () => {
  const allRecruitmentsUuidNameStartDate = useSelector(getAllRecruitmentsUuidNameStartDate)

  if (typeof allRecruitmentsUuidNameStartDate === 'undefined') {
    return <BigSpinner />
  }

  return (
    <>
      {/* Rekrutacja <nazwa> */}
      <TitlePanel />
      <Divider sx={{ my: 4 }} />

      {/* Instantly changed settings section */}
      <InstantSettingsPanel />
      <Divider sx={{ my: 4 }} />

      {/* Create New Recruitment section */}
      <NewRecruitmentPanel />
      <Divider sx={{ my: 3 }} />

      {/* Save Settings Button Panel */}
      <SaveSettingsButtonPanel />

      {/* Per-recruitment settings section */}
      <RecruitmentSettingsPanel />

      {/* Delete recruitment (possible until the first survey) */}
      <DeleteRecruitmentPanel />
    </>
  )
}

export default SurveysSettings
