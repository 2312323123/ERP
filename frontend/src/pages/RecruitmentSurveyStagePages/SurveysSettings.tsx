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
import EvaluationDisplay from '../../components/EvaluationDisplay'

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

  interface CustomField {
    order: number
    name: string
    description: string
    weight: number
  }
  interface CustomFieldNoOrder {
    name: string
    description: string
    weight: number
  }

  function removeOrderAndSort(fields: CustomField[]): CustomFieldNoOrder[] {
    return fields
      .sort((a, b) => a.order - b.order) // Sort by 'order'
      .map((obj: CustomField) => ({
        name: obj.name,
        description: obj.description,
        weight: obj.weight,
      }))
  }

  const [customFields, setCustomFields] = useState<CustomField[]>([])

  useEffect(() => {
    console.log('customFields:')
    console.log(customFields)
  }, [customFields])

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

  // State for the grade names
  const [gradeNames, setGradeNames] = useState<string[]>(Array(5).fill(''))

  const handleGradeNameChange = (index: number, value: string) => {
    const newGradeNames = [...gradeNames]
    newGradeNames[index] = value
    setGradeNames(newGradeNames)
  }

  // State for the evaluation form submission
  const [formResults, setFormResults] = useState<any>(null)

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
                multiline // Set to true for a long input text area
                rows={4} // Number of visible rows
                sx={{ marginX: 1, flexGrow: 1 }}
              />
              <TextField
                type="number"
                value={field.weight}
                onChange={(e) => handleCustomFieldChange(index, 'weight', Number(e.target.value))}
                variant="outlined"
                label="Weight"
                sx={{ marginX: 1, width: '80px' }} // Set width to a specific value
              />

              {/* Delete button */}
              <IconButton onClick={() => handleDeleteCustomField(index)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          {/* Button to add a new custom field */}
          <Button variant="contained" color="primary" onClick={handleAddCustomField}>
            Stwórz kryterium oceniania
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 2 }} />

          <Box my={3}>
            <Typography variant="h6" gutterBottom>
              Nazwy przy ocenach:
            </Typography>

            {/* Grade Names */}
            <Box>
              {Array.from({ length: 5 }, (_, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{index + 1} - </Typography>
                  <TextField
                    value={gradeNames[index]}
                    onChange={(e) => handleGradeNameChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 1, width: '175px' }} // Adjust width as needed
                  />
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />
          </Box>

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
              gradeNames={gradeNames}
              onSubmit={(data) => {
                alert(JSON.stringify(data, null, 2))
              }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Jak to widzą inni:
            </Typography>
            {/* dupadupadupa */}
            <EvaluationDisplay
              result={{
                user: {
                  name: 'John Doe',
                  picture:
                    'data:image/jpeg;base64,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',
                },
                marks: [1, 3, 5],
                comment: 'Great work!',
              }}
              formProps={{
                evalElements: removeOrderAndSort(customFields),
                gradeNames: gradeNames,
                onSubmit: () => alert('dupaduuuuupa345'),
              }}
            />

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

        {/* Divider */}
        <Divider sx={{ my: 2 }} />
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
