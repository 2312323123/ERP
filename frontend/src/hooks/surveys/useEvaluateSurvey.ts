import { SurveyEvaluationToSend, useSaveEvaluationMutation } from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'
import { useEffect } from 'react'
import { useSurveyEvaluationEntryPoint } from './useSurveyEvaluationEntryPoint'

const useEvaluateSurvey = () => {
  const [saveEvaluation, { isSuccess, isError }] = useSaveEvaluationMutation()
  const evaluateClick = useSurveyEvaluationEntryPoint({ clickedIEvaluateButton: true })
  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (isSuccess) {
      showSnackbar('Ankieta oceniona!', 'success')
      evaluateClick()
    }
    if (isError) {
      showSnackbar('Wystąpił błąd przy zapisywaniu oceny!', 'error', 5000)
    }
  }, [isSuccess, isError, showSnackbar, evaluateClick])

  return (obj: SurveyEvaluationToSend) => saveEvaluation(obj)
}

export default useEvaluateSurvey
