import { useSelector } from 'react-redux'
import { useSaveRecruitmentSettingsMutation } from '../../services/erp'
import { getSurveySettingsEditable } from '../../store/slices/surveyStage/surveySettingsPageSlice'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'

const useSaveRecruitmentSettings = () => {
  const [saveRecruitmentSettings, { isLoading, isSuccess, isError }] = useSaveRecruitmentSettingsMutation()
  const surveySettingsEditable = useSelector(getSurveySettingsEditable)
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Zapisano zmiany!', 'success')
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zapisywaniu zmian!', 'error')
    }
  }, [isSuccess, isError, showSnackbar])

  return () => saveRecruitmentSettings(surveySettingsEditable)
}

export default useSaveRecruitmentSettings
