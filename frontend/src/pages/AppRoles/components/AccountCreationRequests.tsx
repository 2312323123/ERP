import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { logNetworkSuccess } from '../../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../../utils/logNetworkError'
import axios from 'axios'
import UserInfo from './UserInfo'
import { apiPathBase } from '../../../config/constants'

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
  const [allAccountCreationRequests, setAccountCreationRequests] = useState<AccountCreationRequest[]>()

  const refresh = useCallback(() => {
    // get all roles
    const getAllRoles = async () => {
      try {
        const res = await axios.get(`${apiPathBase}/api/auth/get-account-creation-requests`)
        logNetworkSuccess(res, 'i7u6yt54')
        setAccountCreationRequests(res.data)
      } catch (error) {
        logNetworkError(error as NetworkError, 'e458i54r')
      }
    }

    getAllRoles()
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

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
                    <UserInfo user={row} refresh={refresh} />
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
