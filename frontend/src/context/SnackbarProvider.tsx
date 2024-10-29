import { createContext, ReactNode, useCallback, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

type SnackbarSeverity = 'error' | 'warning' | 'info' | 'success'
interface Props {
  children: ReactNode
}
interface SnackbarContextType {
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined)

export const SnackbarProvider: React.FC<Props> = ({ children }: Props) => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: SnackbarSeverity }>({
    open: false,
    message: 'dupa',
    severity: 'info', // Default severity
  })
  const [snackbarKey, setSnackbarKey] = useState(true)

  const showSnackbar = useCallback((message: string, severity: SnackbarSeverity = 'info') => {
    setSnackbar({ open: true, message, severity })
    setSnackbarKey((prevKey) => !prevKey) // Increment key to reset timer
  }, [])

  const closeSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        key={snackbarKey ? 1 : 0} // Changing key resets the timer
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <Alert severity={snackbar.severity} elevation={6} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
