import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { node, object } from 'prop-types'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

// components
import Logo from '@components/Logo'

const styles = () => ({
  layoutWrapper: {
    position: 'relative'
  }
})

const LayoutAuth = ({ classes, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  const title = site.siteMetadata.title || 'Bienvenidos'
  return (
    <Container maxWidth="xs" mx="auto" className={classes.layoutWrapper}>
      <Box mt={3}>
        <CssBaseline />
        <Paper>
          <Box p={3}>
            <Grid container justify="center" alignItems="center">
              <Box mb={3}>
                <div
                  style={{
                    maxWidth: '300px',
                    marginBottom: '1.45rem',
                    width: '120px',
                    height: '120px'
                  }}
                >
                  <Logo />
                </div>
              </Box>
              <Box mb={3}>
                <Typography component="h1" variant="h5" align="center">
                  {title}
                </Typography>
              </Box>
              {children}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

LayoutAuth.propTypes = {
  children: node.isRequired,
  classes: object.isRequired
}

export default withStyles(styles)(LayoutAuth)
