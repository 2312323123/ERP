import { useGetActiveRecruitmentQuery } from '../../services/erp'

export const InterviewsNavbarText = () => {
  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  return <>rozmowy - rekrutacja {activeRecruitment?.name ?? '- brak rekrutacji w systemie!'}</>
}
