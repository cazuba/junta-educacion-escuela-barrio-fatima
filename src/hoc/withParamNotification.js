import React, { useEffect } from 'react'
import qs from 'qs'
import { useSnackbar } from 'notistack'

// components
// import Notification from '@components/Notification'

// modules
import ParamNotification from '@modules/paramNotification'
import Router from '@modules/router'

export default function(WrappedComponent) {
  return function(props) {
    const { enqueueSnackbar } = useSnackbar()
    const { location } = props // eslint-disable-line react/prop-types
    const { search, pathname } = location || {}
    
    useEffect(() => {
      if (search) {
        const params = qs.parse(search, { ignoreQueryPrefix: true })
        const { code } = params || {}
        const notification = ParamNotification[code]
        if (notification) {
          const { message, variant } = notification
          enqueueSnackbar(message, { variant, onClose: () => Router.go(pathname) })
        }
      }
    }, [search, pathname])
    return (
        <WrappedComponent {...props} />
    )
  }
}
