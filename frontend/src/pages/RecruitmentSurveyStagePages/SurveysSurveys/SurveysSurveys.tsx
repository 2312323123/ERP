import { NotShowRecruitmentIfSetNotTo } from '../NotShowRecruitmentIfSetNotTo'
import { SurveysDataTable } from './components/SurveysDataTable'

const SurveysSurveys = () => {
  return (
    <>
      <NotShowRecruitmentIfSetNotTo>
        <SurveysDataTable />
      </NotShowRecruitmentIfSetNotTo>
    </>
  )
}

export default SurveysSurveys
