import React from 'react'
import { Link } from 'gatsby'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Layout, { LOGIN_TEMPLATE } from '@components/Layout'
import Logo from '@components/Logo'
import SEO from '@components/Seo'

const IndexPage = () => (
  <Layout template={LOGIN_TEMPLATE}>
    <SEO title="Home" />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Logo />
    </div>
    <Typography align="center" style={{ width: '100%' }}>
      Forgot password - WIP
    </Typography>
    <Box py={2}>
      <Link variant="button" to="/">
        Login
      </Link>
    </Box>
  </Layout>
)

export default IndexPage
