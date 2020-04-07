import React, { useReducer, useEffect } from 'react'
import { number, string, oneOfType } from 'prop-types'
import clsx from 'clsx'
import { Formik, Form, FieldArray } from 'formik'
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField
} from '@material-ui/core'

// components
import DateTime from '@components/DateTime'
import OrderPrint from '../OrderPrint'

// modules
import Api from '@modules/api'
import { ORDERS_ENDPOINT } from '@modules/endpoints'
import { useCommonStyles } from '@modules/formik'

const STATE_FETCHING = 'fetching'
const STATE_ERROR = 'error'
const STATE_COMPLETED = 'completed'
const initialState = {
  loading: true,
  record: null,
  error: null,
  refetch: () => null
}

const reducer = (state, action) => {
  switch (action.type) {
    case STATE_FETCHING:
      const { refetch } = action.payload
      return { ...initialState, refetch }
    case STATE_COMPLETED:
      return { ...state, error: null, loading: false, record: action.payload }
    case STATE_ERROR:
      return { ...state, record: null, loading: false, error: action.payload }
    default:
      break
  }
}
const orders = new Api(ORDERS_ENDPOINT)

const DetailsForm = ({ id, ...props }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { record, loading, error } = state
  const model = {
    date: new Date(),
    name: '',
    condition: '',
    description: '',
    items: [],
    subtotal: 0,
    discount: 0,
    fees: 0,
    total: 0,
    ...record
  }
  const classes = useCommonStyles(props)

  useEffect(() => {
    let handleOrderResponse = (err, response) => {
      const { data } = response || {}
      if (err || !data) {
        const error = err || new Error('ORDER_NOT_FOUND')
        dispatch({
          type: STATE_ERROR,
          payload: error
        })
        return console.warn(error)
      }
      dispatch({ type: STATE_COMPLETED, payload: data })
    }
    let fetch = () => {
      orders.get(`/${id}`, {}, handleOrderResponse)
    }
    dispatch({ type: STATE_FETCHING, payload: { refetch: fetch } })
    fetch()
    return () => {
      fetch = () => null
    }
  }, [id])

  return loading ? (
    'Loading...'
  ) : error ? (
    'There was an error pulling the order information'
  ) : (
    <>
      <Box display="none" displayPrint="block">
        <OrderPrint order={record} />
      </Box>
      <Box displayPrint="none">
        <Formik initialValues={model}>
          {({ values, errors, status, touched, setFieldValue }) => (
            <Form className={classes.formHorizontal}>
              <Grid container>
                <Grid item xs={12} md={8}>
                  <TextField
                    className={classes.textField}
                    id="name"
                    name="name"
                    fullWidth
                    label="Razón Social / Nombre"
                    value={values.name}
                    disabled
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                    margin="dense"
                  />
                  <TextField
                    className={classes.textField}
                    id="condition"
                    name="condition"
                    fullWidth
                    label="Condición"
                    value={values.condition}
                    disabled
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    className={classes.textField}
                    id="orderNumber"
                    name="orderNumber"
                    fullWidth
                    label="N. Orden"
                    value={values.orderNumber}
                    disabled
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                    margin="dense"
                  />
                  <DateTime
                    className={classes.textField}
                    name="date"
                    label="Fecha de compra"
                    inputVariant="outlined"
                    value={values.date}
                    disabled
                    margin="dense"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Paper
                elevation={2}
                className={clsx(classes.paperPrint, classes.repetitiveGroup)}
              >
                <FieldArray
                  name="items"
                  render={({ insert, remove }) =>
                    values && values.items && values.items.length > 0
                      ? values.items.map((item, index) => (
                          <Grid container key={index}>
                            <Grid item xs={12} md={1}>
                              <TextField
                                className={classes.textField}
                                id="qty"
                                name={`items[${index}]qty`}
                                type="number"
                                label="Cantidad"
                                value={item.qty}
                                disabled
                                inputProps={{
                                  min: 0,
                                  readOnly: true
                                }}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <TextField
                                className={classes.textField}
                                id="unit"
                                name={`items[${index}]unit`}
                                label="Unidad"
                                value={item.unit}
                                disabled
                                InputLabelProps={{
                                  shrink: true,
                                  readOnly: true
                                }}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                              />
                            </Grid>
                            <Grid item className={classes.description}>
                              <TextField
                                className={classes.textField}
                                id="description"
                                name={`items[${index}]description`}
                                label="Description"
                                InputLabelProps={{
                                  shrink: true
                                }}
                                value={item.description}
                                disabled
                                InputProps={{
                                  readOnly: true
                                }}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} md={1}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    className={classes.textField}
                                    id="tax"
                                    name={`items[${index}]tax`}
                                    defaultChecked={!!item.tax}
                                    defaultValue={item.tax}
                                    disabled
                                    variant="outlined"
                                    margin="dense"
                                  />
                                }
                                label="Excento"
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <TextField
                                className={classes.textField}
                                id="unitPrice"
                                name={`items[${index}]unitPrice`}
                                type="number"
                                label="Precio Unitario"
                                inputProps={{
                                  min: 0
                                }}
                                value={item.unitPrice}
                                disabled
                                InputLabelProps={{
                                  shrink: true,
                                  readOnly: true
                                }}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <TextField
                                className={classes.textField}
                                id="price"
                                name={`items[${index}]price`}
                                label="Valor Total"
                                value={item.price}
                                disabled
                                InputProps={{
                                  readOnly: true
                                }}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                        ))
                      : null
                  }
                />
              </Paper>
              <Grid container direction="column" alignItems="flex-end">
                <Grid item>
                  <TextField
                    className={classes.textField}
                    id="subtotal"
                    name="subtotal"
                    label="SubTotal"
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                      min: 0
                    }}
                    value={values.subtotal}
                    variant="outlined"
                    margin="dense"
                    placeholder="0"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.textField}
                    id="discount"
                    name="discount"
                    type="number"
                    label="Descuento"
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      min: 0,
                      readOnly: true
                    }}
                    value={values.discount}
                    variant="outlined"
                    margin="dense"
                    placeholder="0"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.textField}
                    id="fees"
                    name="fees"
                    helperText={touched.fees ? errors.fees : ''}
                    error={touched.fees && Boolean(errors.fees)}
                    label="Impuesto Ventas"
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true
                    }}
                    value={values.fees}
                    variant="outlined"
                    margin="dense"
                    placeholder="0"
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.textField}
                    id="total"
                    name="total"
                    label="Total"
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true,
                      min: 0
                    }}
                    value={values.total}
                    variant="outlined"
                    margin="dense"
                    placeholder="0"
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

DetailsForm.propTypes = {
  id: oneOfType([number, string]).isRequired
}

export default DetailsForm
