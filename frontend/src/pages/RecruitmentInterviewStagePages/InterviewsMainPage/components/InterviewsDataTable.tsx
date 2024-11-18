import { useState, useMemo } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { UserIdNamePicture } from '../../../../services/surveyStage'
import { Link } from 'react-router-dom'
import { ChooseUser } from './ChooseUser'
import useCreateInterview from '../../../../hooks/interviews/useCreateInterview'
import useDeleteInterview from '../../../../hooks/interviews/useDeleteInterview'

export interface Interviews {
  fieldToDistinctTheSurvey1: string
  fieldToDistinctTheSurvey2: string
  interviews: [
    {
      survey_uuid: string
      fieldToDistinctTheSurvey1Value: string | undefined
      fieldToDistinctTheSurvey2Value: string | undefined
      interviewerId: string | null
      helper1Id: string | null
      helper2Id: string | null
      interviewerOpinion: string | null
      helper1Opinion: string | null
      helper2Opinion: string | null
    },
  ]
}

interface RowData {
  id: string
  fieldToDistinctTheSurvey1Value: string | undefined
  fieldToDistinctTheSurvey2Value: string | undefined
  interviewerId: string | null
  interviewerName: string | null
  interviewerPicture: string | null
  helper1Id: string | null
  helper1Name: string | null
  helper1Picture: string | null
  helper2Id: string | null
  helper2Name: string | null
  helper2Picture: string | null
  interviewerOpinion: string
  helper1Opinion: string
  helper2Opinion: string
  searchString: string
}

interface Props {
  interviews: Partial<Interviews>
  usersArray: UserIdNamePicture[]
  usersObject: Record<string, UserIdNamePicture>
  settingsVersion?: boolean
  noInterviewVersion?: boolean
}

export function InterviewsDataTable({
  interviews,
  usersArray,
  usersObject,
  settingsVersion = false,
  noInterviewVersion = false,
}: Props) {
  const { isCreateInterviewLoading, createInterview } = useCreateInterview()
  const { deleteInterview } = useDeleteInterview()
  // const { isDeleteInterviewLoading, deleteInterview } = useDeleteInterview() // TODO: use this

  const [search, setSearch] = useState('')

  const columns2: GridColDef[] = useMemo(() => {
    if (settingsVersion) {
      return [
        {
          field: 'fieldToDistinctTheSurvey1Value',
          headerName: interviews.fieldToDistinctTheSurvey1,
          width: 125,
          renderCell: (params) => (
            <Link to={`/recruitment-survey-stage/app/survey/${params.id}`} title={params.value}>
              {params.value}
            </Link>
          ),
        },
        {
          field: 'fieldToDistinctTheSurvey2Value',
          headerName: interviews.fieldToDistinctTheSurvey2,
          width: 150,
        },
        {
          field: 'interviewerId',
          headerName: 'prowadzący rozmowę',
          width: 300,
          renderCell: (params) => (
            <ChooseUser
              users={usersArray}
              initialId={params.value}
              recruitId={params.id as string}
              disabled={isCreateInterviewLoading}
              fieldImSetting="interviewer_uuid"
              callback={createInterview}
            />
          ),
        },
        {
          field: 'helper1Id',
          headerName: 'pomocnik 1',
          width: 300,
          renderCell: (params) => (
            <ChooseUser
              users={usersArray}
              initialId={params.value}
              recruitId={params.id as string}
              disabled={isCreateInterviewLoading}
              fieldImSetting="helper_1_uuid"
              callback={createInterview}
            />
          ),
        },
        {
          field: 'helper2Id',
          headerName: 'pomocnik 2',
          width: 300,
          renderCell: (params) => (
            <ChooseUser
              users={usersArray}
              initialId={params.value}
              recruitId={params.id as string}
              disabled={isCreateInterviewLoading}
              fieldImSetting="helper_2_uuid"
              callback={createInterview}
            />
          ),
        },
        {
          field: 'dupa',
          headerName: 'Zmiana decyzji',
          width: 200,
          renderCell: (params) => (
            <Button
              onClick={() => {
                deleteInterview({ recruitUuid: params.id as string })
              }}
              variant="contained"
              color="secondary"
              sx={{ color: 'white' }}
            >
              Jednak nie
            </Button>
          ),
        },
      ]
    } else if (noInterviewVersion) {
      return [
        {
          field: 'fieldToDistinctTheSurvey1Value',
          headerName: interviews.fieldToDistinctTheSurvey1,
          width: 125,
          renderCell: (params) => (
            <Link to={`/recruitment-survey-stage/app/survey/${params.id}`} title={params.value}>
              {params.value}
            </Link>
          ),
        },
        {
          field: 'fieldToDistinctTheSurvey2Value',
          headerName: interviews.fieldToDistinctTheSurvey2,
          width: 150,
        },
        {
          field: 'ranking',
          headerName: 'Zmiana decyzji',
          width: 200,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                console.log('{ recruit_uuid: params.id as string }:')
                console.log({ recruit_uuid: params.id as string })

                createInterview({ recruit_uuid: params.id as string })
              }}
            >
              Ma mieć rozmowę
            </Button>
          ),
        },
      ]
    } else {
      return [
        {
          field: 'ranking',
          headerName: 'Ranking',
          width: 70,
        },
        {
          field: 'fieldToDistinctTheSurvey1Value',
          headerName: interviews.fieldToDistinctTheSurvey1,
          width: 125,
          renderCell: (params) => (
            <Link to={`/recruitment-survey-stage/app/survey/${params.id}`} title={params.value}>
              {params.value}
            </Link>
          ),
        },
        {
          field: 'fieldToDistinctTheSurvey2Value',
          headerName: interviews.fieldToDistinctTheSurvey2,
          width: 150,
        },
        {
          field: 'amountOfEvaluations',
          headerName: 'prowadzący',
          width: 300,
        },
        {
          field: 'evaluated',
          headerName: 'pomocnik 1',
          width: 300,
          valueGetter: (value, row) => (row.evaluated ? '✅' : ''),
        },
        {
          field: 'ranking',
          headerName: 'pomocnik 2',
          width: 300,
          renderCell: (params) => (
            <Link to={`/recruitment-survey-stage/app/survey/${params.id}`} title={params.value}>
              {params.value}
            </Link>
          ),
        },
      ]
    }
  }, [
    interviews,
    noInterviewVersion,
    settingsVersion,
    createInterview,
    deleteInterview,
    isCreateInterviewLoading,
    usersArray,
  ])

  const dataForTable = interviews?.interviews?.map((interview) => {
    return {
      id: interview.survey_uuid,
      fieldToDistinctTheSurvey1Value: interview.fieldToDistinctTheSurvey1Value,
      fieldToDistinctTheSurvey2Value: interview.fieldToDistinctTheSurvey2Value,
      interviewerId: interview.interviewerId,
      interviewerName: usersObject[interview?.interviewerId ?? '']?.name,
      interviewerPicture: usersObject[interview?.interviewerId ?? '']?.picture,
      helper1Id: interview.helper1Id,
      helper1Name: usersObject[interview?.helper1Id ?? '']?.name,
      helper1Picture: usersObject[interview?.helper1Id ?? '']?.picture,
      helper2Id: interview.helper2Id,
      helper2Name: usersObject[interview?.helper2Id ?? '']?.name,
      helper2Picture: usersObject[interview?.helper2Id ?? '']?.picture,
      interviewerOpinion: interview.interviewerOpinion,
      helper1Opinion: interview.helper1Opinion,
      helper2Opinion: interview.helper2Opinion,
      searchString:
        `${interview.fieldToDistinctTheSurvey1Value ?? ''}__${interview.fieldToDistinctTheSurvey2Value ?? ''}__${usersObject[interview.interviewerId ?? '']?.name ?? ''}__${usersObject[interview.helper1Id ?? '']?.name ?? ''}__${usersObject[interview.helper2Id ?? '']?.name ?? ''}`.toLowerCase(),
    } as RowData
  })

  const filteredData = dataForTable?.filter((row: Partial<RowData>) => {
    const searchParts = search
      .split(' ')
      .map((part) => part.replace(/,/g, ''))
      .filter(Boolean)
    const rowFieldSanitized = row?.searchString?.toLowerCase()

    return searchParts.every((part) => rowFieldSanitized?.includes(part.toLowerCase()))
  })

  return (
    <Paper sx={{ width: '100%', padding: 2 }}>
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
