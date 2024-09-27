export interface AccessTokens {
  id_token: string
  refresh_token: string
  expiry_date: number
}

export interface AppContextInterface {
  apiPathBase: string
  accessTokens: AccessTokens
  setAccessTokens: (tokens: AccessTokens) => void
  loggedIn: boolean
  setLoggedIn: (param: boolean) => void
}
