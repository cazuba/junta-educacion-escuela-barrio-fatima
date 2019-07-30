import React from 'react'
import { Link } from 'gatsby'
import Box from '@material-ui/core/Box'

import Login from '@compositions/Login'
import Layout, { LOGIN_TEMPLATE } from '@components/Layout'
import Logo from '@components/Logo'
import SEO from '@components/Seo'

const IndexPage = () => (
  <Layout template={LOGIN_TEMPLATE}>
    <SEO title="Home" />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Logo />
    </div>
    <Login />
    <Box py={2}>
      <Link variant="button" to="/forgot">
        Olvidaste la contraseña?
      </Link>
    </Box>
  </Layout>
)

export default IndexPage
