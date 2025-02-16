import {
  IsSomeoneInTheOfficeState,
  useIsSomeoneInTheOffice,
} from '../../../hooks/isSomeoneInTheOffice/useIsSomeoneInTheOffice'
import { Box, Typography, Button, Paper } from '@mui/material'

const statusLabels: Record<IsSomeoneInTheOfficeState, string> = {
  loading: 'ładowanie',
  error: 'błąd',
  yes: 'tak, jest',
  no: 'nie ma',
  unknown: 'nieznany',
}

const statusColors: Record<IsSomeoneInTheOfficeState, string> = {
  loading: '#ffe082',
  error: '#ef9a9a',
  yes: '#a5d6a7',
  no: '#90caf9',
  unknown: '#eeeeee',
}

export const OfficeStatusPanel: React.FC = () => {
  const { isSomeoneInTheOfficeState: status, loggedRefetch: onRefresh } = useIsSomeoneInTheOffice()

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 300,
        textAlign: 'center',
        borderRadius: 2,
        backgroundColor: statusColors[status],
        boxShadow: 2,
        width: '80%',
        justifySelf: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Czy jest ktoś w biurze?
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body1">Status:</Typography>
        <Typography variant="body1" color="text.secondary">
          {statusLabels[status]}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={onRefresh} sx={{ mt: 2 }}>
        Odśwież
      </Button>
    </Paper>
  )
}
