import { useContext } from 'react'
import { AppContext } from '../App'
import { Button, ListItem, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { router } from '../router'
import { takeMeToSurveyPhase } from '../utils/takeMeToSurveyPhase'
import { logNetworkError, NetworkError } from '../utils/logNetworkError'
import { logNetworkSuccess } from '../utils/logNetworkSuccess'
import axios from 'axios'
import MinimumReduxUseExample from '../components/MinimumReduxUseExample'

const Home = () => {
  const { refreshAccessToken, accessTokens, apiPathBase } = useContext(AppContext)

  const giveDwaciekSuperadmin = async () => {
    try {
      const res = await axios.post(`${apiPathBase}/api/auth/give-dwaciek-superadmin`)
      logNetworkSuccess(res, '654534r4')
    } catch (error) {
      logNetworkError(error as NetworkError, '3r4ty76')
    }
  }

  const takeAwayDwaciekSuperadmin = async () => {
    try {
      const res = await axios.post(`${apiPathBase}/api/auth/take-away-dwaciek-superadmin`)
      logNetworkSuccess(res, '8iy65r3')
    } catch (error) {
      logNetworkError(error as NetworkError, 't568t33')
    }
  }

  return (
    <>
      <h1>Home Page</h1>
      <Button variant="contained" color="primary" onClick={refreshAccessToken}>
        refresh access token
      </Button>
      <Button variant="contained" color="primary" onClick={() => console.log(accessTokens)}>
        log access tokens
      </Button>
      <Stack spacing={2}>
        <ListItem>
          <Button variant="contained" color="primary" onClick={takeMeToSurveyPhase}>
            Oceniaczka
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary">
            Feedback
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" onClick={() => router.navigate('/app-roles')}>
            Uprawnienia
          </Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary">
            Wyloguj
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={giveDwaciekSuperadmin} variant="contained" color="primary">
            Daj Dwaćkowi superadmina
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={takeAwayDwaciekSuperadmin} variant="contained" color="primary">
            Zabierz Dwaćkowi superadmina
          </Button>
        </ListItem>

        <MinimumReduxUseExample />
      </Stack>
    </>
  )
}

export default Home
