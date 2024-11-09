import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLoggedIn } from '../store/slices/authSlice'
import useLogout from '../hooks/auth/useLogout'

const Navbar: React.FC = () => {
  const loggedIn = useSelector(getLoggedIn)
  const logout = useLogout()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!loggedIn) {
      event.preventDefault() // Block the link navigation
      alert('Navigation is blocked')
    }
  }

  return (
    <div>
      <Link onClick={handleClick} to="/">
        Home
      </Link>
      <Link onClick={handleClick} to="/other-page">
        Other page
      </Link>
      {!loggedIn ? <Link to="/login">Login</Link> : <span onClick={logout}>Logout</span>}
      <Outlet />
    </div>
  )
}

export default Navbar
