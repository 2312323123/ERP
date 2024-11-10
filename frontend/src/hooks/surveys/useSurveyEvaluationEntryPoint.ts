import { router } from '../../router'
import { useGetNotEvaluatedOneQuery } from '../../services/surveyStage'
import { useSnackbar } from '../useSnackbar'

export const useSurveyEvaluationEntryPoint = (
  { clickedIEvaluateButton = false }: { clickedIEvaluateButton?: boolean } = { clickedIEvaluateButton: false },
) => {
  // also called with clickedIEvaluateButton = true when user submits evaluation
  const { data: notEvaluatedOne, error, isLoading } = useGetNotEvaluatedOneQuery()
  const showSnackbar = useSnackbar()

  // // refresh the not evaluated survey (without it it used to show a different one)
  // const dispatch = useDispatch()
  // dispatch(surveyStageApi.util.invalidateTags([{ type: 'SurveyRecruitment', id: 'NOT_EVALUATED_ONE' }]))

  return () => {
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
