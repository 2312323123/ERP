import { useGetActiveRecruitmentQuery } from '../../services/erp'

export const SurveysNavbarText = () => {
  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  return <>ankiety - rekrutacja {activeRecruitment?.name ?? '- brak rekrutacji w systemie!'}</>
}
