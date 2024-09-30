import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { router } from '../../router'
import { logNetworkSuccess } from '../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../utils/logNetworkError'
import axios from 'axios'
import { AppContext } from '../../App'
import RolesTable from './components/RolesTable'
import AccountCreationRequests from './components/AccountCreationRequests'
import UsersWithTheirRoles from './components/UsersWithTheirRoles'

const AppRoles = () => {
  const { apiPathBase } = useContext(AppContext)

  // [{role, description}, ...]
  const [allRoles, setAllRoles] = useState<{ role: string; description: string }[]>([])

  // give Dwaciek superadmin
  const giveDwaciekSuperadmin = async () => {
    try {
      const res = await axios.post(`${apiPathBase}/api/auth/give-dwaciek-superadmin`)
      logNetworkSuccess(res, 'e57ue44')
    } catch (error) {
      logNetworkError(error as NetworkError, '3r4ty76')
    }
  }

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
