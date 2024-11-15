import { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useGetCriteriaQuery, useGetSurveyStatsListQuery } from '../../../../services/surveyStage'
import { Link } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'

const columns2: GridColDef[] = [
  {
    field: 'ranking',
    headerName: 'Ranking',
    width: 70,
  },
  {
    field: 'rekrut',
    headerName: 'Rekrut',
    width: 200,
    renderCell: (params) => (
      <Link to={`/recruitment-survey-stage/app/survey/${params.id}`} title={params.value}>
        {params.value}
      </Link>
    ),
  },
  {
    field: 'weightedAverage',
    headerName: 'Średnia ważona',
    width: 130,
  },
  {
    field: 'amountOfEvaluations',
    headerName: 'Ile ocen',
    width: 130,
  },
  {
    field: 'evaluated',
    headerName: 'Oceniono?',
    width: 130,
    valueGetter: (value, row) => (row.evaluated ? '✅' : ''),
  },
]

const weightedAverage = (marks: number[], weights: number[]) => {
  const sum = marks.reduce((acc, mark, index) => acc + mark * weights[index], 0)
  const sumWeights = weights.reduce((acc, weight) => acc + weight, 0)
  return isNaN(sum / sumWeights) ? 0 : sum / sumWeights
}

export function SurveysDataTable() {
  const { data } = useGetSurveyStatsListQuery()
  const { data: criteria } = useGetCriteriaQuery()
  const [search, setSearch] = useState('')
  const [weights, setWeights] = useState<number[]>([]) // Store weights
  const [initialWeights, setInitialWeights] = useState<number[]>([]) // For resetting

  // Initialize weights when criteria data is available
  useEffect(() => {
    if (criteria?.evaluationCriteria) {
      const defaultWeights = criteria.evaluationCriteria.map((item) => item.weight)
      setWeights(defaultWeights)
      setInitialWeights(defaultWeights)
    }
  }, [criteria])

  let displayData = data?.map((item, index) => {
    return {
      id: item.uuid,
      rekrut: item.identification_field_value,
      amountOfEvaluations: item.amount_of_evaluations,
      evaluated: item.evaluated,
      short_fields_combined: item.short_fields_combined,
      weightedAverage:
        item.average_marks && weights
          ? Math.round(weightedAverage(item.average_marks, weights) * 100) / 100
          : undefined,
    }
  })

  displayData?.sort((a, b) => (b.weightedAverage || 0) - (a.weightedAverage || 0))
  displayData = displayData?.map((item, index) => ({ ...item, ranking: index + 1 }))

  // Filter data based on search input
  const filteredData = displayData?.filter((row) => {
    const searchParts = search
      .split(' ')
      .map((part) => part.replace(/,/g, '')) // Remove commas from search terms
      .filter(Boolean) // Remove empty terms

    const rowFieldSanitized = row.short_fields_combined?.replace(/,/g, '').toLowerCase() // Ignore commas in field

    return searchParts.every((part) => rowFieldSanitized?.includes(part.toLowerCase()))
  })

  return (
    <Paper sx={{ width: '100%', padding: 2 }}>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Wagi kryteriów:
      </Typography>
      {/* Replace Grid with Stack or Box for layout */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
        {/* Weight Inputs */}
        {weights.map((weight, index) => (
          <Box key={index}>
            <TextField
              label={criteria?.evaluationCriteria[index].name}
              type="number"
              InputProps={{ inputProps: { min: 0 } }} // Using InputProps instead of inputProps
              value={weight}
              onChange={(e) => {
                const newWeights = [...weights]
                newWeights[index] = parseFloat(e.target.value) || 0
                setWeights(newWeights)
              }}
              sx={{ width: '150px' }} // Narrow input
            />
          </Box>
        ))}

        {/* Reset Button */}
        <Box>
          <Button
            variant="contained"
            onClick={() => setWeights(initialWeights)} // Reset weights
          >
            Resetuj
          </Button>
        </Box>
      </Stack>

      {/* Search Input */}
      <TextField
        label="Szukaj"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Data Table */}
      <DataGrid rows={filteredData || []} columns={columns2} sx={{ border: 0 }} />
    </Paper>
  )
}
