import { Box, Typography, TextareaAutosize, Button } from '@mui/material'
import { UserIdNamePicture } from '../../../../services/surveyStage'
import { useState } from 'react'
import { UpdateInterviewDto } from '../../../../services/interviewStage'
import UserPictureName from '../../../../components/UserPictureName'

interface Props {
  user: UserIdNamePicture | undefined
  opinion: string
  myId: string
  recruitId: string | undefined
  callback?: (value: UpdateInterviewDto) => void
  fieldImSetting: 'interviewer_review' | 'helper_1_review' | 'helper_2_review' | undefined
}

const ChosenUser = ({ user, opinion, myId, recruitId, callback, fieldImSetting }: Props) => {
  const [editingMode, setEditingMode] = useState(false)
  const [editingOpinionText, setEditingOpinionText] = useState(opinion ?? '')

  const handleSave = () => {
    setEditingMode(!editingMode)

    const myDto = {
      recruit_uuid: recruitId,
      ...(fieldImSetting ? { [fieldImSetting]: editingOpinionText } : null),
    } as UpdateInterviewDto

    callback?.(myDto)
  }

  const handleCancel = () => {
    setEditingOpinionText(opinion)
    setEditingMode(!editingMode)
  }

  return (
    <div style={{ margin: '0.25rem', minHeight: '2.5rem' }} onKeyDown={(e) => e.stopPropagation()}>
      {user && (
        <Box component="li" display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={0.5}>
          <UserPictureName picture={user.picture} name={user.name} />

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
              <>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="primary"
                  sx={{ color: '#eee', marginRight: '0.5rem' }}
                >
                  Zapisz
                </Button>
                <Button onClick={handleCancel} variant="contained" color="secondary" sx={{ color: '#eee' }}>
                  Anuluj
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}
      {!editingMode && (
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {editingOpinionText}
        </Typography>
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
