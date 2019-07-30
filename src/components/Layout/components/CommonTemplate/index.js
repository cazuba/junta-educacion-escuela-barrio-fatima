import React, { useState } from 'react'
import { node, bool } from 'prop-types'

import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'

// components
import Navigation from '@components/Navigation'
import Menu from '@components/Menu'
import Content from '../Content'

const styles = () => ({})

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
      <CssBaseline />
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

export default withStyles(styles)(Layout)
