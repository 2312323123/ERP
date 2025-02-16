import { Button } from '@mui/material'
import { UserWithTheirRoles } from './UsersWithTheirRoles'
import useGiveRole from '../../../hooks/roles/useGiveRole'

interface Props {
  user: UserWithTheirRoles
  role: string
  buttonsBlocked: boolean
}

const RoleButtonNotOwned = ({ user, role, buttonsBlocked }: Props) => {
  const { id } = user
  const { isLoading, callback } = useGiveRole(id, role)

  return (
    <Button
      sx={{ margin: '8px' }}
      variant="contained"
      color="secondary"
      onClick={callback}
      disabled={buttonsBlocked || isLoading}
    >
      {role}
    </Button>
  )
}

export default RoleButtonNotOwned
