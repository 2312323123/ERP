import { Box, Avatar, Typography, TextareaAutosize, Button } from '@mui/material'
import { UserIdNamePicture } from '../../../../services/surveyStage'
import { useState } from 'react'

interface Props {
  user: UserIdNamePicture | undefined
  opinion: string
  myId: string
}

const ChosenUser = ({ user, opinion, myId }: Props) => {
  const [editingMode, setEditingMode] = useState(false)
  const [editingOpinionText, setEditingOpinionText] = useState(opinion ?? '')

  return (
    <div style={{ margin: '0.25rem', minHeight: '2.5rem' }}>
      {user && (
        <Box component="li" display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={0.5}>
          <Box display="flex" alignItems="center">
            <Avatar src={user.picture} alt={user.name} sx={{ marginRight: '0.75rem' }} />
            <Typography variant="body1" color="text.primary">
              {user.name}
            </Typography>
          </Box>

          <Box>
            {!editingMode && myId === user.id && (
              <Button
                onClick={() => setEditingMode(!editingMode)}
                variant="contained"
                color="secondary"
                sx={{ color: '#eee' }}
              >
                Edytuj
              </Button>
            )}

            {editingMode && (
              <Button
                onClick={() => setEditingMode(!editingMode)}
                variant="contained"
                color="primary"
                sx={{ color: '#eee' }}
              >
                Zapisz
              </Button>
            )}
          </Box>
        </Box>
      )}
      {editingMode && (
        <TextareaAutosize
          minRows={3}
          placeholder="Enter your text"
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          value={editingOpinionText}
          onChange={(e) => setEditingOpinionText(e.target.value)}
        />
      )}
    </div>
  )
}

export default ChosenUser
