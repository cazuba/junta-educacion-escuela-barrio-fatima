import React from 'react'
import { oneOf } from 'prop-types'

// components
import AuthLayout from './components/LoginTemplate'
import NavLayout from './components/NavTemplate'

export const LOGIN_TEMPLATE = 'loginTemplate'
export const COMMON_TEMPLATE = 'commonTemplate'

const Layout = ({ template, ...props }) => {
  if (template === LOGIN_TEMPLATE) return <AuthLayout {...props} />
  return <NavLayout {...props} />
}

Layout.propTypes = {
  template: oneOf([LOGIN_TEMPLATE, COMMON_TEMPLATE])
}

Layout.defaultProps = {
  template: COMMON_TEMPLATE
}

export default Layout
