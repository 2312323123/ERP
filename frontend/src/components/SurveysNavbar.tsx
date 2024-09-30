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
import React from 'react'
import { Outlet } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/MoveToInbox' // Import InboxIcon
import MailIcon from '@mui/icons-material/Mail' // Import MailIcon
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
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

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
      <div>SurveysNavbar</div>
      <Outlet />

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
              oceniaczka - rekrutacja &lt;TODO:nazwa rekru&gt;
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
          <br />
          <Typography sx={{ marginBottom: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi
            tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id
            interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
            suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus
            vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt.
            Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur
            lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam
            dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
            lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
            accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
            aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default SurveysNavbar
