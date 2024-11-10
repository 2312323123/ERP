import { useEffect } from 'react'

const useBlockPullToRefreshMobile = () => {
  // blocks pull-to-refresh on mobile
  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches[0].clientY > 0) {
        e.preventDefault()
      }
    }
    // Add touchmove listener to prevent pull-to-refresh
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false })
    // Clean up the listener on component unmount
    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh)
    }
  }, [])
}

export default useBlockPullToRefreshMobile
