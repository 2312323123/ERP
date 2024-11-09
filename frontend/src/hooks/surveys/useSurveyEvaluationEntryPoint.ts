import { router } from '../../router'
import { useGetNotEvaluatedOneQuery } from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'

export const useSurveyEvaluationEntryPoint = () => {
  const { data: notEvaluatedOne, error, isLoading } = useGetNotEvaluatedOneQuery()
  const showSnackbar = useSnackbar()

  return (
    { clickedIEvaluateButton = false }: { clickedIEvaluateButton?: boolean } = { clickedIEvaluateButton: false },
  ) => {
    if (isLoading) {
      showSnackbar('Trwa wczytywanie ankiet, spróbuj za parę sekund, ale też możliwe, że nie działa', 'error', 10000)
    } else if (error) {
      showSnackbar('Wystąpił błąd przy wczytywaniu ankiet!', 'error')
    } else {
      if (notEvaluatedOne) {
        router.navigate('/recrutiment-survey-stage/app/survey/' + notEvaluatedOne.uuid)
      } else {
        if (clickedIEvaluateButton) {
          router.navigate('/recrutiment-survey-stage/app/survey/')
        } else {
          router.navigate('/recrutiment-survey-stage/app/dashboard')
        }
      }
    }
  }
}
