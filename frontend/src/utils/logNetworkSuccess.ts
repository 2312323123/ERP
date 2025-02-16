interface NetworkSuccess {
  data?: object
  status: number
  statusText: string
}

export const logNetworkSuccess = (res: NetworkSuccess, prefix?: string): void => {
  console.log('---------------------------------------------------')
  console.log(`${prefix ? `${prefix} - ` : ''}Network call success:`)

  console.log('Status:', res.status, res.statusText)
  if (res.data) {
    console.log('Response Data:', res.data)
  }
}
