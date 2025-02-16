import { useSelector } from 'react-redux'
import { useSaveRecruitmentSettingsMutation } from '../../services/erp'
import { getSurveySettingsEditable } from '../../store/slices/surveyStage/surveySettingsPageSlice'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'
import useRefetchSurveysList from './useRefetchSurveysList'

const useSaveRecruitmentSettings = () => {
  const [saveRecruitmentSettings, { isSuccess, isError }] = useSaveRecruitmentSettingsMutation()
  const surveySettingsEditable = useSelector(getSurveySettingsEditable)
  const refetchSurveysList = useRefetchSurveysList()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      // refetch surveys list as identification field could have changed:
      refetchSurveysList()

      showSnackbar('Zapisano zmiany!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zapisywaniu zmian!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return () => saveRecruitmentSettings(surveySettingsEditable)
}

export default useSaveRecruitmentSettings
