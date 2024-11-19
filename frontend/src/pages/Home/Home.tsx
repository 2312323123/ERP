import { Button, ListItem, Stack } from '@mui/material'
import { router } from '../../router'
import { TakeMeToSurveyPhase } from '../../utils/TakeMeToSurveyPhase'
import { logNetworkError, NetworkError } from '../../utils/logNetworkError'
import { logNetworkSuccess } from '../../utils/logNetworkSuccess'
import axios from 'axios'
import MinimumReduxUseExample from '../../components/MinimumReduxUseExample'
import { jwtDecode } from 'jwt-decode'
import { apiPathBase } from '../../config/constants'
import { useSelector } from 'react-redux'
import { getAccessToken, getRefreshToken } from '../../store/slices/authSlice'
import { OfficeStatusPanel } from './components/OfficeStatusPanel'

const Home = () => {
  const refreshToken = useSelector(getRefreshToken)
  const accessToken = useSelector(getAccessToken)

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

  const logAccessTokens = () => {
    console.log('accessToken:')
    console.log(accessToken)
    console.log('refreshToken:')
    console.log(refreshToken)
    // log decoded access token (using JWT library)
    console.log('jwtDecode(accessToken):')
    console.log(jwtDecode(accessToken))
    console.log('jwtDecode(refreshToken):')
    console.log(jwtDecode(refreshToken))
  }

  return (
    <>
      <h1>Home Page</h1>
      <Button variant="contained" color="primary" onClick={logAccessTokens}>
        log access tokens
      </Button>
      <Stack spacing={2}>
        <ListItem>
          <TakeMeToSurveyPhase />
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.navigate('/recruitment-interview-stage/app/main-page')}
          >
            Rozmowy
          </Button>
        </ListItem>
        <ListItem>
          <OfficeStatusPanel />
        </ListItem>
        <ListItem>
          <Button variant="contained" color="primary" onClick={() => router.navigate('/newsletter/main-page')}>
            Newsletter
          </Button>
        </ListItem>
        <ListItem>
          <Button
            component="a"
            href="https://docs.google.com/spreadsheets/d/1sDq1-w4yadCCTrt9m_wI8laGh9lUyG96AWmpdMFnPzA/edit?gid=527260512&usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
          >
            Feedback ogólny
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
