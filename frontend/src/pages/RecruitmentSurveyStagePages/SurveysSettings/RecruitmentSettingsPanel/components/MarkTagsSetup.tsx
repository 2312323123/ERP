import { Box, Typography, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  getMark1Tag,
  getMark2Tag,
  getMark3Tag,
  getMark4Tag,
  getMark5Tag,
  setMark1Tag,
  setMark2Tag,
  setMark3Tag,
  setMark4Tag,
  setMark5Tag,
} from '../../../../../store/slices/surveyStage/surveySettingsPageSlice'
import { UnknownAction } from '@reduxjs/toolkit'

const MarkTagsSetup = () => {
  const mark1Tag = useSelector(getMark1Tag)
  const mark2Tag = useSelector(getMark2Tag)
  const mark3Tag = useSelector(getMark3Tag)
  const mark4Tag = useSelector(getMark4Tag)
  const mark5Tag = useSelector(getMark5Tag)

  const dispatch = useDispatch()

  const markXBox = (markNumber: number, markTag: string, setMarkTag: (payload: string) => UnknownAction) => (
    <Box display="flex" alignItems="center" mb={1}>
      <Typography variant="subtitle1">{markNumber} - </Typography>
      <TextField
        value={markTag}
        onChange={(e) => dispatch(setMarkTag(e.target.value))}
        variant="outlined"
        size="small"
        sx={{ marginLeft: 1, width: '175px' }} // Adjust width as needed
      />
    </Box>
  )

  return (
    <>
      {markXBox(1, mark1Tag, setMark1Tag)}
      {markXBox(2, mark2Tag, setMark2Tag)}
      {markXBox(3, mark3Tag, setMark3Tag)}
      {markXBox(4, mark4Tag, setMark4Tag)}
      {markXBox(5, mark5Tag, setMark5Tag)}
    </>
  )
}

export default MarkTagsSetup
