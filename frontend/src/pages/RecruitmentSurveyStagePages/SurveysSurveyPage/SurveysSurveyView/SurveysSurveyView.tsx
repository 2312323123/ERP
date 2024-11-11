import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import OpenEvaluationButton from './components/OpenEvaluationButton'
import SplitPane from 'react-split-pane'
import './components/ReactSplitPaneStyles.css'
import useHandleResize from './components/useHandleResize'
import styles from './SurveysSurveyView.module.css'
import FloatingCloseButton from './components/FloatingCloseButton'
import VerticalSliderButton from './components/VerticalButtonSlider'
import useIsDesktop from '../../../../utils/useIsDesktop'
import HorizontalButtonSlider from './components/HorizontalButtonSlider'
import SurveyDisplay from './components/SurveyDisplay'
import { useGetAllEvaluationsQuery, useGetCriteriaQuery, useGetSurveyQuery } from '../../../../services/surveyStage'
import { useParams } from 'react-router-dom'
import EvaluationForm from '../../../../components/EvaluationForm'
import { Box } from '@mui/material'
import useEvaluateSurvey from '../../../../hooks/surveys/useEvaluateSurvey'
import { useSelector } from 'react-redux'
import { getAccessToken } from '../../../../store/slices/authSlice'
import { jwtDecode } from 'jwt-decode'

const SurveysSurveyView = () => {
  const isDesktop = useIsDesktop()
  const outerDivRef = useRef<HTMLDivElement>(null)
  const innerDivRef = useRef<HTMLDivElement>(null)
  const [showEvaluateButton, setShowEvaluateButton] = useState(true)
  const [outerDivHeight, setOuterDivHeight] = useState(0)
  const { uuid } = useParams() // Get the 'id' parameter from the route
  const { data: survey, error: error2, isLoading: isLoading2 } = useGetSurveyQuery(uuid ?? '')
  const { data: evaluationCriteria, error: error1, isLoading: isLoading1 } = useGetCriteriaQuery(uuid ?? '')
  // evaluationCriteria: gradingInstruction, fieldsNotToShow, fieldToDistinctTheSurvey, evaluationCriteria, markTags

  // to load one's own evaluation into the form
  const { data: evaluations } = useGetAllEvaluationsQuery(uuid ?? '')
  const accessToken = useSelector(getAccessToken)
  const id = (jwtDecode(accessToken) as { id: string }).id
  const myEvaluation = evaluations?.find((evaluation) => evaluation.id === id)
  const reEvaluating = Boolean(myEvaluation)

  const evaluateSurvey = useEvaluateSurvey({ reEvaluating })

  /* adding this conditionally on mount and removing on onmount of survey view to make using split pane easier*/
  useEffect(() => {
    // Add CSS module class to body on component mount
    document.body.classList.add(styles.disableSwipeRefresh)

    // Clean up by removing class on component unmount
    return () => {
      document.body.classList.remove(styles.disableSwipeRefresh)
    }
  }, [])

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
        {/* known error, not sure how to fix it */}
        <SplitPane
          pane1Style={{ overflowY: 'auto' }}
          pane2Style={{ overflowY: 'auto' }}
          onChange={handleResize}
          split={isDesktop ? 'vertical' : 'horizontal'}
          minSize={50}
        >
          <div
            ref={innerDivRef}
            style={{
              position: 'relative',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            {!error2 && !isLoading2 && survey && survey.responses && <SurveyDisplay responses={survey.responses} />}
          </div>
          <div
            style={{
              position: 'relative',
              ...(isDesktop && { height: outerDivHeight }),
              overflowY: 'auto',
            }}
          >
            {evaluationCriteria?.evaluationCriteria && evaluationCriteria?.markTags && (
              <Box mx={2}>
                <EvaluationForm
                  surveyUuid={uuid ?? ''}
                  criteria={evaluationCriteria.evaluationCriteria}
                  markTags={[
                    evaluationCriteria.markTags.mark1Tag,
                    evaluationCriteria.markTags.mark2Tag,
                    evaluationCriteria.markTags.mark3Tag,
                    evaluationCriteria.markTags.mark4Tag,
                    evaluationCriteria.markTags.mark5Tag,
                  ]}
                  onSubmit={(evaluation) => {
                    evaluateSurvey(evaluation)
                    if (!reEvaluating) {
                      init()
                    }
                  }}
                  initialMarks={myEvaluation?.marks}
                  initialComment={myEvaluation?.comment}
                  reEvaluating={reEvaluating}
                />
              </Box>
            )}
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
