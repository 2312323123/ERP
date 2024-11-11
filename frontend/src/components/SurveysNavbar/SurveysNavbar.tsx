import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu' // Import MenuIcon
import bestLogoWhite from '../../assets/best-logo-white.svg'
import { Home, Logout } from '@mui/icons-material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import HelpIcon from '@mui/icons-material/Help'
import FeedbackIcon from '@mui/icons-material/Feedback'
import SettingsIcon from '@mui/icons-material/Settings'
import { useGetActiveRecruitmentQuery } from '../../services/erp'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import SurveysNavbarButton from './SurveysNavbarButton'
import useLogout from '../../hooks/auth/useLogout'
import useGoToUnevaluatedSurvey from '../../hooks/surveys/useGoToUnevaluatedSurvey'

const drawerWidth = 240

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window
}

const SurveysNavbar = (props: Props) => {
  // Mui Responsive drawer & React Router Outlet

  const { window } = props
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleDrawerClose = () => {
    setIsClosing(true)
    setMobileOpen(false)
  }

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false)
  }

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen)
    }
  }

  const { data: activeRecruitment } = useGetActiveRecruitmentQuery()
  const logout = useLogout()
  const evaluateClick = useGoToUnevaluatedSurvey()

  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: 'primary.main', justifyContent: 'center' }}>
        <div style={{ maxWidth: '100%', height: '3.6em' }}>
          <img style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} src={bestLogoWhite} />
        </div>
      </Toolbar>
      <Divider />
      {/* TODO: User icon + role shall go here */}
      <List>
        <SurveysNavbarButton action={() => evaluateClick()} text="Oceniam" iconElement={<FactCheckIcon />} />
        <SurveysNavbarButton path="/recrutiment-survey-stage/app/help" text="Jak oceniać" iconElement={<HelpIcon />} />
        <SurveysNavbarButton
          path="/recrutiment-survey-stage/app/surveys"
          text="Ankiety"
          iconElement={<AssignmentIcon />}
        />
        <SurveysNavbarButton
          path="/recrutiment-survey-stage/app/dashboard"
          text="Statystyki"
          iconElement={<DashboardIcon />}
        />
        <SurveysNavbarButton
          path="/recrutiment-survey-stage/app/feedback"
          text="Feedback"
          iconElement={<FeedbackIcon />}
        />
        <SurveysNavbarButton
          path="/recrutiment-survey-stage/app/settings"
          text="Ustawienia"
          iconElement={<SettingsIcon />}
        />
      </List>
      <Divider />
      <List>
        <SurveysNavbarButton path="/home" text="Wróć do panelu głównego" iconElement={<Home />} />
        <SurveysNavbarButton action={logout} text="Wyloguj" iconElement={<Logout />} />
      </List>
    </div>
  )

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              oceniaczka - rekrutacja {activeRecruitment?.name ?? '- brak rekrutacji w systemie!'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default SurveysNavbar
