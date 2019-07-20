import React from 'react'
import { oneOf } from 'prop-types'

// contexts
import { NotificationsProvider } from '@contexts/Notifications'

// components
import AuthLayout from './components/LoginTemplate'
import CommonLayout from './components/CommonTemplate'

export const LOGIN_TEMPLATE = 'loginTemplate'
export const COMMON_TEMPLATE = 'commonTemplate'

const TemplatesMap = {
  [LOGIN_TEMPLATE]: props => <AuthLayout {...props} />,
  [COMMON_TEMPLATE]: props => <CommonLayout {...props} />
}

const Layout = ({ template, ...props }) => {
  const renderLayout = TemplatesMap[template] || TemplatesMap[COMMON_TEMPLATE]
  return <NotificationsProvider>{renderLayout(props)}</NotificationsProvider>
}

Layout.propTypes = {
  template: oneOf([LOGIN_TEMPLATE, COMMON_TEMPLATE])
}

Layout.defaultProps = {
  template: COMMON_TEMPLATE
}

export default Layout
