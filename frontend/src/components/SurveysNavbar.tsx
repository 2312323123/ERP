import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu' // Import MenuIcon
import bestLogoWhite from '../assets/best-logo-white.svg'
import LogoutButton from './auth/Logout'
import { Home, Logout } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import StarsIcon from '@mui/icons-material/Stars'
import HelpIcon from '@mui/icons-material/Help'
import FeedbackIcon from '@mui/icons-material/Feedback'
import SettingsIcon from '@mui/icons-material/Settings'
import { useGetActiveRecruitmentQuery } from '../services/erp'

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
        <Link to="/recrutiment-survey-stage/app/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Panel'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/recrutiment-survey-stage/app/surveys" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={'Ankiety'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/recrutiment-survey-stage/app/ranks" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary={'Ranking'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/recrutiment-survey-stage/app/help" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary={'Jak oceniać'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/recrutiment-survey-stage/app/feedback" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FeedbackIcon />
              </ListItemIcon>
              <ListItemText primary={'Feedback'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/recrutiment-survey-stage/app/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Ustawienia'} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={'Wróć do panelu głównego'} />
            </ListItemButton>
          </ListItem>
        </Link>
        <LogoutButton>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={'Wyloguj'} />
            </ListItemButton>
          </ListItem>
        </LogoutButton>
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
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

export default SurveysNavbar
