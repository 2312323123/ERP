import { useEffect, useState } from 'react'

export const useHideForPresentation = () => {
  const [isVisible, setIsVisible] = useState(window.innerWidth <= 200)

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth <= 200)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isVisible
}
