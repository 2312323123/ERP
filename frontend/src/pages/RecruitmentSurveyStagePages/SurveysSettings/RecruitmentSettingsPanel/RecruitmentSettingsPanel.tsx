import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material'
import FieldToDistinctTheSurveySetup from './components/FieldToDistinctTheSurveySetup'
import HiddenFieldsSetup from './components/HiddenFieldsSetup'
import MarkdownEditor from './components/MarkdownEditor'
import EvaluationDisplay from '../../../../components/EvaluationDisplay'
import EvaluationForm, { SurveyEvaluationResult } from '../../../../components/EvaluationForm'
import EvaluationPanelCreator from './components/EvaluationPanelCreator'
import MarkTagsSetup from './components/MarkTagsSetup'
import WeightsSum from './components/WeightsSum'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDemoEvaluationState,
  getEvaluationCriteria,
  getMark1Tag,
  getMark2Tag,
  getMark3Tag,
  getMark4Tag,
  getMark5Tag,
  setDemoEvaluationStateComment,
  setDemoEvaluationStateMarks,
  setSurveySettingsEditable,
} from '../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useGetActiveRecruitmentQuery, useGetActiveRecruitmentSettingsQuery } from '../../../../services/erp'
import { useEffect } from 'react'

const RecruitmentSettingsPanel = () => {
  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  const { data: activeRecruitmentSettings } = useGetActiveRecruitmentSettingsQuery(activeRecruitment?.uuid ?? '')

  const dispatch = useDispatch()

  useEffect(() => {
    if (activeRecruitmentSettings) {
      console.log('Active recruitment settings changed:', activeRecruitmentSettings)
      dispatch(
        setSurveySettingsEditable({
          gradingInstruction: activeRecruitmentSettings.gradingInstruction,
          fieldsNotToShow: activeRecruitmentSettings.fieldsNotToShow,
          fieldToDistinctTheSurvey: activeRecruitmentSettings.fieldToDistinctTheSurvey,
          evaluationCriteria: activeRecruitmentSettings.evaluationCriteria,
          markTags: {
            mark1Tag: activeRecruitmentSettings.markTags.mark1Tag,
            mark2Tag: activeRecruitmentSettings.markTags.mark2Tag,
            mark3Tag: activeRecruitmentSettings.markTags.mark3Tag,
            mark4Tag: activeRecruitmentSettings.markTags.mark4Tag,
            mark5Tag: activeRecruitmentSettings.markTags.mark5Tag,
          },
        }),
      )
    }
  }, [activeRecruitmentSettings, dispatch])

  const evaluationCriteria = useSelector(getEvaluationCriteria)
  const mark1Tag = useSelector(getMark1Tag)
  const mark2Tag = useSelector(getMark2Tag)
  const mark3Tag = useSelector(getMark3Tag)
  const mark4Tag = useSelector(getMark4Tag)
  const mark5Tag = useSelector(getMark5Tag)

  const demoEvaluationState = useSelector(getDemoEvaluationState)
  const setSurveyEvaluationResult = (result: SurveyEvaluationResult) => {
    dispatch(setDemoEvaluationStateMarks(result.marks))
    dispatch(setDemoEvaluationStateComment(result.comment))
  }

  return (
    <>
      {/* Always available ones */}
      <Container maxWidth="md">
        <Divider sx={{ my: 2 }} />

        {/* <pre>{JSON.stringify(activeRecruitmentSettings, null, 2)}</pre>

        <h3> tgtge </h3>

        <pre>{JSON.stringify(surveySettingsEditable, null, 2)}</pre> */}

        {/* Accordion */}
        <MarkdownEditor />

        <Divider sx={{ my: 2 }} />

        {/* Hidden Fields Setup */}
        <HiddenFieldsSetup />

        <Divider sx={{ my: 2 }} />

        {/* Identifier Field */}
        <FieldToDistinctTheSurveySetup />

        <Divider sx={{ my: 2 }} />
      </Container>

      {/* Info */}
      <Typography variant="h5" gutterBottom align="center">
        Poniższe ustawienia można zmieniać do momentu wpadnięcia pierwszej oceny od dowolnego oceniającego. (czyli{' '}
        {activeRecruitmentSettings ? (
          activeRecruitmentSettings.isThereAnyMark ? (
            'już nie można'
          ) : (
            'jeszcze można'
          )
        ) : (
          <CircularProgress size={20} />
        )}
        ):
      </Typography>

      {/* Settings until the first evaluation section */}
      <Container maxWidth="md">
        <Divider sx={{ my: 2 }} />
        <Box my={3}>
          <Typography variant="h6" gutterBottom>
            Nazwy przy ocenach:
          </Typography>
          {/* Grade Names */}
          <MarkTagsSetup />

          <Divider sx={{ my: 2 }} />
        </Box>

        <Box my={3}>
          {/* Evaluation Panel Creator */}
          <EvaluationPanelCreator />

          <Divider sx={{ my: 2 }} />

          <Box my={3}>
            <Typography variant="h5" gutterBottom>
              Jak to wygląda przy ocenianiu:
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Formularz oceny:
            </Typography>
            <Divider sx={{ my: 1 }} />
            <EvaluationForm
              criteria={evaluationCriteria}
              markTags={[mark1Tag, mark2Tag, mark3Tag, mark4Tag, mark5Tag]}
              onSubmit={setSurveyEvaluationResult}
              demoMode
              initialMarks={demoEvaluationState.marks}
              initialComment={demoEvaluationState.comment}
            />
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Jak to widzą inni:
            </Typography>
            <Divider sx={{ my: 1 }} />
            <EvaluationDisplay
              userName={demoEvaluationState.user.name}
              userPicture={demoEvaluationState.user.picture}
              surveyEvaluationResult={{
                marks: demoEvaluationState.marks,
                comment: demoEvaluationState.comment,
              }}
              criteria={evaluationCriteria}
            />
            <Divider sx={{ my: 2 }} />
            <WeightsSum />

            <Divider sx={{ my: 2 }} />
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default RecruitmentSettingsPanel
