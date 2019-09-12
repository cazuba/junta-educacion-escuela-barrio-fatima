import React from 'react'
import { bool, func } from 'prop-types'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'

// modules
import { isIOS } from '@modules/ios'
import Router from '@modules/router'
import { getMainMenu, getModules } from './modules/helpers'

const drawerWidth = 240
const mainMenu = getMainMenu()
const modulesMenu = getModules()
const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  icon: {
    fontSize: 12
  },
  externalLink: {
    color: 'inherit',
    display: 'flex',
    textDecoration: 'none'
  }
}))

const renderList = list =>
  list.map((item, index) => (
    <ListItem button key={index} onClick={() => Router.go(item.url)}>
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.displayName} />
    </ListItem>
  ))

const Menu = ({ isOpen, handleCloseDrawer, handleOpenDrawer }) => {
  const classes = useStyles()

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    if (open) {
      handleOpenDrawer()
    } else {
      handleCloseDrawer()
    }
  }

  return (
    <SwipeableDrawer
      disableBackdropTransition={!isIOS}
      disableDiscovery={isIOS}
      className={classes.drawer}
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>{renderList(mainMenu)}</List>
        <Divider />
        <List>{renderList(modulesMenu)}</List>
      </div>
    </SwipeableDrawer>
  )
}

Menu.propTypes = {
  isOpen: bool,
  handleCloseDrawer: func,
  handleOpenDrawer: func
}

Menu.defaultProps = {
  isOpen: false,
  handleCloseDrawer: () => null,
  handleOpenDrawer: () => null
}

export default Menu
