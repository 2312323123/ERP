import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useGetActiveRecruitmentQuery, useGetAllRecruitmentsQuery } from '../../../../../services/erp'
import {
  getRecruitmentToCopyFrom,
  setRecruitmentToCopyFrom,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'

const CopyFromSelectField = () => {
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()

  const { data: recruitments, error } = useGetAllRecruitmentsQuery()
  const dispatch = useDispatch()
  const recruitmentToCopyFrom = useSelector(getRecruitmentToCopyFrom)

  const handleSelect = (value: string) => {
    dispatch(setRecruitmentToCopyFrom(value))
  }

  // if some is in selected, do nothing
  // else if there is active recruitemnt, select it
  // else select the most recent one
  useLayoutEffect(() => {
    if (!recruitmentToCopyFrom && recruitments) {
      if (activeRecruitment) {
        dispatch(setRecruitmentToCopyFrom(activeRecruitment.uuid))
      } else {
        dispatch(setRecruitmentToCopyFrom(recruitments[0].uuid))
      }
    }
  }, [activeRecruitment, dispatch, recruitmentToCopyFrom, recruitments])

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>Utwórz na podstawie:</InputLabel>
      <Select value={recruitmentToCopyFrom} onChange={(e) => handleSelect(e.target.value)} label="Skopiuj ustawienia z">
        {recruitments?.map((recruitment) => (
          <MenuItem key={recruitment.uuid} value={recruitment.uuid}>
            {recruitment.name} - utworzono: {new Date(recruitment.startDate).toLocaleDateString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CopyFromSelectField
