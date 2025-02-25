import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import UserInfoNoButtons from './UserInfoNoButtons'
import RoleButtonOwned from './RoleButtonOwned'
import RoleButtonNotOwned from './RoleButtonNotOwned'
import { useGetUsersWithTheirRolesQuery } from '../../../services/auth'
import { useHideForPresentation } from '../../../hooks/useHideForPresentation'

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
  const { data: allUsersWithTheirRoles, isLoading } = useGetUsersWithTheirRolesQuery()
  const isVisible = useHideForPresentation()

  return (
    <>
      {isVisible && <div>UsersWithTheirRoles</div>}
      <Typography variant="h3" component="h3">
        Role użytkowników
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Użytkownik</TableCell>
              <TableCell align="left">Posiadane role</TableCell>
              <TableCell align="left">Nie posiadane role</TableCell>
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
                      <RoleButtonOwned key={role.role} user={row} role={role.role} buttonsBlocked={isLoading} />
                    ))}
                  </TableCell>
                  <TableCell align="left">
                    {allRolesRoles
                      .filter((role) => !row.roles.map((role) => role.role).includes(role))
                      .map((role) => (
                        <RoleButtonNotOwned key={role} user={row} role={role} buttonsBlocked={isLoading} />
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
