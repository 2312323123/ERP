import TitlePanel from './TitlePanel/TitlePanel'
import InstantSettingsPanel from './InstantSettingsPanel/InstantSettingsPanel'
import NewRecruitmentPanel from './NewRecruitmentPanel/NewRecruitmentPanel'
import SaveSettingsButtonPanel from './SaveSettingsButtonPanel/SaveSettingsButtonPanel'
import RecruitmentSettingsPanel from './RecruitmentSettingsPanel/RecruitmentSettingsPanel'
import DeleteRecruitmentPanel from './DeleteRecruitmentPanel/DeleteRecruitmentPanel'
import { Alert, Box, Divider } from '@mui/material'
import BigSpinner from './components/BigSpinner'
import { useGetActiveRecruitmentQuery, useGetAllRecruitmentsQuery } from '../../../services/erp'
import { useSelector } from 'react-redux'
import { getRoles } from '../../../store/slices/authSlice'

const SurveysSettings = () => {
  // const allRecruitmentsUuidNameStartDate = useSelector(getAllRecruitmentsUuidNameStartDate)

  // Fetch recruitment data using RTK Query
  const { data: recruitments, error, isLoading } = useGetAllRecruitmentsQuery()

  // // Using a query hook automatically fetches data and returns query values
  // const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // if (typeof allRecruitmentsUuidNameStartDate === 'undefined') {
  //   return <BigSpinner />
  // }

  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()

  const roles = useSelector(getRoles)

  if (isLoading) return <BigSpinner />

  if (error) {
    if (roles.includes('RECRUITMENT_ADMIN')) {
      return <div>Oh no, there was an error</div>
    }
    return (
      <Box sx={{ marginBottom: 2 }}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Żeby tu wejść, potrzeba uprawnień administratora rekrutacji.
        </Alert>
      </Box>
    )
  }

  if (recruitments?.length === 0) {
    return (
      <Box sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        {/* Rekrutacja <nazwa> */}
        <TitlePanel />
        <Divider sx={{ my: 4 }} />

        {/* Create New Recruitment section */}
        <NewRecruitmentPanel isFirstRecruitment />
        <Divider sx={{ my: 3 }} />
      </Box>
    )
  }

  return (
    <Box sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
      {/* Rekrutacja <nazwa> */}
      <TitlePanel />
      <Divider sx={{ my: 4 }} />

      {/* Instantly changed settings section */}
      <InstantSettingsPanel />
      <Divider sx={{ my: 4 }} />

      {/* Create New Recruitment section */}
      <NewRecruitmentPanel />
      <Divider sx={{ my: 3 }} />

      {activeRecruitment && (
        <>
          {/* Save Settings Button Panel */}
          <SaveSettingsButtonPanel />

          {/* Per-recruitment settings section */}
          <RecruitmentSettingsPanel />

          {/* Delete recruitment (possible until the first survey) */}
          <DeleteRecruitmentPanel />
        </>
      )}
    </Box>
  )
}

export default SurveysSettings
