import { Typography } from '@mui/material'
import PostForm from './components/PostForm'

export const NewsletterMainPage = () => {
  return (
    <div>
      <PostForm />
      <Typography variant="h4" component="h1" sx={{ margin: '1rem' }}>
        Nadchodzące zadania
      </Typography>
    </div>
  )
}
