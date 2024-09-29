import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AppContext } from '../App'
import Logout from './auth/Logout'

const Navbar: React.FC = () => {
  const { loggedIn } = useContext(AppContext)

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
