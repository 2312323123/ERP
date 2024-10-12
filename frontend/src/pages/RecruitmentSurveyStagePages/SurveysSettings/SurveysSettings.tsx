import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import EvaluationForm, { SurveyEvaluationResult } from '../../../components/EvaluationForm'
import EvaluationDisplay from '../../../components/EvaluationDisplay'
import MarkdownEditor from './components/MarkdownEditor'
import HiddenFieldsSetup from './components/HiddenFieldsSetup'
import FieldToDistinctTheSurveySetup from './components/FieldToDistinctTheSurveySetup'
import EvaluationPanelCreator from './components/EvaluationPanelCreator'
import MarkTagsSetup from './components/MarkTagsSetup'
import {
  getAnyEvaluationExists,
  getDemoEvaluationState,
  getEvaluationCriteriaSetup,
  getMark1Tag,
  getMark2Tag,
  getMark3Tag,
  getMark4Tag,
  getMark5Tag,
  setDemoEvaluationStateComment,
  setDemoEvaluationStateMarks,
} from '../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useDispatch, useSelector } from 'react-redux'
import WeightsSum from './components/WeightsSum'
import TokenDisplay from './components/TokenDisplay'
import { getActiveRecruitment } from '../../../store/slices/surveyStage/surveyUniversalSlice'
import CanPeopleSeeRecruitmentButton from './components/CanPeopleSeeRecruitmentButton'

const SurveysSettings = () => {
  const [newRecruitment, setNewRecruitment] = useState('')
  const [recruitmentSettings, setRecruitmentSettings] = useState<string | 'none'>('none')
  const [selectedRecruitment, setSelectedRecruitment] = useState<string>('')
  const [recruitments, setRecruitments] = useState<{ [key: string]: { canBeDeleted: boolean } }>({
    // Example recruitments object
    recruitment1rreerre: { canBeDeleted: true },
    recruitment2rtrttr: { canBeDeleted: false },
    // Add more recruitments as needed
  })

  const dispatch = useDispatch()
  const evaluationCriteriaSetup = useSelector(getEvaluationCriteriaSetup)
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

  const anyEvaluationExists = useSelector(getAnyEvaluationExists)
  const anySurveyExists = useSelector(getAnyEvaluationExists)

  const trySettingSelectedRecruitment = (value: string) => {
    const confirmSave = handleSaveChanges()

    if (!confirmSave) {
      const confirmExit = window.confirm('Czy na pewno chcesz wyjść z tej rekru?')
      if (confirmExit) {
        setSelectedRecruitment(value)
      }
    }
  }
  const handleSaveChanges = () => {
    const confirmSave = window.confirm('Czy chcesz zapisać zmiany w tej rekru, z której wychodzisz?')
    if (confirmSave) {
      // Implement save logic here
      alert('Changes saved!') // Placeholder for actual save logic
    }
    return confirmSave
  }
  const handleSave = () => {
    alert('Duupa!')
  }
  const handleCreateRecruitment = () => {
    console.log('New recruitment created:', newRecruitment)
  }
  const [canRate, setCanRate] = useState<boolean>(false)
  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanRate(event.target.checked)
  }
  const handleDeleteRecruitment = (recruitmentId: string) => {
    const recruitment = recruitments[recruitmentId]
    const confirmDelete = window.confirm('Are you sure you want to delete this recruitment?')

    if (confirmDelete) {
      if (recruitment.canBeDeleted) {
        alert(`Recruitment ${recruitmentId} added to deletions.`) // Placeholder for feedback
      } else {
        alert('Ta rekrutacja nie może już być usunięta')
      }
    }
  }

  const activeRecruitment = useSelector(getActiveRecruitment)

  return (
    <>
      <div>SurveysSettings</div>

      {/* Title */}
      <Container maxWidth="md">
        {/* Settings Header */}
        <Typography variant="h4" gutterBottom>
          Rekrutacja {activeRecruitment ? activeRecruitment.name : '- brak rekrutacji w systemie!'}
        </Typography>
      </Container>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Instantly changed settings section */}
      <Container maxWidth="md">
        {/* Settings Header */}
        <Typography variant="h4" gutterBottom>
          Ustawienia zmieniane natychmiastowo
        </Typography>

        {/* Create New Recruitment */}
        <Box my={3}>
          {/* Active Recruitment Details */}
          <Typography variant="h5" gutterBottom>
            Wybrana rekrutacja: {activeRecruitment ? activeRecruitment.name : 'brak w systemie'}, początek:{' '}
            {activeRecruitment ? activeRecruitment?.date : 'brak'}
          </Typography>

          {/* Choose Recruitment */}
          <Box my={3}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Wybierz rekrutację</InputLabel>
              <Select
                value={selectedRecruitment}
                onChange={(e) => trySettingSelectedRecruitment(e.target.value)}
                label="Wybierz rekrutację"
              >
                <MenuItem value="recruitment1">Recruitment 1</MenuItem>
                <MenuItem value="recruitment2">Recruitment 2</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Token Output */}
          <TokenDisplay />

          {/* Akceptuje ankiety Switch */}
          <Box my={3} display="flex" alignItems="center">
            <Typography variant="body1" mr={2}>
              Akceptuje ankiety?
            </Typography>
            <Switch checked={canRate} onChange={handleRateChange} color="primary" />
            <Typography variant="body1" ml={2}>
              {canRate ? 'TAK' : 'NIE'}
            </Typography>
          </Box>

          <CanPeopleSeeRecruitmentButton />

          {/* Można Oceniać Switch */}
          <Box my={3} display="flex" alignItems="center">
            <Typography variant="body1" mr={2}>
              Można oceniać?
            </Typography>
            <Switch checked={canRate} onChange={handleRateChange} color="primary" />
            <Typography variant="body1" ml={2}>
              {canRate ? 'TAK' : 'NIE'}
            </Typography>
          </Box>
        </Box>
      </Container>

      <Divider sx={{ my: 4 }} />

      {/* Create New Recruitment section */}
      <Container maxWidth="md">
        <Box my={3}>
          {/* List of editable fields */}
          <Typography variant="h4" gutterBottom>
            Stwórz nową rekrutację
          </Typography>

          <TextField
            fullWidth
            label="Nazwa"
            value={newRecruitment}
            onChange={(e) => setNewRecruitment(e.target.value)}
            variant="outlined"
            margin="normal"
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Skopiuj ustawienia z</InputLabel>
            <Select
              value={recruitmentSettings}
              onChange={(e) => setRecruitmentSettings(e.target.value)}
              label="Skopiuj ustawienia z"
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleCreateRecruitment}>
            Stwórz
          </Button>
        </Box>
      </Container>

      <Divider sx={{ my: 3 }} />

      {/* Save Settings Button Panel */}
      <Container
        sx={{
          position: 'sticky',
          zIndex: 10,
          top: '4rem',
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid lightgray',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          padding: '0.75rem',
        }}
      >
        <Box maxWidth="md" width="100%" display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
          {/* Left Column */}
          <Box flex={1} flexBasis="75%">
            <Typography variant="h4" gutterBottom>
              Ustawienia wybranej rekrutacji
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              (jak skończysz, kliknij 'Zapisz', albo się nie zapisze)
            </Typography>
          </Box>

          {/* Right Column */}
          <Box flex={1} display="flex" justifyContent="flex-end" flexBasis="25%">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
              sx={{
                fontSize: '1.25rem',
              }}
            >
              Zapisz
            </Button>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Container>

      {/* Always available per-recruitment settings section */}
      <Container maxWidth="md">
        <Divider sx={{ my: 2 }} />

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
        {anyEvaluationExists ? 'już nie można' : 'jeszcze można'}):
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
              criteria={evaluationCriteriaSetup.criteria}
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
              criteria={evaluationCriteriaSetup.criteria}
            />
            <Divider sx={{ my: 2 }} />
            <WeightsSum />

            <Divider sx={{ my: 2 }} />
          </Box>
        </Box>
      </Container>

      {/* Info */}
      <Typography variant="h5" gutterBottom align="center">
        Poniższe można zrobić do momentu wpadnięcia pierwszej ankietki. (czyli{' '}
        {anySurveyExists ? 'już nie można' : 'jeszcze można'}):
      </Typography>

      {/* Settings until the first survey section */}
      <Container maxWidth="md">
        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Button to delete a recruitment */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDeleteRecruitment('recruitment1')} // Use the relevant recruitment ID
          style={{ marginTop: '16px', color: 'white', padding: '1rem 2rem', fontSize: '1rem' }}
        >
          Usuń rekrutację
        </Button>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />
      </Container>
    </>
  )
}

export default SurveysSettings
