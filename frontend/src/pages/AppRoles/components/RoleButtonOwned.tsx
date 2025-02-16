import { Button } from '@mui/material'
import { UserWithTheirRoles } from './UsersWithTheirRoles'
import useTakeAwayRole from '../../../hooks/roles/useTakeAwayRole'

interface Props {
  user: UserWithTheirRoles
  role: string
  buttonsBlocked: boolean
}

const RoleButtonOwned = ({ user, role, buttonsBlocked }: Props) => {
  const { id } = user
  const { isLoading, callback } = useTakeAwayRole(id, role)

  return (
    <Button
      sx={{ margin: '8px' }}
      variant="contained"
      color="primary"
      onClick={callback}
      disabled={buttonsBlocked || isLoading}
    >
      {role}
    </Button>
  )
}

export default RoleButtonOwned
