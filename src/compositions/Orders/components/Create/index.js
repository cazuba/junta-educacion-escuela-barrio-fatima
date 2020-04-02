import React from 'react'
import { number, string, oneOfType, bool } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Paper, Typography } from '@material-ui/core'

// components
import Layout from '@components/Layout'
import SEO from '@components/Seo'
import Form from './components/DetailsForm'

const breadcrumbs = [
  { url: '/welcome', text: 'Inicio' },
  { url: '/orders/', text: `Orders` },
  { url: '/orders/create', text: `Create` }
]

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px auto 0`,
    padding: theme.spacing(3, 2)
  }
}))

const renderElement = (classes) => (
  <Paper className={classes.root} elevation={2}>
    <Box my={2}>
      <Typography component="h1" variant="h5" align="left">
        Nueva Orden de Compra
      </Typography>
    </Box>
    <Form />
  </Paper>
)

const Create = ({ withLayout }) => {
  const classes = useStyles()
  return withLayout ? (
    <Layout
      breadcrumbs={breadcrumbs}
    >
      <SEO title="Order details" />
      {renderElement(classes)}
    </Layout>
  ) : (
    renderElement(classes)
  )
}
Create.propTypes = {
  withLayout: bool
}

Create.defaultProps = {
  withLayout: true
}

export default Create
