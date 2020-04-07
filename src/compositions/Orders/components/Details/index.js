import React, { memo } from 'react'
import { number, string, oneOfType, bool } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton, Paper, Typography } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'

// components
import Layout from '@components/Layout'
import SEO from '@components/Seo'
import Form from './components/DetailsForm'

const breadcrumbs = [
  { url: '/welcome', text: 'Inicio' },
  { url: '/orders', text: 'Orders' }
]

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(2)}px auto 0`,
    padding: theme.spacing(3, 2),
    '@media print': {
      border: 0,
      boxShadow: 'none'
    }
  }
}))

const renderElement = (classes, id) => (
  <Paper className={classes.root} elevation={2}>
    <Box my={2} displayPrint="none">
      <Typography component="h1" variant="h5" align="left">
        Orden de Compra
      </Typography>
      <IconButton aria-label="Print" onClick={() => window.print()}>
        <PrintIcon />
      </IconButton>
    </Box>
    {id && <Form id={id} />}
  </Paper>
)

const OrdersDetails = memo(({ id, withLayout }) => {
  const classes = useStyles()
  if (breadcrumbs.length === 2) {
    breadcrumbs.push({
      url: `/orders/${id}`,
      text: `Order #${id}`,
      latest: true
    })
  }
  return withLayout ? (
    <Layout breadcrumbs={breadcrumbs}>
      <SEO title="Order details" />
      {renderElement(classes, id)}
    </Layout>
  ) : (
    renderElement(classes, id)
  )
})

OrdersDetails.propTypes = {
  id: oneOfType([number, string]),
  withLayout: bool
}

OrdersDetails.defaultProps = {
  id: null,
  withLayout: true
}

export default OrdersDetails
