import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

interface Props {
  path?: string
  action?: () => void
  iconElement: JSX.Element
  text: string
}

const SurveysNavbarButton = ({ path, action, iconElement, text }: Props) => {
  if (path) {
    return (
      <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{iconElement}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </Link>
    )
  }

  if (action) {
    return (
      <ListItem disablePadding>
        <ListItemButton onClick={action}>
          <ListItemIcon>{iconElement}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    )
  }

  return <>wrong usage of button, you have to define path / action</>
}

export default SurveysNavbarButton
