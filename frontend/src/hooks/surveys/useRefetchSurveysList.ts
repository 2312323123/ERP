import { useGetSurveyStatsListQuery } from '../../services/surveyStage'

const useRefetchSurveysList = () => useGetSurveyStatsListQuery().refetch

export default useRefetchSurveysList
