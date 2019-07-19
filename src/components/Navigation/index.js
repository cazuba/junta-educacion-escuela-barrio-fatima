import React, { useState } from 'react'
import { func } from 'prop-types'
import { Link, navigate } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: 'inherit',
    flexGrow: 1,
    textDecoration: 'none'
  }
}))

const handleMenu = cb => event => {
  cb(event.currentTarget)
}

const handleClose = (link = '', cb = () => null) => () => {
  link && navigate(link)
  cb(null)
}

export default function Navigation({ handleOpenDrawer }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={handleOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            <Typography variant="h6">
              Junta Educación de la Escuela Barrio de Fatima
            </Typography>
          </Link>
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu(setAnchorEl)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose(null, setAnchorEl)}
            >
              <MenuItem onClick={handleClose('/account/general', setAnchorEl)}>
                Perfil
              </MenuItem>
              <MenuItem onClick={handleClose('/account/security', setAnchorEl)}>
                Cambiar contraseña
              </MenuItem>
              <MenuItem onClick={handleClose('/logout', setAnchorEl)}>
                Salir
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navigation.propTypes = {
  handleOpenDrawer: func
}

Navigation.defaultProps = {
  handleOpenDrawer: () => null
}
