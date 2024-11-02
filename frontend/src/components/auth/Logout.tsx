import useLogout from '../../hooks/auth/useLogout'

interface Props {
  children?: React.ReactNode
}

const Logout = ({ children }: Props) => {
  const logout = useLogout()

  return <span onClick={logout}>{children ? children : 'Logout'}</span>
}

export default Logout
