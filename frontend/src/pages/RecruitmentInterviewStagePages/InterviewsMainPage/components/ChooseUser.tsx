import { Autocomplete, TextField, Box, Typography, Avatar } from '@mui/material'
import { useState } from 'react'
import { UserIdNamePicture } from '../../../../services/surveyStage'
import { CreateInterviewDto } from '../../../../services/interviewStage'

interface Props {
  users: UserIdNamePicture[] | undefined
  initialId: string | undefined
  recruitId: string | undefined
  disabled?: boolean
  callback?: (value: CreateInterviewDto) => void
  fieldImSetting: 'recruit_uuid' | 'interviewer_uuid' | 'helper_1_uuid' | 'helper_2_uuid' | undefined
}

export const ChooseUser = ({ users, initialId, recruitId, disabled, callback, fieldImSetting }: Props) => {
  const [selectedOption, setSelectedOption] = useState<UserIdNamePicture | null>(
    users?.find((user) => user.id === initialId) ?? null,
  )

  const handleSelectionChange = (_: unknown, value: unknown) => {
    setSelectedOption(value as UserIdNamePicture)

    const myDto = {
      recruit_uuid: recruitId,
      ...(fieldImSetting ? { [fieldImSetting]: (value as UserIdNamePicture)?.id ?? null } : null),
    } as CreateInterviewDto

    callback?.(myDto)
  }

  return (
    <Autocomplete
      options={users ?? []}
      getOptionLabel={(option) => option.name}
      value={selectedOption}
      onChange={handleSelectionChange}
      disabled={disabled}
      renderInput={(params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {selectedOption && (
            <Avatar src={selectedOption.picture} alt={selectedOption.name} sx={{ width: 24, height: 24 }} />
          )}
          <TextField {...params} variant="outlined" placeholder="Select an option" />
        </Box>
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} display="flex" alignItems="center" gap={2}>
          <Avatar src={option.picture} alt={option.name} />
          <Box>
            <Typography variant="body1" color="text.primary">
              {option.name}
            </Typography>
          </Box>
        </Box>
      )}
      isOptionEqualToValue={(option, value) => option.name === value.name}
    />
  )
}
