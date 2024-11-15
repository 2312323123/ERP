import { jwtDecode } from 'jwt-decode'
import { router } from '../router'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { getAccessToken } from '../store/slices/authSlice'
import { useGetActiveRecruitmentQuery } from '../services/erp'
import useGoToUnevaluatedSurvey from '../hooks/surveys/useGoToUnevaluatedSurvey'

async function hashValue(value: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)

  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

// TODO:
/*
    po wejściu w localstorage jeśli jeszcze nie zapisane to domyślnie zakładka z instrukcją, localstorage jak (erp_recruitment_survey_instruction_seen_\*MD5z/(ID_usera)(UUID_rekru)/\*)
*/
export const TakeMeToSurveyPhase = () => {
  const accessToken = useSelector(getAccessToken)
  const { data, error, isLoading } = useGetActiveRecruitmentQuery()
  const id = jwtDecode<{ id: string }>(accessToken).id
  const actionIfNotFirstVisit = useGoToUnevaluatedSurvey({ dashboardIfNoneLeft: true })

  const takeMeToSurveyPhase = async () => {
    const item = `'erp_recruitment_survey_instruction_seen_${await hashValue(`${id}${data?.uuid}`)}'`

    // check if variable is set
    const isSet = localStorage.getItem(item)

    if (isSet) {
      // if it is, it sends me to /smth/else
      actionIfNotFirstVisit()
    } else {
      // if it's not, send variable, and send me to /help
      localStorage.setItem(item, 'true')
      router.navigate('/recruitment-survey-stage/app/help')
    }
  }

  if (error) {
    return <div>Błąd przy pobieraniu aktywnej rekrutacji!</div>
  }

  return (
    <Button variant="contained" color="primary" onClick={takeMeToSurveyPhase} disabled={isLoading || !id}>
      Oceniaczka
    </Button>
  )
}
