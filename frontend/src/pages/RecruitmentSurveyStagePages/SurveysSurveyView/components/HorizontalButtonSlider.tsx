import DragHandleIcon from '@mui/icons-material/DragHandle'
import { IconButton } from '@mui/material'
import styles from './HorizontalButtonSlider.module.css'

const HorizontalButtonSlider = () => {
  return (
    <div className={styles.iconButtonContainer}>
      <IconButton
        sx={{
          cursor: 'column-resize',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          transform: 'rotate(90deg)',
        }}
      >
        <DragHandleIcon sx={{ fontSize: '2rem' }} />
      </IconButton>
    </div>
  )
}

export default HorizontalButtonSlider
