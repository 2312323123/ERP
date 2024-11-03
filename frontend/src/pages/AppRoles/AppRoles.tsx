import { Box, Button } from '@mui/material'
import { router } from '../../router'
import RolesTable from './components/RolesTable'
import AccountCreationRequests from './components/AccountCreationRequests'
import UsersWithTheirRoles from './components/UsersWithTheirRoles'
import { useGetAllRolesQuery } from '../../services/auth'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const AppRoles = () => {
  // [{role, description}, ...]
  const { data: allRoles, error, isLoading } = useGetAllRolesQuery()

  if (error) {
    if ((error as FetchBaseQueryError).status === 401) {
      return (
        <>
          <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
            Back to Home
          </Button>
          <div>Forbidden</div>
        </>
      )
    } else {
      return (
        <>
          <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
            Back to Home
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
    <>
      <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
        Back to Home
      </Button>
      <br />
      <br />
      <div>AppRoles</div>
      {allRoles && <RolesTable allRoles={allRoles} />}
      <Box my={2} /> {/* Spacer with margin on the y-axis */}
      <AccountCreationRequests />
      <Box my={2} /> {/* Spacer with margin on the y-axis */}
      {allRoles && <UsersWithTheirRoles allRolesRoles={allRoles.map((role) => role.role)} />}
    </>
  )
}

export default AppRoles
