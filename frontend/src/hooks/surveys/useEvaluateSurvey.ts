import { SurveyEvaluationToSend, useSaveEvaluationMutation } from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'
import { useState, useEffect } from 'react'
import useGoToUnevaluatedSurvey from './useGoToUnevaluatedSurvey'

const useEvaluateSurvey = () => {
  const [saveEvaluation, { isSuccess, isError }] = useSaveEvaluationMutation()
  const goToUnevaluatedSurvey = useGoToUnevaluatedSurvey()
  const showSnackbar = useSnackbar()
  // used only to not allow infinite loop
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    if (isSuccess && !hasNavigated) {
      showSnackbar('Ankieta oceniona!', 'success')
      goToUnevaluatedSurvey()
      setHasNavigated(true)
    }
    if (isError && !hasNavigated) {
      showSnackbar('Wystąpił błąd przy zapisywaniu oceny!', 'error', 5000)
      setHasNavigated(true)
    }
  }, [isSuccess, isError, showSnackbar, goToUnevaluatedSurvey, hasNavigated])

  return (obj: SurveyEvaluationToSend) => {
    setHasNavigated(false) // reset navigation state before starting a new evaluation
    saveEvaluation(obj)
  }
}

export default useEvaluateSurvey
