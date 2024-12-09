import { Box, Button, Typography } from '@mui/material'
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
import AvlTest from '../../components/AvlTest'
import { useHideForPresentation } from '../../hooks/useHideForPresentation'
import useLogout from '../../hooks/auth/useLogout'

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

  const isVisible = useHideForPresentation()

  const logout = useLogout()

  return (
    <>
      <Typography ml={2} mt={1} variant="h4" gutterBottom>
        Strona główna
      </Typography>

      {isVisible && (
        <Button variant="contained" color="primary" onClick={logAccessTokens} fullWidth>
          log access tokens
        </Button>
      )}

      {/* Responsive grid layout using Box */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr', // 1 column on small screens
            sm: 'repeat(2, 1fr)', // 2 columns on medium screens
            md: 'repeat(3, 1fr)', // 3 columns on larger screens
            lg: 'repeat(4, 1fr)', // 4 columns on very large screens
          },
          gap: 2, // space between the grid items
          m: 2,
        }}
      >
        <TakeMeToSurveyPhase />

        <Button
          sx={{ minHeight: '150px', fontSize: '1.1rem' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.navigate('/recruitment-interview-stage/app/main-page')}
        >
          Rozmowy
        </Button>

        <OfficeStatusPanel />

        <Button
          sx={{ minHeight: '150px', fontSize: '1.1rem' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.navigate('/newsletter/main-page')}
        >
          Newsletter
        </Button>

        <Button
          sx={{ minHeight: '150px', fontSize: '1.1rem' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.navigate('/availability/browser')}
        >
          Dostępność
        </Button>

        <Button
          sx={{ minHeight: '150px', fontSize: '1.1rem' }}
          component="a"
          href="https://docs.google.com/spreadsheets/d/1sDq1-w4yadCCTrt9m_wI8laGh9lUyG96AWmpdMFnPzA/edit?gid=527260512&usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
          fullWidth
        >
          Feedback ogólny
        </Button>

        <Button
          sx={{ minHeight: '150px', fontSize: '1.1rem' }}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => router.navigate('/app-roles')}
        >
          Uprawnienia
        </Button>

        <Button
          sx={{ minHeight: '150px', fontSize: '1.1rem' }}
          onClick={logout}
          variant="contained"
          color="primary"
          fullWidth
        >
          Wyloguj
        </Button>

        {isVisible && (
          <>
            <Button onClick={giveDwaciekSuperadmin} variant="contained" color="primary" fullWidth>
              Daj Maćkowi superadmina
            </Button>

            <Button onClick={takeAwayDwaciekSuperadmin} variant="contained" color="primary" fullWidth>
              Zabierz Maćkowi superadmina
            </Button>

            <AvlTest />
            <MinimumReduxUseExample />
          </>
        )}
      </Box>
    </>
  )
}

export default Home
