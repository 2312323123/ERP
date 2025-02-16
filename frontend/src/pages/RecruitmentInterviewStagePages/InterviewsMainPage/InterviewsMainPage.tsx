import { useMemo } from 'react'
import { useGetInterviewMainPageQuery, useGetUsersIdsNamesPicturesQuery } from '../../../services/interviewStage'
import { NotShowRecruitmentIfSetNotTo } from '../../RecruitmentSurveyStagePages/NotShowRecruitmentIfSetNotTo'
import BigSpinner from '../../RecruitmentSurveyStagePages/SurveysSettings/components/BigSpinner'
import { Interviews, InterviewsDataTable } from './components/InterviewsDataTable'
import { UserIdNamePicture } from '../../../services/surveyStage'
import { Typography } from '@mui/material'

const InterviewsMainPage = () => {
  const { data: interviews, isLoading } = useGetInterviewMainPageQuery()
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

  if (isLoading || isLoadingUsers) {
    return (
      <NotShowRecruitmentIfSetNotTo>
        <BigSpinner />
      </NotShowRecruitmentIfSetNotTo>
    )
  }

  return (
    <NotShowRecruitmentIfSetNotTo>
      <Typography variant="h4" component="h1" sx={{ margin: '1rem' }}>
        Opinie
      </Typography>
      <InterviewsDataTable
        interviews={interviews as Partial<Interviews>}
        usersArray={usersArray ?? []}
        usersObject={usersObject}
      />
    </NotShowRecruitmentIfSetNotTo>
  )
}

export default InterviewsMainPage
