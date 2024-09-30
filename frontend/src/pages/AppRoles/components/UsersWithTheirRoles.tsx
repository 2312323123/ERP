import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react'
import { logNetworkSuccess } from '../../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../../utils/logNetworkError'
import axios from 'axios'
import { AppContext } from '../../../App'
import UserInfoNoButtons from './UserInfoNoButtons'
import RoleButtonOwned from './RoleButtonOwned'
import RoleButtonNotOwned from './RoleButtonNotOwned'

export interface UserWithTheirRoles {
  createdAt: string
  email: string
  email_verified: true
  family_name: string
  given_name: string
  id: string
  name: string
  picture: string
  roles: Array<{ role: string; description: string }>
}

const UsersWithTheirRoles = ({ allRolesRoles }: { allRolesRoles: string[] }) => {
  const { apiPathBase } = useContext(AppContext)
  const [buttonsBlocked, setButtonsBlocked] = useState(false)

  // [{role, description}, ...]
  const [allUsersWithTheirRoles, setAllUsersWithTheirRoles] = useState<UserWithTheirRoles[]>()

  const refresh = useCallback(() => {
    // get all roles
    const getAllRoles = async () => {
      try {
        const res = await axios.get(`${apiPathBase}/api/auth/get-users-with-their-roles`)
        logNetworkSuccess(res, 'e47tr3e9')
        setAllUsersWithTheirRoles(res.data)
        setButtonsBlocked(false)
      } catch (error) {
        logNetworkError(error as NetworkError, 'i8t54t54')
      }
    }

    getAllRoles()
  }, [apiPathBase])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <>
      <div>UsersWithTheirRoles</div>
      <Typography variant="h3" component="h3">
        Role użytkowników
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request</TableCell>
              <TableCell align="left">Owned roles</TableCell>
              <TableCell align="left">Not owned roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsersWithTheirRoles &&
              allUsersWithTheirRoles.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <UserInfoNoButtons user={row} />
                  </TableCell>
                  <TableCell align="left">
                    {row.roles.map((role) => (
                      <RoleButtonOwned
                        user={row}
                        role={role.role}
                        buttonsBlocked={buttonsBlocked}
                        setButtonsBlocked={setButtonsBlocked}
                        refresh={refresh}
                      />
                    ))}
                  </TableCell>
                  <TableCell align="left">
                    {allRolesRoles
                      .filter((role) => !row.roles.map((role) => role.role).includes(role))
                      .map((role) => (
                        <RoleButtonNotOwned
                          user={row}
                          role={role}
                          buttonsBlocked={buttonsBlocked}
                          setButtonsBlocked={setButtonsBlocked}
                          refresh={refresh}
                        />
                      ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersWithTheirRoles
