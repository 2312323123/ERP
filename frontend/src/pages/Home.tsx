import { useContext } from 'react'
import { AppContext } from '../App'
import { Button, ListItem, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { router } from '../router'

const Home = () => {
  const { refreshAccessToken, accessTokens } = useContext(AppContext)

  // TODO:
  /*
    po wejściu w localstorage jeśli jeszcze nie zapisane to domyślnie zakładka z instrukcją, localstorage jak (erp_recruitment_survey_instruction_seen_\*MD5z/(ID_usera)(UUID_rekru)/\*)
  */
  const surveysLinkClick = async () => {
    const seen = localStorage.getItem('erp_recruitment_survey_instruction_seen_1234567890')
    if (seen) {
      router.navigate('/recrutiment-survey-stage/app')
    } else {
      // below thingy -> instruction panel confirmation
      // localStorage.setItem('erp_recruitment_survey_instruction_seen_1234567890', 'true')
      router.navigate('/recrutiment-survey-stage/first-visit')
    }
  }

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={refreshAccessToken}>refresh access token</button>
      <button onClick={() => console.log(accessTokens)}>log access tokens</button>
      <Stack spacing={2}>
        <ListItem>
          <Button variant="contained" color="primary" onClick={surveysLinkClick}>
            Oceniaczka
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary">
            Feedback
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary">
            Uprawnienia
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary">
            Wyloguj
          </Button>
        </ListItem>
      </Stack>
    </>
  )
}

export default Home
