import React from 'react'
import { Link } from 'gatsby'
import Box from '@material-ui/core/Box'

// components
import Login from '@compositions/Login'
import Layout, { LOGIN_TEMPLATE } from '@components/Layout'
import Logo from '@components/Logo'
import SEO from '@components/Seo'

// modules
import withParamNotification from '@hoc/withParamNotification'
import withoutSession from '@hoc/withoutSession';

const Content = withParamNotification(() => (
  <>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Logo />
    </div>
    <Login />
    <Box py={2}>
      <Link variant="button" to="/forgot">
        Olvidaste la contraseña?
      </Link>
    </Box>
  </>
))

const LoginPage = () => (
  <Layout template={LOGIN_TEMPLATE}>
    <SEO title="Home" />
    <Content />
  </Layout>
)

export default withoutSession(LoginPage)
