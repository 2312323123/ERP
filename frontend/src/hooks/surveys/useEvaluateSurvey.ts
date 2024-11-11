import { SurveyEvaluationToSend, useSaveEvaluationMutation } from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'
import useGoToUnevaluatedSurvey from './useGoToUnevaluatedSurvey'

const useEvaluateSurvey = () => {
  const [saveEvaluation, { isSuccess, isError }] = useSaveEvaluationMutation()
  const goToUnevaluatedSurvey = useGoToUnevaluatedSurvey()
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Ankieta oceniona!', 'success')
      goToUnevaluatedSurvey()
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zapisywaniu oceny!', 'error', 5000)
    }
  }, [isSuccess, isError, showSnackbar, goToUnevaluatedSurvey])

  return (obj: SurveyEvaluationToSend) => saveEvaluation(obj)
}

export default useEvaluateSurvey
