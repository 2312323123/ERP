import { Accordion, AccordionSummary, Typography, AccordionDetails, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useGetUsersIdsNamesPicturesQuery } from '../../../../../services/interviewStage'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedUsers, setSelectedUsers } from '../../../../../store/slices/availabilitySlice'
import UserSelect from './components/UserSelect'
import { UserIdNamePicture } from '../../../../../services/surveyStage'

export const AvailabilityUserSelector = () => {
  const { data: usersArray } = useGetUsersIdsNamesPicturesQuery()
  const selectedUsers = useSelector(getSelectedUsers)
  const dispatch = useDispatch()

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Osoby</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" flexDirection="row" width="100%">
          {/* Left Column */}
          <Box flex={1} pr={2}>
            <Typography variant="body1">Uwzględnione</Typography>
            {usersArray &&
              selectedUsers.map((id) => (
                <UserSelect
                  key={id}
                  user={usersArray.find((user) => user.id === id) as UserIdNamePicture}
                  callback={() => dispatch(setSelectedUsers(selectedUsers.filter((el) => el !== id)))}
                  isSelected={true}
                />
              ))}
          </Box>
          {/* Right Column */}
          <Box flex={1} pl={2}>
            <Typography variant="body1">Nie uwzględnione</Typography>
            {usersArray &&
              usersArray
                .filter((el) => !selectedUsers.includes(el.id))
                .map(({ id }) => (
                  <UserSelect
                    key={id}
                    user={usersArray.find((user) => user.id === id) as UserIdNamePicture}
                    callback={() => dispatch(setSelectedUsers([...selectedUsers, id]))}
                    isSelected={false}
                  />
                ))}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
