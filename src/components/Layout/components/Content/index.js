import React from 'react'
import { Link } from 'gatsby'
import { node, bool } from 'prop-types'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

const Content = ({ showBreadcrumbs, children }) => (
  <Grid container direction="column" spacing={1}>
    {showBreadcrumbs && (
      <Grid item mb={3} ml={3}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Typography color="textPrimary">Internal</Typography>
        </Breadcrumbs>
      </Grid>
    )}
    <Grid item>{children}</Grid>
  </Grid>
)

Content.propTypes = {
  children: node.isRequired,
  showBreadcrumbs: bool
}

Content.defaultProps = {
  showBreadcrumbs: true
}

export default Content
