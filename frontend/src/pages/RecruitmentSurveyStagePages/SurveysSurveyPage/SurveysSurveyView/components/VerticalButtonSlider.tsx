import DragHandleIcon from '@mui/icons-material/DragHandle'
import { IconButton } from '@mui/material'
import styles from './VerticalButtonSlider.module.css'

const VerticalSliderButton = () => {
  return (
    <div className={styles.iconButtonContainer}>
      <IconButton
        sx={{
          cursor: 'row-resize',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <DragHandleIcon sx={{ fontSize: '2rem' }} />
      </IconButton>
    </div>
  )
}

export default VerticalSliderButton
