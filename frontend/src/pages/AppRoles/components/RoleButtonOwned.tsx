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

const RoleButtonOwned = ({ user, role, buttonsBlocked, setButtonsBlocked, refresh }: Props) => {
  const { id } = user

  const handleClick = async () => {
    try {
      setButtonsBlocked(true)
      const res = await axios.post(`${apiPathBase}/api/auth/take-away-role`, {
        id,
        role,
      })
      logNetworkSuccess(res, 'u65r4e3')
      refresh()
    } catch (error) {
      logNetworkError(error as NetworkError, 'ty65r34r4r')
      alert('uh oh ty65r34r4r')
      setButtonsBlocked(false)
    }
  }

  return (
    <Button
      sx={{ margin: '8px' }}
      variant="contained"
      color="primary"
      onClick={() => handleClick()}
      disabled={buttonsBlocked}
    >
      {role}
    </Button>
  )
}

export default RoleButtonOwned
