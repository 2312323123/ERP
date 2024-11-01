import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { router } from '../../router'
import RolesTable from './components/RolesTable'
import AccountCreationRequests from './components/AccountCreationRequests'
import UsersWithTheirRoles from './components/UsersWithTheirRoles'

const AppRoles = () => {
  // [{role, description}, ...]
  const [allRoles, setAllRoles] = useState<{ role: string; description: string }[]>([])

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => router.navigate('/home')}>
        Back to Home
      </Button>
      <br />
      <br />
      <div>AppRoles</div>
      <RolesTable allRoles={allRoles} setAllRoles={setAllRoles} />
      <Box my={2} /> {/* Spacer with margin on the y-axis */}
      <AccountCreationRequests />
      <Box my={2} /> {/* Spacer with margin on the y-axis */}
      <UsersWithTheirRoles allRolesRoles={allRoles.map((role) => role.role)} />
    </>
  )
}

export default AppRoles
