import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect } from 'react'
import { logNetworkSuccess } from '../../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../../utils/logNetworkError'
import axios from 'axios'
import { apiPathBase } from '../../../config/constants'

interface Props {
  allRoles: { role: string; description: string }[]
  setAllRoles: (value: { role: string; description: string }[]) => void
}

const RolesTable = ({ allRoles, setAllRoles }: Props) => {
  useEffect(() => {
    // get all roles
    const getAllRoles = async () => {
      try {
        const res = await axios.get(`${apiPathBase}/api/auth/get-all-roles`)
        logNetworkSuccess(res, '67u786y')
        setAllRoles(res.data)
      } catch (error) {
        logNetworkError(error as NetworkError, '3r4ty76')
      }
    }

    getAllRoles()
  }, [setAllRoles])

  return (
    <>
      <Typography variant="h3" component="h3">
        Role
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>some bs column</TableCell>
              <TableCell align="right">role</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRoles &&
              allRoles.map((row) => (
                <TableRow key={row.role}>
                  <TableCell component="th" scope="row">
                    {row.role}
                  </TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default RolesTable
