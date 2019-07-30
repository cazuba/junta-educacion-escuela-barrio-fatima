import React from 'react'
import HomeIcon from '@material-ui/icons/Home'
import CreatePurchaseOrder from '@material-ui/icons/PlaylistAdd'
import ListOrders from '@material-ui/icons/List'
import UsersIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'

export const getMainMenu = () => [
  { displayName: 'Inicio', icon: <HomeIcon />, url: '/' },
  {
    displayName: 'Nueva orden',
    icon: <CreatePurchaseOrder />,
    url: '/new-order'
  },
  {
    displayName: 'Archivo de Ordenes',
    icon: <ListOrders />,
    url: '/orders'
  }
]
export const getModules = () => [
  { displayName: 'Usuarios', icon: <UsersIcon />, url: '/users' },
  {
    displayName: 'Configuracion',
    icon: <SettingsIcon />,
    url: '/settings'
  }
]
