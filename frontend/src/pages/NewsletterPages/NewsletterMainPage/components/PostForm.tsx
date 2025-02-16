import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CoolDatePicker from '../../../../components/CoolDatePicker'
import useCreateNewsletterTask from '../../../../hooks/newsletter/useCreateNewsletterTask'
import { ExportedTask } from '../../../../services/newsletter'

const PostForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = React.useState<Date>(new Date())

  const { createNewsletterTask, isCreateNewsletterTaskLoading } = useCreateNewsletterTask()

  const handleSubmit = () => {
    const data: ExportedTask = {
      name: title,
      description,
      visible_until: date,
    }
    createNewsletterTask(data)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, 0.2)',
          flexDirection: 'column',
          '@media (min-width:600px)': {
            flexDirection: 'row',
            margin: '0.5rem',
            padding: '0.5rem',
          },
        }}
        display="flex"
      >
        <Box
          sx={{
            '@media (min-width:600px)': {
              flexBasis: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            },
          }}
        >
          <TextField
            sx={{ padding: '0.25rem' }}
            label="nazwa zadania"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            sx={{ padding: '0.25rem' }}
            label="opis"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            '@media (min-width:600px)': {
              flexBasis: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <Box sx={{ padding: '0.25rem' }}>
            <Typography variant="body1" component="h6">
              widoczne do:
            </Typography>
            <CoolDatePicker value={date} setValue={setDate as (value: Date | null) => void} />
          </Box>
          <Button
            sx={{ margin: '0.25rem', width: '20ch' }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isCreateNewsletterTaskLoading}
          >
            Stwórz
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default PostForm
