import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'

interface Props {
  onClick: () => void
}

const FloatingCloseButton = ({ onClick }: Props) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label="close"
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}

export default FloatingCloseButton
