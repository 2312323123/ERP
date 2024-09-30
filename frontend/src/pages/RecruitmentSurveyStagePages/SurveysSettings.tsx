import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import EvaluationForm from '../../components/EvaluationForm'

const SurveysSettings = () => {
  const [newRecruitment, setNewRecruitment] = useState('')
  const [recruitmentSettings, setRecruitmentSettings] = useState<string | 'none'>('none')
  const [selectedRecruitment, setSelectedRecruitment] = useState<string>('')
  const [activeRecruitment, setActiveRecruitment] = useState<{ name: string; date: string }>({
    name: 'no name',
    date: '01-01-2024',
  })

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
  const [expanded, setExpanded] = useState<boolean>(true) // To keep the accordion open

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanRate(event.target.checked)
  }

  // State for managing the list of text fields
  const [evaluatorHiddenFields, setEvaluatorHiddenFields] = useState<string[]>([''])

  const handleEvaluatorHiddenFieldChange = (index: number, value: string) => {
    const newFields = [...evaluatorHiddenFields]
    newFields[index] = value
    setEvaluatorHiddenFields(newFields)
  }

  const handleAddEvaluatorHiddenField = () => {
    setEvaluatorHiddenFields([...evaluatorHiddenFields, '']) // Add a new empty field
  }

  const handleDeleteEvaluatorHiddenField = (index: number) => {
    const newFields = evaluatorHiddenFields.filter((_, i) => i !== index)
    setEvaluatorHiddenFields(newFields)
  }

  // State for the identifier field
  const [identifierField, setIdentifierField] = useState<string>('')

  // State for the evaluation and survey statuses
  const [isThereAnyEvalutionAlready, setIsThereAnyEvalutionAlready] = useState<boolean>(false)
  const [isThereAnySurveyAlready, setIsThereAnySurveyAlready] = useState<boolean>(false)

  // State for the recruitments to be deleted
  const [recruitmentsToBeDeleted, setRecruitmentsToBeDeleted] = useState<string[]>([])
  const [recruitments, setRecruitments] = useState<{ [key: string]: { canBeDeleted: boolean } }>({
    // Example recruitments object
    recruitment1rreerre: { canBeDeleted: true },
    recruitment2rtrttr: { canBeDeleted: false },
    // Add more recruitments as needed
  })

  const handleDeleteRecruitment = (recruitmentId: string) => {
    const recruitment = recruitments[recruitmentId]
    const confirmDelete = window.confirm('Are you sure you want to delete this recruitment?')

    if (confirmDelete) {
      if (recruitment.canBeDeleted) {
        setRecruitmentsToBeDeleted([...recruitmentsToBeDeleted, recruitmentId])
        alert(`Recruitment ${recruitmentId} added to deletions.`) // Placeholder for feedback
      } else {
        alert('Ta rekrutacja nie może już być usunięta')
      }
    }
  }

  // State for managing the list of custom fields

  const [customFields, setCustomFields] = useState<
    { order: number; name: string; description: string; weight: number }[]
  >([])

  // useEffect(() => {
  //   console.log('customFields:')
  //   console.log(customFields)
  // }, [customFields])

  const handleAddCustomField = () => {
    const newField = {
      order: customFields.length + 1,
      name: '',
      description: '',
      weight: 0,
    }
    setCustomFields([...customFields, newField])
  }

  const handleCustomFieldChange = (index: number, key: string, value: string | number) => {
    const newFields = [...customFields]
    newFields[index] = { ...newFields[index], [key]: value }
    setCustomFields(newFields)
  }

  const handleDeleteCustomField = (index: number) => {
    const newFields = customFields.filter((_, i) => i !== index).map((field, i) => ({ ...field, order: i + 1 }))
    setCustomFields(newFields)
  }

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newFields = [...customFields]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(index - 1, 0, movedField)
      setCustomFields(newFields)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index < customFields.length - 1) {
      const newFields = [...customFields]
      const [movedField] = newFields.splice(index, 1)
      newFields.splice(index + 1, 0, movedField)
      setCustomFields(newFields)
    }
  }

  return (
    <>
      <div>SurveysSettings</div>

      <Container maxWidth="md">
        {/* Settings Header */}
        <Typography variant="h4" gutterBottom>
          Ustawienia - rekrutacja &lt;TODO:nazwa rekru&gt;
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          (jak skończysz, kliknij 'Zapisz', albo się nie zapisze)
        </Typography>

        {/* Save Button */}
        <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
          Zapisz
        </Button>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Create New Recruitment */}
        <Box my={3}>
          <TextField
            fullWidth
            label="Stwórz nową rekrutację"
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

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Active Recruitment Details */}
        <Typography variant="h5" gutterBottom>
          Aktywna rekrutacja: {activeRecruitment.name}, początek: {activeRecruitment.date}
        </Typography>

        {/* Choose Recruitment */}
        <Box my={3}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Wybierz aktywną rekrutację</InputLabel>
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
        <Box my={3}>
          <Typography variant="body1">Token do wklejenia w skrypt od przesyłania ankiet:</Typography>
          <code>hehe</code>
        </Box>

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
      </Container>

      {/* Accordion */}
      <Accordion expanded={expanded} onChange={() => setExpanded((expanded) => !expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Accordion Title</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>{/* This will be continued later */}dupa</div>
        </AccordionDetails>
      </Accordion>

      <Container maxWidth="md">
        {/* Divider */}
        <Divider sx={{ my: 2 }} />
        <Box my={3}>
          {/* List of editable fields */}
          <Typography variant="h5" gutterBottom>
            Pola z ankiety, których nie pokazujemy
          </Typography>

          {evaluatorHiddenFields.map((field, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <TextField
                value={field}
                onChange={(e) => handleEvaluatorHiddenFieldChange(index, e.target.value)}
                variant="outlined"
                fullWidth
                label={`Pole ${index + 1}`}
              />
              <IconButton onClick={() => handleDeleteEvaluatorHiddenField(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          {/* Button to add a new field */}
          <Button variant="contained" color="primary" onClick={handleAddEvaluatorHiddenField}>
            Add Field
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Identifier Field */}
        <Box my={3}>
          <Typography variant="h5" gutterBottom>
            Pole z ankiety, którego zawartość widać w liście ankiet, np. imię:
          </Typography>
          <TextField
            fullWidth
            label="pole"
            value={identifierField}
            onChange={(e) => setIdentifierField(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Info */}
        <Typography variant="h4" gutterBottom>
          Poniższe ustawienia można zmieniać do momentu wpadnięcia pierwszej oceny od dowolnego oceniającego. (czyli{' '}
          {isThereAnyEvalutionAlready ? 'już nie można' : 'jeszcze można'}):
        </Typography>

        <Box my={3}>
          {/* Custom fields info */}
          <Typography variant="h6" gutterBottom>
            Te pola co wystawianie oceny polega na tym że je wypełniasz:
          </Typography>

          {/* List of custom fields */}
          {customFields.map((field, index) => (
            <Box key={index} display="flex" alignItems="center" mb={2} mt={2} border={1} borderRadius={2} padding={2}>
              {/* Up/Down buttons */}
              <IconButton onClick={() => handleMoveUp(index)} disabled={index === 0}>
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton onClick={() => handleMoveDown(index)} disabled={index === customFields.length - 1}>
                <ArrowDownwardIcon />
              </IconButton>

              {/* Input fields */}
              <TextField
                value={field.name}
                onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                variant="outlined"
                label="Name"
                sx={{ marginX: 1 }}
              />
              <TextField
                value={field.description}
                onChange={(e) => handleCustomFieldChange(index, 'description', e.target.value)}
                variant="outlined"
                label="Description"
                sx={{ marginX: 1 }}
              />
              <TextField
                type="number"
                value={field.weight}
                onChange={(e) => handleCustomFieldChange(index, 'weight', Number(e.target.value))}
                variant="outlined"
                label="Weight"
                sx={{ marginX: 1 }}
              />

              {/* Delete button */}
              <IconButton onClick={() => handleDeleteCustomField(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          {/* Button to add a new custom field */}
          <Button variant="contained" color="primary" onClick={handleAddCustomField}>
            Dodaj pole
          </Button>

          <Box my={3}>
            <Typography variant="h6" gutterBottom>
              Jak to wygląda przy ocenianiu:
            </Typography>

            <Divider sx={{ my: 2 }} />

            <EvaluationForm
              evalElements={customFields
                .slice() // Create a shallow copy to avoid mutating the original array
                .sort((a, b) => a.order - b.order) // Sort by order
                .map(({ name, description, weight }) => ({ name, description, weight }))}
              gradeNames={['suabo', 'tak se', 'ok', 'dobrze', 'super']}
              onSubmit={() => {}}
            />
            {/* dupadupadupa */}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Jak to widzą inni:
            </Typography>

            <Divider sx={{ my: 2 }} />
          </Box>
        </Box>

        {/* Info */}
        <Typography variant="h4" gutterBottom>
          Poniższe ustawienia można zmieniać do momentu wpadnięcia pierwszej ankietki. (czyli{' '}
          {isThereAnySurveyAlready ? 'już nie można' : 'jeszcze można'}):
        </Typography>

        {/* Button to delete a recruitment */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteRecruitment('recruitment1')} // Use the relevant recruitment ID
          style={{ marginTop: '16px' }}
        >
          Usuń rekrutację
        </Button>

        {/* Display deleted recruitments */}
        <Box mt={2}>
          <Typography variant="h6">Recruitments to be deleted:</Typography>
          <ul>
            {recruitmentsToBeDeleted.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        </Box>
      </Container>

      <Box position="fixed" bottom={16} right={16}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Zapisz
        </Button>
      </Box>
    </>
  )
}

export default SurveysSettings
