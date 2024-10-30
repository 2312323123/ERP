import TitlePanel from './TitlePanel/TitlePanel'
import InstantSettingsPanel from './InstantSettingsPanel/InstantSettingsPanel'
import NewRecruitmentPanel from './NewRecruitmentPanel/NewRecruitmentPanel'
import SaveSettingsButtonPanel from './SaveSettingsButtonPanel/SaveSettingsButtonPanel'
import RecruitmentSettingsPanel from './RecruitmentSettingsPanel/RecruitmentSettingsPanel'
import DeleteRecruitmentPanel from './DeleteRecruitmentPanel/DeleteRecruitmentPanel'
import { Divider } from '@mui/material'
import BigSpinner from './components/BigSpinner'
import { useGetActiveRecruitmentQuery, useGetAllRecruitmentsQuery } from '../../../services/erp'

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

  if (isLoading) return <BigSpinner />

  if (error) return <div>Oh no, there was an error</div>

  if (recruitments?.length === 0) {
    return (
      <>
        {/* Rekrutacja <nazwa> */}
        <TitlePanel />
        <Divider sx={{ my: 4 }} />

        {/* Create New Recruitment section */}
        <NewRecruitmentPanel isFirstRecruitment />
        <Divider sx={{ my: 3 }} />
      </>
    )
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
    </>
  )
}

export default SurveysSettings
