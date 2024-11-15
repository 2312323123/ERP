import React, { ReactNode } from 'react'
import { useGetRecruitmentVisibleQuery } from '../../services/erp'
import { Alert, Box } from '@mui/material'
import { getRoles } from '../../store/slices/authSlice'
import { useSelector } from 'react-redux'

interface MyComponentProps {
  children: ReactNode
}

export const NotShowRecruitmentIfSetNotTo: React.FC<MyComponentProps> = ({ children }) => {
  const { data, isLoading } = useGetRecruitmentVisibleQuery()
  const roles = useSelector(getRoles)

  if (!data || isLoading) {
    return null
  }

  if (!data.can_people_see_recruitment && !roles.includes('RECRUITMENT_ADMIN')) {
    return (
      <Box sx={{ marginBottom: 2 }}>
        <Alert severity="info" sx={{ width: '100%' }}>
          Wyświetlanie rekrutacji zostało wyłączone przez administratora rekrutacji.
        </Alert>
      </Box>
    )
  }

  return children
}
