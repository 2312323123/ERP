import { Button } from '@mui/material'
import { AppContext } from '../../../App'
import { useContext } from 'react'
import axios from 'axios'
import { logNetworkSuccess } from '../../../utils/logNetworkSuccess'
import { logNetworkError, NetworkError } from '../../../utils/logNetworkError'
import { UserWithTheirRoles } from './UsersWithTheirRoles'

interface Props {
  user: UserWithTheirRoles
  role: string
  buttonsBlocked: boolean
  setButtonsBlocked: (value: boolean) => void
  refresh: () => void
}

const RoleButtonNotOwned = ({ user, role, buttonsBlocked, setButtonsBlocked, refresh }: Props) => {
  const { apiPathBase } = useContext(AppContext)
  const { id } = user

  const handleClick = async () => {
    try {
      setButtonsBlocked(true)
      const res = await axios.post(`${apiPathBase}/api/auth/give-role`, {
        userId: id,
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

  // const handleClick = async () => {
  //   console.log('id:')
  //   console.log(id)
  //   console.log('role:')
  //   console.log(role)
  // }

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
