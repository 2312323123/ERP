import { Button } from '@mui/material'
import axios from 'axios'
import { logNetworkSuccess } from '../../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../../utils/logNetworkError'
import { UserWithTheirRoles } from './UsersWithTheirRoles'
import { apiPathBase } from '../../../config/constants'

interface Props {
  user: UserWithTheirRoles
  role: string
  buttonsBlocked: boolean
  setButtonsBlocked: (value: boolean) => void
  refresh: () => void
}

const RoleButtonNotOwned = ({ user, role, buttonsBlocked, setButtonsBlocked, refresh }: Props) => {
  const { id } = user

  const handleClick = async () => {
    try {
      setButtonsBlocked(true)
      const res = await axios.post(`${apiPathBase}/api/auth/give-role`, {
        id,
        role,
      })
      logNetworkSuccess(res, 'r46y7ut4')
      refresh()
    } catch (error) {
      logNetworkError(error as NetworkError, 'u67y4r4r3')
      alert('uh oh u67y4r4r3')
      setButtonsBlocked(false)
    }
  }

  return (
    <Button
      sx={{ margin: '8px' }}
      variant="contained"
      color="secondary"
      onClick={() => handleClick()}
      disabled={buttonsBlocked}
    >
      {role}
    </Button>
  )
}

export default RoleButtonNotOwned
