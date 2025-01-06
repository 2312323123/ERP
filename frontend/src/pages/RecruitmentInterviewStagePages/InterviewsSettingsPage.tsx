import { Box, Alert, Typography, Button, TextField, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { getRoles } from '../../store/slices/authSlice'
import BigSpinner from '../RecruitmentSurveyStagePages/SurveysSettings/components/BigSpinner'
import { useGetInterviewSettingsPageQuery, useGetUsersIdsNamesPicturesQuery } from '../../services/interviewStage'
import { useEffect, useMemo, useState } from 'react'
import { Interviews, InterviewsDataTable } from './InterviewsMainPage/components/InterviewsDataTable'
import { UserIdNamePicture } from '../../services/surveyStage'
import { SurveysDataTable } from '../RecruitmentSurveyStagePages/SurveysSurveys/components/SurveysDataTable'
import useSetInterviewIdentificationField2 from '../../hooks/interviews/useSetInterviewIdentificationField2'

const InterviewsSettingsPage = () => {
  const { data: settingsPage, isLoading: settingsLoading, error } = useGetInterviewSettingsPageQuery() // interviews in settingsPage are jus the same but without opinions
  const { data: usersArray, isLoading: isLoadingUsers } = useGetUsersIdsNamesPicturesQuery()
  const { isSetInterviewIdentificationField2Loading, setInterviewIdentificationField2 } =
    useSetInterviewIdentificationField2()

  const usersObject = useMemo(() => {
    if (usersArray) {
      const usersMap = {} as Record<string, UserIdNamePicture>
      usersArray.forEach((user) => {
        usersMap[user.id] = user
      })
      return usersMap
    }
    return {}
  }, [usersArray])

  console.log('JSON.stringify(settingsPage):')
  console.log(JSON.stringify(settingsPage, null, 2))

  const interviewsForNotInterviewed = useMemo(() => {
    if (settingsPage) {
      return {
        fieldToDistinctTheSurvey1: settingsPage.fieldToDistinctTheSurvey1,
        fieldToDistinctTheSurvey2: settingsPage.fieldToDistinctTheSurvey2,
        interviews: settingsPage.notInterviewed,
      }
    } else {
      return {
        fieldToDistinctTheSurvey1: '',
        fieldToDistinctTheSurvey2: '',
        interviews: [],
      }
    }
  }, [settingsPage])

  const roles = useSelector(getRoles)

  const [inputValue, setInputvalue] = useState('')

  useEffect(() => {
    if (settingsPage?.fieldToDistinctTheSurvey2) {
      setInputvalue(settingsPage?.fieldToDistinctTheSurvey2) // Assuming `value` is the field you want to edit
    }
  }, [settingsPage])

  const field2Submit = () => {
    setInterviewIdentificationField2(inputValue)
  }

  if (settingsLoading || isLoadingUsers) {
    return <BigSpinner />
  }

  if (error) {
    if (roles.includes('RECRUITMENT_ADMIN')) {
      return <div>Oh no, there was an error</div>
    }
    return (
      <Box sx={{ marginBottom: 2 }}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Żeby tu wejść, potrzeba uprawnień administratora rekrutacji.
        </Alert>
      </Box>
    )
  }

  return (
    <div>
      <Typography variant="h4" component="h1" sx={{ margin: '1rem' }}>
        Ustawienia rozmów kwalifikacyjnych
      </Typography>

      <Box m={2}>
        <Typography variant="h5" component="h5" gutterBottom>
          Drugie pole do identyfikacji (np. nazwisko):
        </Typography>

        <Paper sx={{ width: 'max-content', padding: 2 }}>
          <Box display="flex" gap={1} sx={{ maxWidth: '400px' }} alignItems="center">
            <TextField
              label="Pole identyfikacji 2"
              variant="outlined"
              value={inputValue} // Controlled value
              onChange={(e) => setInputvalue(e.target.value)} // Update value on change
              fullWidth
              disabled={settingsLoading}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={field2Submit}
              disabled={isSetInterviewIdentificationField2Loading}
            >
              Zapisz
            </Button>
          </Box>
        </Paper>
      </Box>

      {settingsPage && (
        <>
          <Typography variant="h5" component="h1" sx={{ margin: '1rem' }}>
            Dostali się na rozmowę:
          </Typography>
          <InterviewsDataTable
            interviews={settingsPage as unknown as Partial<Interviews>}
            usersArray={usersArray ?? []}
            usersObject={usersObject}
            settingsVersion
          />
        </>
      )}
      {interviewsForNotInterviewed && (
        <>
          <Typography variant="h5" component="h1" sx={{ margin: '1rem' }}>
            Nie dostali się na rozmowę:
          </Typography>
          <InterviewsDataTable
            interviews={interviewsForNotInterviewed as Partial<Interviews>}
            usersArray={usersArray ?? []}
            usersObject={usersObject}
            noInterviewVersion
          />
        </>
      )}
      <Typography variant="h5" component="h1" sx={{ margin: '1rem' }}>
        Ranking ankiet:
      </Typography>
      <SurveysDataTable />
    </div>
  )
}

export default InterviewsSettingsPage
