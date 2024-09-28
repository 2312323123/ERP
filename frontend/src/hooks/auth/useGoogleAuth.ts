import { AppContextInterface } from '../../App.interface'

export const useGoogleAuth = () => {
  const initialValue: AppContextInterface = {
    apiPathBase: '',
    accessTokens: {
      access_token: '',
      id_token: '',
      refresh_token: '',
      expiry_date: 0,
    },
    setAccessTokens: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
  }

  

  return initialValue
}
