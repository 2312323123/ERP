import Markdown from 'react-markdown'
import { useGetSurveyGradingInstructionQuery } from '../../services/erp'

const SurveysHelp = () => {
  const { data } = useGetSurveyGradingInstructionQuery()

  return (
    <>
      <div>SurveysFirstVisitPage</div>
      <div>Jak oceniać</div>
      <div>(Ta pomoc jest zawsze dostępna jako zakładka "Jak oceniać" w pasku po lewej stronie)</div>
      {/* Content for the box goes here */}
      <Markdown>{data?.grading_instruction}</Markdown>
    </>
  )
}

export default SurveysHelp
