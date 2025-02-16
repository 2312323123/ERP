import { Button } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'

interface Props {
  onClick: () => void
}

const OpenEvaluationButton = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 30,
        borderRadius: '8px', // Rounded corners
        padding: '8px 16px', // Padding to make it wider and more button-like
        boxShadow: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1rem',
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
        zIndex: 1,
      }}
    >
      <RateReviewIcon sx={{ fontSize: '1.5rem', mr: 1 }} />
      <span style={{ fontSize: '1rem' }}>Oceń</span>
    </Button>
  )
}

export default OpenEvaluationButton
