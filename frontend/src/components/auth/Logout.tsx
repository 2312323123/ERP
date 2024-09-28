import { useContext } from 'react'
import { AppContext } from '../../App'

const Logout = () => {
  // component's goal is to ask api for logout, and if there's error, alert, if not, set logged in to false
  const { apiPathBase, accessTokens, setAccessTokens, setLoggedIn } = useContext(AppContext)

  const askApiForLogout = async () => {
    // try {
    //   await axios.post(`${apiPathBase}/api/auth/logout`, {
    //     refresh_token: accessTokens.refresh_token,
    //   })
    // } catch (error) {
    //   console.log(error)
    //   alert('Error logging out')
  }

  const setLoggedOut = () => {
    setLoggedIn(false)
  }

  const logOutAction = async () => {
    try {
      await askApiForLogout()
      setLoggedOut()
    } catch (error) {
      alert('Error logging out')
      console.log(error)
    }
  }

  return <button onClick={logOutAction}>Logout</button>
}

export default Logout
