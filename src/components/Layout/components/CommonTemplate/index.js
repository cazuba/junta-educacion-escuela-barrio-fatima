import React, { useState } from 'react'
import { node, bool } from 'prop-types'

import Container from '@material-ui/core/Container'

// components
import Navigation from '@components/Navigation'
import Menu from '@components/Menu'
import Content from '../Content'

const Layout = ({ showBreadcrumbs, fullWidth, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Menu
        isOpen={isOpen}
        handleCloseDrawer={() => setIsOpen(false)}
        handleOpenDrawer={() => setIsOpen(true)}
      />
      <Navigation handleOpenDrawer={() => setIsOpen(true)} />
      {fullWidth ? (
        <Content
          showBreadcrumbs={showBreadcrumbs}
          children={children}
          {...rest}
        />
      ) : (
        <Container>
          <Content
            showBreadcrumbs={showBreadcrumbs}
            children={children}
            {...rest}
          />
        </Container>
      )}
    </>
  )
}

Layout.propTypes = {
  children: node.isRequired,
  showBreadcrumbs: bool,
  fullWidth: bool
}

Layout.defaultProps = {
  showBreadcrumbs: true,
  fullWidth: false
}

export default Layout
