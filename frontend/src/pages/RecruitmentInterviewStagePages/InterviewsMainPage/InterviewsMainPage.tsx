import { useMemo } from 'react'
import { useGetInterviewMainPageQuery, useGetUsersIdsNamesPicturesQuery } from '../../../services/interviewStage'
import { NotShowRecruitmentIfSetNotTo } from '../../RecruitmentSurveyStagePages/NotShowRecruitmentIfSetNotTo'
import BigSpinner from '../../RecruitmentSurveyStagePages/SurveysSettings/components/BigSpinner'
import { SurveysDataTable } from '../../RecruitmentSurveyStagePages/SurveysSurveys/components/SurveysDataTable'
import { Interviews, InterviewsDataTable } from './components/InterviewsDataTable'
import { UserIdNamePicture } from '../../../services/surveyStage'

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
      <InterviewsDataTable
        interviews={interviews as Partial<Interviews>}
        usersArray={usersArray ?? []}
        usersObject={usersObject}
      />
      <SurveysDataTable />
    </NotShowRecruitmentIfSetNotTo>
  )
}

export default InterviewsMainPage
