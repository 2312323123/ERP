import { Link, Outlet } from 'react-router-dom'
import Logout from './auth/Logout'
import { useSelector } from 'react-redux'
import { getLoggedIn } from '../store/slices/authSlice'

const Navbar: React.FC = () => {
  const loggedIn = useSelector(getLoggedIn)

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
      {!loggedIn ? <Link to="/login">Login</Link> : <Logout />}
      <Outlet />
    </div>
  )
}

export default Navbar
