import { Box, Button } from '@mui/material'
import { router } from '../../router'
import RolesTable from './components/RolesTable'
import AccountCreationRequests from './components/AccountCreationRequests'
import UsersWithTheirRoles from './components/UsersWithTheirRoles'
import { useGetAllRolesQuery } from '../../services/auth'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useHideForPresentation } from '../../hooks/useHideForPresentation'

const AppRoles = () => {
  // [{role, description}, ...]
  const { data: allRoles, error, isLoading } = useGetAllRolesQuery()
  const isVisible = useHideForPresentation()

  if (error) {
    if ((error as FetchBaseQueryError).status === 401) {
      return (
        <>
          <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
            Wróć na stronę główną
          </Button>
          <div>Forbidden</div>
        </>
      )
    } else {
      return (
        <>
          <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
            Wróć na stronę główną
          </Button>
          <div>Error:</div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box m={3}>
      <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
        Wróć na stronę główną
      </Button>
      <br />
      <br />
      {isVisible && <div>AppRoles</div>}
      {allRoles && <RolesTable allRoles={allRoles} />}
      <Box my={2} /> {/* Spacer with margin on the y-axis */}
      <AccountCreationRequests />
      <Box my={2} /> {/* Spacer with margin on the y-axis */}
      {allRoles && <UsersWithTheirRoles allRolesRoles={allRoles.map((role) => role.role)} />}
    </Box>
  )
}

export default AppRoles
