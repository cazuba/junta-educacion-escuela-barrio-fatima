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
  { url: '/orders', text: 'Orders' },
  { url: '/orders/', text: `Order #` }
]

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px auto 0`,
    padding: theme.spacing(3, 2)
  }
}))

const renderElement = (classes, id) => (
  <Paper className={classes.root} elevation={2}>
    <Box my={2}>
      <Typography component="h1" variant="h5" align="left">
        Orden de Compra # {id}
      </Typography>
    </Box>
    {id && <Form id={id} />}
  </Paper>
)

const OrdersDetails = ({ id, withLayout }) => {
  const classes = useStyles()
  return withLayout ? (
    <Layout
      breadcrumbs={breadcrumbs.map((item, index) =>
        index === breadcrumbs.length - 1
          ? { ...item, text: `${item.text}${id}` }
          : item
      )}
    >
      <SEO title="Order details" />
      {renderElement(classes, id)}
    </Layout>
  ) : (
    renderElement(classes, id)
  )
}
OrdersDetails.propTypes = {
  id: oneOfType([number, string]),
  withLayout: bool
}

OrdersDetails.defaultProps = {
  id: null,
  withLayout: true
}

export default OrdersDetails
