import {
  SurveyEvaluationToSend,
  useSaveEvaluationMutation,
  useSaveReEvaluationMutation,
} from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'
import { useState, useEffect } from 'react'
import useGoToUnevaluatedSurvey from './useGoToUnevaluatedSurvey'

const useEvaluateSurvey = ({ reEvaluating = false }) => {
  const [saveEvaluation, { isSuccess, isError }] = useSaveEvaluationMutation()
  const [saveReEvaluation, { isSuccess: isSuccess2, isError: isError2 }] = useSaveReEvaluationMutation()
  const goToUnevaluatedSurvey = useGoToUnevaluatedSurvey()
  const showSnackbar = useSnackbar()
  // used only to not allow infinite loop
  const [hasNavigated, setHasNavigated] = useState(false)

  useEffect(() => {
    if ((isSuccess && !hasNavigated) || (isSuccess2 && !hasNavigated)) {
      if (!reEvaluating) {
        showSnackbar('Ankieta oceniona!', 'success')
      } else {
        showSnackbar('Ocena zaktualizowana!', 'success')
      }
      if (!reEvaluating) {
        goToUnevaluatedSurvey()
      }
      setHasNavigated(true)
    }
    if ((isError && !hasNavigated) || (isError2 && !hasNavigated)) {
      showSnackbar(
        'Wystąpił błąd przy zapisywaniu oceny! Możliwe, że ocenianie jest wyłączone przez admina rekrutacji',
        'error',
        10000,
      )
      setHasNavigated(true)
    }
  }, [isSuccess, isError, showSnackbar, goToUnevaluatedSurvey, hasNavigated, isSuccess2, isError2, reEvaluating])

  return (obj: SurveyEvaluationToSend) => {
    setHasNavigated(false) // reset navigation state before starting a new evaluation
    if (!reEvaluating) {
      saveEvaluation(obj)
    } else {
      saveReEvaluation(obj)
    }
  }
}

export default useEvaluateSurvey
