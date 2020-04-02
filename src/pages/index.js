import React from 'react'
import { Link } from 'gatsby'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

// components
import Layout, { LOGIN_TEMPLATE } from '@components/Layout'
import Logo from '@components/Logo'
import SEO from '@components/Seo'

// modules
import withParamNotification from '@hoc/withParamNotification'
import { any } from 'prop-types'

const Content = withParamNotification(() => (
  <>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Logo />
    </div>
    <Typography align="center" style={{ width: '100%' }}>
      Bienvenido/a al Sistema de Ordenes de Compra para la Junta de Educación de
      Fatima
    </Typography>
    <Box py={2}>
      <Link variant="button" to="/login">
        Entrar
      </Link>
    </Box>
  </>
))

const IndexPage = ({ location }) => (
  <Layout template={LOGIN_TEMPLATE}>
    <SEO title="Home" />
    <Content location={location} />
  </Layout>
)

IndexPage.propTypes = {
  location: any.isRequired
}

export default IndexPage
