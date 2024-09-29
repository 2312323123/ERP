import { useContext } from 'react'
import { AppContext } from '../App'

const Home = () => {
  const { refreshAccessToken, accessTokens } = useContext(AppContext)

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={refreshAccessToken}>refresh access token</button>
      <button onClick={() => console.log(accessTokens)}>log access tokens</button>
    </>
  )
}

export default Home
