import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import OpenEvaluationButton from './OpenEvaluationButton'
import Survey from './Survey'
import SurveyTopPart from './SurveyTopPart'
import SplitPane from 'react-split-pane'
import './ReactSplitPaneStyles.css'
import useBlockPullToRefreshMobile from './useBlockPullToRefreshMobile'
import useHandleResize from './useHandleResize'
import styles from './SurveysSurveyView.module.css'
import SurveyEvaluation from './SurveyEvaluation'
import FloatingCloseButton from './FloatingCloseButton'
import VerticalSliderButton from './VerticalButtonSlider'
import useIsDesktop from '../../../utils/useIsDesktop'
import HorizontalButtonSlider from './HorizontalButtonSlider'

const SurveysSurveyView = () => {
  const isDesktop = useIsDesktop()
  const outerDivRef = useRef<HTMLDivElement>(null)
  const innerDivRef = useRef<HTMLDivElement>(null)
  const [showEvaluateButton, setShowEvaluateButton] = useState(true)
  const [outerDivHeight, setOuterDivHeight] = useState(0)

  // block pull-to-refresh on mobile
  useBlockPullToRefreshMobile()

  // init action, also used to close the evaluation pane
  const init = useCallback(() => {
    if (outerDivRef.current && innerDivRef.current) {
      if (!isDesktop) {
        const element = document.querySelector('.Pane.horizontal.Pane1') as HTMLElement
        element.style.height = `${outerDivRef?.current?.offsetHeight}px`
      } else {
        const element = document.querySelector('.Pane.vertical.Pane1') as HTMLElement
        element.style.width = `${outerDivRef?.current?.offsetWidth}px`
        setOuterDivHeight(outerDivRef.current.offsetHeight)
      }
    }
    setShowEvaluateButton(true)
  }, [isDesktop])
  useLayoutEffect(() => {
    init()
  }, [init])

  // resize action
  const handleResize = useHandleResize({ outerDivRef, setShowEvaluateButton })

  // button click action
  const handleEvaluateButtonClick = () => {
    if (innerDivRef.current && outerDivRef.current) {
      if (!isDesktop) {
        const element = document.querySelector('.Pane.horizontal.Pane1') as HTMLElement
        element.style.height = `${outerDivRef?.current?.offsetHeight * 0.6}px`
      } else {
        const element = document.querySelector('.Pane.vertical.Pane1') as HTMLElement
        element.style.width = `${outerDivRef?.current?.offsetWidth * 0.6}px`
      }
    }
    setShowEvaluateButton(false)
  }

  return (
    <>
      <div ref={outerDivRef} className={styles.outerDiv}>
        <SplitPane onChange={handleResize} split={isDesktop ? 'vertical' : 'horizontal'} minSize={50}>
          <div
            ref={innerDivRef}
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <SurveyTopPart />
            <Survey />
          </div>
          <div
            style={{
              position: 'relative',
              ...(isDesktop && { height: outerDivHeight }),
            }}
          >
            <SurveyEvaluation />
            <FloatingCloseButton onClick={init} />
            {isDesktop ? <HorizontalButtonSlider /> : <VerticalSliderButton />}
          </div>
        </SplitPane>
      </div>
      {showEvaluateButton && <OpenEvaluationButton onClick={handleEvaluateButtonClick} />}
    </>
  )
}

export default SurveysSurveyView

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
