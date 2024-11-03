import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import UserInfo from './UserInfo'
import { useGetAccountCreationRequestsQuery } from '../../../services/auth'

export interface AccountCreationRequest {
  email: string
  email_verified: true
  family_name: string
  given_name: string
  id: string
  name: string
  picture: string
}

const AccountCreationRequests = () => {
  // [{role, description}, ...]
  const { data: allAccountCreationRequests, error, isLoading } = useGetAccountCreationRequestsQuery()

  return (
    <>
      <div>AccountCreationRequests</div>
      <Typography variant="h3" component="h3">
        Prośby o wstęp
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAccountCreationRequests &&
              allAccountCreationRequests.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <UserInfo user={row} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AccountCreationRequests
