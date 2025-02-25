import { debounce } from '@mui/material'
import { useCallback, useRef } from 'react'

interface Props {
  outerDivRef: React.RefObject<HTMLDivElement>
  setShowEvaluateButton: React.Dispatch<React.SetStateAction<boolean>>
}

const useHandleResize = ({ outerDivRef, setShowEvaluateButton }: Props) => {
  // Initialize debounce once
  const debouncedResize = useRef(
    debounce((size: number) => {
      const isDesktopFromLocalCheck = window.innerWidth > 1024
      if (!isDesktopFromLocalCheck) {
        if (size && outerDivRef?.current?.offsetHeight) {
          setShowEvaluateButton(size > outerDivRef.current.offsetHeight * 0.6)
        }
      } else {
        if (size && outerDivRef?.current?.offsetWidth) {
          setShowEvaluateButton(size > outerDivRef.current.offsetWidth * 0.6)
        }
      }
    }, 50),
  )

  const handleResize = useCallback(
    (size: number) => {
      debouncedResize.current(size)
    },
    [], // No dependencies needed for debouncedResize, because it’s stored in a ref
  )

  return handleResize
}

export default useHandleResize
