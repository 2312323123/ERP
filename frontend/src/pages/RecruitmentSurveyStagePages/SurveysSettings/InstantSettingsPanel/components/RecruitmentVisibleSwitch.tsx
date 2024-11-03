import { Box, Typography, CircularProgress, Switch } from '@mui/material'
import useSetRecruitmentVisible from '../../../../../hooks/surveys/useSetRecruitmentVisible'
import { useGetRecruitmentVisibleQuery } from '../../../../../services/erp'

const RecruitmentVisibleSwitch = () => {
  const { data, error, isLoading: recruitmentVisibleIsLoading } = useGetRecruitmentVisibleQuery()

  const { isLoading, callback } = useSetRecruitmentVisible()

  const label = 'Użytkownicy systemu widzą rekrutację?'

  if (recruitmentVisibleIsLoading) {
    return (
      <Box my={3} display="flex" alignItems="center">
        <Typography variant="body1" mr={2}>
          {label}
        </Typography>

        <CircularProgress size={24} />
      </Box>
    )
  }

  return (
    <Box my={3} display="flex" alignItems="center">
      <Typography variant="body1" mr={2}>
        {label}
      </Typography>

      <Switch
        checked={data?.can_people_see_recruitment}
        onChange={() => callback(!data?.can_people_see_recruitment)}
        color="primary"
        disabled={isLoading || recruitmentVisibleIsLoading || !data}
      />
      <Typography variant="body1" ml={2}>
        {data?.can_people_see_recruitment ? 'TAK' : 'NIE'}
      </Typography>
    </Box>
  )
}

export default RecruitmentVisibleSwitch
