import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useSelector } from 'react-redux'
import { getId } from '../../../../store/slices/authSlice'
import UserPictureName from '../../../../components/UserPictureName'
import { useNewsletterImInterested } from '../../../../hooks/newsletter/useNewsletterImInterested'
import { ImportedTask } from '../../../../services/newsletter'
import { useNewsletterImNotInterested } from '../../../../hooks/newsletter/useNewsletterImNotInterested'

export const NewsletterAccordion = ({ data }: { data: ImportedTask[] }) => {
  const myId = useSelector(getId)
  const { interestedLoading, interested } = useNewsletterImInterested()
  const { notInterestedLoading, notInterested } = useNewsletterImNotInterested()

  const handleInterested = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, uuid: string) => {
    event.stopPropagation()
    interested(uuid)
  }

  const handleNotInterested = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, uuid: string) => {
    event.stopPropagation()
    notInterested(uuid)
  }

  return (
    <div>
      {data.map((item) => (
        <Accordion key={item.uuid}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.uuid}-content`}
            id={`${item.uuid}-header`}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                '@media (max-width:600px)': {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                },
              }}
            >
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Opis: {item.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Autor:
                  </Typography>
                  <UserPictureName userId={item.author_id} />
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Widoczne do: {new Date(item.visible_until).toLocaleString()}
                </Typography>
                {item.interested.length > 0 && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Zainteresowanych: {item.interested.length}
                  </Typography>
                )}
              </Box>

              {!item.interested.find((user) => user.user_id === myId) ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={(event) => handleInterested(event, item.uuid)}
                  sx={{ marginLeft: 2, paddingBlock: '0.5rem', paddingInline: '1rem' }}
                  disabled={interestedLoading || notInterestedLoading}
                >
                  Interesuje mnie to
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  onClick={(event) => handleNotInterested(event, item.uuid)}
                  sx={{ marginLeft: 2, paddingBlock: '0.5rem', paddingInline: '1rem', color: '#eee' }}
                  disabled={interestedLoading || notInterestedLoading}
                  color="secondary"
                >
                  Nie interesuje mnie to
                </Button>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Zainteresowani:</Typography>
            {item.interested.length > 0 ? (
              <ul>
                {item.interested.map((user, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <UserPictureName userId={user.user_id} />
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2">Nie ma zainteresowanych.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
