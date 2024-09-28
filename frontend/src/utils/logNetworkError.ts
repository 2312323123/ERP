interface NetworkError extends Error {
  response?: {
    status: number
    data: any
    statusText: string
  }
  message: string
}

export const logNetworkError = (error: NetworkError, prefix?: string): void => {
  console.error('---------------------------------------------------')
  console.error(`${prefix ? `${prefix} - ` : ''}An error occurred:`)

  // Check if error contains a response (useful for Axios-like errors)
  if (error.response) {
    console.error('Error Message:', error.message)
    console.error('Status Code:', error.response.status, error.response.statusText)
    console.error('Response Data:', error.response.data)
    console.error('Full Error Response:', error.response)
  }
  // Fetch API style errors or generic JS errors
  else if (error.message) {
    console.error('Error Message:', error.message)
    console.error('Full Error:', error)
  }
  // Handle any other possible errors
  else {
    console.error('An unknown error occurred:', error)
  }
}
