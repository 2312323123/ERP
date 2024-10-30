import { Typography, Container, Divider, Button, CircularProgress } from '@mui/material'
import { useGetActiveRecruitmentQuery, useGetActiveRecruitmentSettingsQuery } from '../../../../services/erp'
import useDeleteRecruitment from '../../../../hooks/surveys/useDeleteRecruitment'

const DeleteRecruitmentPanel = () => {
  const {
    data: activeRecruitment,
    error: activeRecruitmentError,
    isLoading: activeRecruitmentIsLoading,
  } = useGetActiveRecruitmentQuery()
  const {
    data: activeRecruitmentSettings,
    error: activeRecruitmentSettingsError,
    isLoading: activeRecruitmentSettingsIsLoading,
  } = useGetActiveRecruitmentSettingsQuery(activeRecruitment?.uuid ?? '')

  const deleteActiveRecruitment = useDeleteRecruitment()

  const handleDeleteRecruitment = () => {
    const confirmDelete = window.confirm('Czy na pewno chcesz usunąć aktywną rekrutację?')

    if (confirmDelete) {
      deleteActiveRecruitment()
    }
  }

  return (
    <>
      {/* Info */}
      <Typography variant="h5" gutterBottom align="center">
        Poniższe można zrobić do momentu wpadnięcia pierwszej ankietki. (czyli{' '}
        {activeRecruitmentSettings ? (
          activeRecruitmentSettings.isThereAnySurvey ? (
            'już nie można'
          ) : (
            'jeszcze można'
          )
        ) : (
          <CircularProgress size={20} />
        )}
        ):
      </Typography>

      {/* Settings until the first survey section */}
      <Container maxWidth="md" sx={{ mb: 2 }}>
        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Button to delete a recruitment */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteRecruitment}
          style={{ marginTop: '16px', color: 'white', padding: '1rem 2rem', fontSize: '1rem' }}
          disabled={activeRecruitmentSettings?.isThereAnySurvey ?? true}
        >
          Usuń rekrutację (działa natychmiastowo)
        </Button>
      </Container>
    </>
  )
}

export default DeleteRecruitmentPanel
