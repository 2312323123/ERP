import { GoogleTokensInterface } from './hooks/auth/useGoogleAuth.interface'

export interface AppContextInterface {
  apiPathBase: string
  accessTokens: GoogleTokensInterface
  setAccessTokens: (tokens: GoogleTokensInterface) => void
  loggedIn: boolean
  setLoggedIn: (param: boolean) => void
}
