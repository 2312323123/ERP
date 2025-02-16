import { FormControlLabel, Checkbox } from '@mui/material'
import CopyFromSelectField from './CopyFromSelectField'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCopyingSettingsFromOtherRecruitment,
  setCopyingSettingsFromOtherRecruitment,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'

interface Props {
  isFirstRecruitment?: boolean
}

const CopyFrom = ({ isFirstRecruitment }: Props) => {
  const dispatch = useDispatch()
  const copyingSettingsFromOtherRecruitment = useSelector(getCopyingSettingsFromOtherRecruitment)

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCopyingSettingsFromOtherRecruitment(event.target.checked))
  }

  if (isFirstRecruitment) {
    return null
  }

  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={copyingSettingsFromOtherRecruitment} onChange={handleCheckedChange} />}
        label={<span style={{ userSelect: 'none' }}>Skopiuj ustawienia z istniejącej rekrutacji</span>}
      />
      {copyingSettingsFromOtherRecruitment && <CopyFromSelectField />}
    </>
  )
}

export default CopyFrom
