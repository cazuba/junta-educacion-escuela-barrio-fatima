import React, { useState } from 'react'
import NotificationsContext from './NotificationsContext'
import { node } from 'prop-types'

import Notification from '@components/Notification'

const LoadingProvider = ({ children }) => {
  const showMessage = props => {
    setLoading(prevState => ({
      ...prevState,
      props,
      visible: true
    }))
  }
  const hideMessage = () => {
    setLoading(prevState => ({ ...prevState, visible: false }))
  }

  const loadingState = {
    props: {},
    visible: false,
    showMessage,
    hideMessage
  }

  const [loading, setLoading] = useState(loadingState)
  const { props, visible } = loading

  return (
    <NotificationsContext.Provider value={{ showMessage, hideMessage }}>
      {children}
      {visible && <Notification {...props} />}
    </NotificationsContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: node
}

LoadingProvider.defaultProps = {
  children: null
}

export default LoadingProvider
