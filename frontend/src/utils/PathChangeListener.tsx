import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const PathChangeListener = () => {
  const location = useLocation()

  useEffect(() => {
    // This code will run every time the path changes
    console.log('Path changed to:', location.pathname)

    // Example: Call your custom function here
    handlePathChange()
  }, [location.pathname]) // Runs when location.pathname changes

  const handlePathChange = () => {
    // Your custom logic here
    // console.log('Do something on path change')
    // TOOD: in the future if not logged in, redirect to login page (hopefully won't loop infinitely (then add exception))
  }

  return <Outlet /> // This component doesn't render anything
}

export default PathChangeListener
