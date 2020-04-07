import React from 'react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { object } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

// modules
import useFormat, { MONEY } from '@modules/format'

const useStyles = makeStyles(theme => ({
  qty: {
    width: 60
  },
  unit: {
    width: 60
  },
  tax: {
    width: 60
  },
  price: {
    width: 100
  },
  total: {
    width: 100
  },
  totals: {
    fontWeight: 'bold',
    width: 250,
    '& *': {
      fontWeight: 'bold'
    }
  },
  wordSpacing: {
    marginRight: 3
  },
  totalLabel: {
    width: 90
  },
  numeric: {
    textAlign: 'right'
  },
  firma: {
    height: 50,
    borderBottom: '1px solid #000',
    width: 400
  },
  firmaName: {
    height: 50,
    width: 400
  }
}))

const OrderPrint = ({ order }) => {
  const classes = useStyles()
  return (
    <>
      <Typography component="h1" variant="h5" align="left">
        Orden de Compra #{order.orderNumber}
      </Typography>
      <Box display="flex" flexDirection="column">
        <Box display="flex">
          <b>Razon Social</b>
        </Box>
        <Box display="flex">{order.socialName}</Box>
      </Box>
      <Box display="flex">
        <Box display="flex" flexDirection="column" flex={1}>
          <Box display="flex">
            <b>Condición</b>
          </Box>
          <Box display="flex">{order.condition}</Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex">
            <b>Fecha</b>
          </Box>
          <Box display="flex">
            <span className={classes.wordSpacing}>
              {dayjs(order.boughtDate).format('dddd')}
            </span>
            <span className={classes.wordSpacing}>
              {dayjs(order.boughtDate).format('D')}
            </span>
            <span className={classes.wordSpacing}>de</span>
            <span className={classes.wordSpacing}>
              {dayjs(order.boughtDate).format('MMMM')}
            </span>
            <span className={classes.wordSpacing}>del</span>
            <span className={classes.wordSpacing}>
              {dayjs(order.boughtDate).format('YYYY')},
            </span>
            <span className={classes.wordSpacing}>
              {dayjs(order.boughtDate).format('hh:mma')}
            </span>
          </Box>
        </Box>
      </Box>
      <Box display="flex" mb={1}>
        <Box className={classes.qty}>Cantidad</Box>
        <Box className={classes.unit}>Unidad</Box>
        <Box flex={1}>Description</Box>
        <Box className={classes.tax}>Exento</Box>
        <Box className={classes.price}>Precio Unitario</Box>
        <Box className={classes.total}>Valor Total</Box>
      </Box>
      {order.items.map(item => (
        <Box display="flex" mb={1}>
          <Box className={classes.qty}>{item.qty}</Box>
          <Box className={classes.unit}>{item.unit}</Box>
          <Box flex={1}>{item.description}</Box>
          <Box className={clsx(classes.tax, classes.numeric)}>
            {item.tax ? 'E' : ''}
          </Box>
          <Box className={clsx(classes.price, classes.numeric)}>
            {useFormat(item.unitPrice, MONEY)}
          </Box>
          <Box className={clsx(classes.total, classes.numeric)}>
            {useFormat(item.price, MONEY)}
          </Box>
        </Box>
      ))}
      <Box display="flex" mb={1}>
        <Box display="flex" flex={1}>
          {' '}
        </Box>
        <Box display="flex" flexDirection="column" className={classes.totals}>
          <Box display="flex">
            <Box display="flex" className={classes.totalLabel}>
              Subtotal
            </Box>
            <Box flex={1} className={classes.numeric}>
              {useFormat(order.subtotal, MONEY)}
            </Box>
          </Box>
          <Box display="flex">
            <Box display="flex" className={classes.totalLabel}>
              Descuento
            </Box>
            <Box flex={1} className={classes.numeric}>
              {useFormat(order.discount || 0, MONEY)}
            </Box>
          </Box>
          <Box display="flex">
            <Box display="flex" className={classes.totalLabel}>
              Impuestos
            </Box>
            <Box flex={1} className={classes.numeric}>
              {useFormat(order.fees || 0, MONEY)}
            </Box>
          </Box>
          <Box display="flex">
            <Box display="flex" className={classes.totalLabel}>
              Total
            </Box>
            <Box flex={1} className={classes.numeric}>
              {useFormat(order.total, MONEY)}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        mt={4}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <span className={classes.firma}></span>
        <span className={classes.firmaName}>x</span>
      </Box>
    </>
  )
}

OrderPrint.propTypes = {
  order: object
}

OrderPrint.defaultProps = {
  order: {}
}

export default OrderPrint
