import { Box, Alert, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getRoles } from '../../store/slices/authSlice'
import BigSpinner from '../RecruitmentSurveyStagePages/SurveysSettings/components/BigSpinner'
import { useGetInterviewSettingsPageQuery, useGetUsersIdsNamesPicturesQuery } from '../../services/interviewStage'
import { useMemo } from 'react'
import { Interviews, InterviewsDataTable } from './InterviewsMainPage/components/InterviewsDataTable'
import { UserIdNamePicture } from '../../services/surveyStage'
import { SurveysDataTable } from '../RecruitmentSurveyStagePages/SurveysSurveys/components/SurveysDataTable'

const InterviewsSettingsPage = () => {
  const { data: settingsPage, isLoading: settingsLoading, error } = useGetInterviewSettingsPageQuery() // interviews in settingsPage are jus the same but without opinions
  const { data: usersArray, isLoading: isLoadingUsers } = useGetUsersIdsNamesPicturesQuery()

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
