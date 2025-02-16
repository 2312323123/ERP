import { useGoogleLogin } from '@react-oauth/google'

export const useGoogleAuth = (callback: (arg: string) => void) => {
  const getAndProcessGoogleLoginOtpCode = useGoogleLogin({
    onSuccess: ({ code }) => callback(code),
    flow: 'auth-code',
  })

  return { getAndProcessGoogleLoginOtpCode }
}
