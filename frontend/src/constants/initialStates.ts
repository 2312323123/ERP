export interface AccessTokensInterface {
  accessToken: string
  refreshToken: string
  accessTokenExp: number
}

export interface AppContextInterface {
  apiPathBase: string
  accessTokens: AccessTokensInterface
  setAccessTokens: (tokens: AccessTokensInterface) => void
  loggedIn: boolean
  setLoggedIn: (param: boolean) => void
  refreshAccessToken: () => Promise<void>
}

// here for hmr purposes
export const initialAppAccessTokensValue: AccessTokensInterface = {
  accessToken: '',
  refreshToken: '',
  accessTokenExp: 0,
}

export const initialAppContextValue: AppContextInterface = {
  apiPathBase: '',
  accessTokens: initialAppAccessTokensValue,
  setAccessTokens: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
  refreshAccessToken: async () => {},
}
