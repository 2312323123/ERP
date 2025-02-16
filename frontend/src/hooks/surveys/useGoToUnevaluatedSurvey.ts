import { useEffect, useState } from 'react'
import { useGetNotEvaluatedOneQuery } from '../../services/surveyStage'
import { router } from '../../router'
import { useSnackbar } from '../useSnackbar'

interface Props {
  dashboardIfNoneLeft: boolean
}

const useGoToUnevaluatedSurvey = ({ dashboardIfNoneLeft }: Props = { dashboardIfNoneLeft: false }) => {
  const [doFetch, setDoFetch] = useState(false)
  const {
    data: notEvaluatedOne,
    isLoading,
    error,
  } = useGetNotEvaluatedOneQuery(undefined, { skip: !doFetch, refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (!isLoading && typeof notEvaluatedOne !== 'undefined') {
      if (notEvaluatedOne) {
        setDoFetch(false)
        router.navigate('/recruitment-survey-stage/app/survey/' + notEvaluatedOne.uuid)
      } else {
        if (dashboardIfNoneLeft) {
          router.navigate('/recruitment-survey-stage/app/surveys') // TODO: once it starts existing, switch to /dashboard instead of /surveys
        } else {
          setDoFetch(false)
          router.navigate('/recruitment-survey-stage/app/survey/')
        }
      }
    }
  }, [notEvaluatedOne, dashboardIfNoneLeft, isLoading])

  const showSnackbar = useSnackbar()
  useEffect(() => {
    if (error) {
      showSnackbar('Wystąpił błąd przy wczytywaniu ankiet!', 'error')
      console.log('error:')
      console.log(error)
    }
  }, [error, showSnackbar])

  return () => {
    setDoFetch(true)
  }
}

export default useGoToUnevaluatedSurvey
