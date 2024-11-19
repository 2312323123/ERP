import { Box, Typography } from '@mui/material'
import PostForm from './components/PostForm'
import { NewsletterAccordion } from './components/NewsletterAccordion'
import { useGetTasksQuery } from '../../../services/newsletter'

export const NewsletterMainPage = () => {
  const { data } = useGetTasksQuery()

  return (
    <div>
      <PostForm />
      <Typography variant="h4" component="h1" sx={{ margin: '1rem' }}>
        Nadchodzące zadania
      </Typography>
      {data ? <NewsletterAccordion data={data} /> : <Typography>Brak zadań</Typography>}
      <Box sx={{ height: '50vh' }} />
    </div>
  )
}
