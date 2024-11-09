import { useRef, useState } from 'react'
import SplitPane, { Pane } from 'split-pane-react'
import 'split-pane-react/esm/themes/default.css'
import VerticalButtonSlider from './VerticalButtonSlider'
import FloatingEvaluationButton from './FloatingButton'

const SurveysSurveyView = () => {
  const containerRef = useRef(null) // Create a ref to reference the container
  // const { uuid } = useParams() // Get the 'id' parameter from the route
  // const { data: evaluationCriteria, error: error1, isLoading: isLoading1 } = useGetCriteriaQuery(uuid ?? '')
  // const { data: survey, error: error2, isLoading: isLoading2 } = useGetSurveyQuery(uuid ?? '')
  // return (
  //   <>
  //     <h3>uuid:</h3>
  //     <pre>{JSON.stringify(uuid, null, 2)}</pre>
  //     <h3>evaluationCriteria:</h3>
  //     <pre>{JSON.stringify(evaluationCriteria, null, 2)}</pre>
  //     <h3>survey:</h3>
  //     <pre>{JSON.stringify(survey, null, 2)}</pre>
  //   </>
  // )
  const [sizes, setSizes] = useState([90])

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const sashRender = () => {
    // Customize the sash rendering here
    return <VerticalButtonSlider />
  }

  return (
    <div style={{ height: 'calc(100vh - 4rem)', overflow: 'hidden' }}>
      <SplitPane split="horizontal" sizes={sizes} onChange={setSizes} sashRender={sashRender} touchSupport={true}>
        <Pane>
          <div style={{ ...layoutCSS, background: '#ddd' }}>pane1 {JSON.stringify(sizes)}</div>
        </Pane>
        <div style={{ ...layoutCSS, background: '#d5d7d9' }}>pane2</div>
      </SplitPane>
      <FloatingEvaluationButton />
    </div>
    // <div style={{ background: 'red', height: 'calc(100vh-4rem)' }}>
    //   <SplitPane split="vertical" sizes={sizes} onChange={setSizes} sashRender={sashRender}>
    //     <Pane minSize={50} maxSize="50%">
    //       <div style={{ ...layoutCSS, background: '#ddd' }}>pane1</div>
    //     </Pane>
    //     <div style={{ ...layoutCSS, background: '#d5d7d9' }}>pane2</div>
    //     <div style={{ ...layoutCSS, background: '#a1a5a9' }}>pane3</div>
    //   </SplitPane>
    // </div>
  )
}

export default SurveysSurveyView
