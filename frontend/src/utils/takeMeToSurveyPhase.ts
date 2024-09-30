import { router } from '../router'

// TODO:
/*
    po wejściu w localstorage jeśli jeszcze nie zapisane to domyślnie zakładka z instrukcją, localstorage jak (erp_recruitment_survey_instruction_seen_\*MD5z/(ID_usera)(UUID_rekru)/\*)
*/
export const takeMeToSurveyPhase = async () => {
  const seen = localStorage.getItem('erp_recruitment_survey_instruction_seen_1234567890')
  if (seen) {
    // TODO: maybe it could take you straight to the survey if there is a new one
    router.navigate('/recrutiment-survey-stage/app/dashboard')
  } else {
    // below thingy -> instruction panel confirmation
    // localStorage.setItem('erp_recruitment_survey_instruction_seen_1234567890', 'true')
    router.navigate('/recrutiment-survey-stage/first-visit')
  }
}
