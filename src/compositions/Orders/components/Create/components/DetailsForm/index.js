import React from 'react'
import { Formik, Form, FieldArray } from 'formik'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/AddCircle'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import { useSnackbar } from 'notistack'

// components
import DateTime from '@components/DateTime'

// modules
import { useCommonStyles } from '@modules/formik'
import useFormat, { MONEY } from '@modules/format'
import { schema, onSubmit } from './modules/helpers'

const ITEM_HEIGHT = 48
const FIXED_FEES = 0.13
const ItemModel = {
  qty: 0,
  unit: '',
  description: '',
  tax: false,
  unitPrice: 0,
  price: 0
}

const DetailsForm = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const model = {
    orderId: null,
    date: new Date(),
    name: null,
    condition: null,
    items: [ItemModel],
    subtotal: 0,
    discount: 0,
    fees: 0,
    total: 0
  }
  const classes = useCommonStyles(props)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [onCallbackFns, setOnCallbackFns] = React.useState(() => null)
  const open = Boolean(anchorEl)

  function handleClick(onRemove, onAdd) {
    return function(event) {
      setOnCallbackFns({ onRemove, onAdd })
      setAnchorEl(event.currentTarget)
    }
  }

  function handleClose(action) {
    return function() {
      const { onRemove, onAdd } = onCallbackFns
      if (action === 'add') {
        onAdd()
      } else if (action === 'remove') {
        onRemove()
      }
      setAnchorEl(null)
    }
  }

  function calculateTotals(values, setFieldValue) {
    let fees = 0
    let subtotal = values.items.reduce((accumulate, curr) => {
      const imp_percentage = Boolean(curr.tax) ? 0 : FIXED_FEES
      const imp_amount = curr.price * imp_percentage
      fees += imp_amount
      return accumulate + curr.price
    }, 0)
    subtotal = subtotal < 0 ? 0 : subtotal
    fees = fees < 0 ? 0 : fees
    let total = subtotal + fees
    total = total - (values.discount || 0)
    total = total < 0 ? 0 : total
    setFieldValue('subtotal', useFormat(subtotal, MONEY))
    setFieldValue('fees', useFormat(fees, MONEY))
    setFieldValue('total', useFormat(total, MONEY))
  }

  function handleChangeQuantity(
    values,
    item,
    index,
    setFieldValue,
    handleChange
  ) {
    return function(event) {
      const { value } = event.target || {}
      const price = item.unitPrice * value
      setFieldValue(`items[${index}]price`, price)
      values.items[index].price = price
      calculateTotals(values, setFieldValue)
      return handleChange(event)
    }
  }

  function handleChangeUnitPrice(
    values,
    item,
    index,
    setFieldValue,
    handleChange
  ) {
    return function(event) {
      const { value } = event.target || {}
      const price = item.qty * value
      setFieldValue(`items[${index}]price`, price)
      values.items[index].price = price
      calculateTotals(values, setFieldValue)
      return handleChange(event)
    }
  }

  function handleBlurTotals(values, setFieldValue, handleBlur) {
    return function(event) {
      calculateTotals(values, setFieldValue)
      return handleBlur(event)
    }
  }

  function handleChangeCheckbox(values, index, setFieldValue, handleChange) {
    return function(event, checked) {
      values.items[index].tax = checked
      calculateTotals(values, setFieldValue)
      return handleChange(event)
    }
  }

  function handleChangeDiscount(
    values,
    setFieldValue,
    handleChange
  ) {
    return function(event) {
      const { value } = event.target || {}
      values.discount = value
      calculateTotals(values, setFieldValue)
      return handleChange(event)
    }
  }
  return (
    <Formik
      initialValues={model}
      validationSchema={schema}
      onSubmit={onSubmit(enqueueSnackbar, closeSnackbar)}
    >
      {({
        values,
        errors,
        status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
        <Form onSubmit={handleSubmit} className={classes.formHorizontal}>
          <Grid container>
            <Grid item xs={12} md={8}>
              <TextField
                className={classes.textField}
                id="name"
                name="name"
                fullWidth
                helperText={touched.name ? errors.name : ''}
                error={touched.name && Boolean(errors.name)}
                label="Razón Social / Nombre"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="dense"
              />
              <TextField
                className={classes.textField}
                id="condition"
                name="condition"
                fullWidth
                helperText={touched.condition ? errors.condition : ''}
                error={touched.condition && Boolean(errors.condition)}
                label="Condición"
                value={values.condition}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                className={classes.textField}
                id="orderId"
                name="orderId"
                fullWidth
                helperText={touched.orderId ? errors.orderId : ''}
                error={touched.orderId && Boolean(errors.orderId)}
                label="N. Orden"
                value={values.orderId}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  readOnly: true
                }}
                disabled
                variant="outlined"
                margin="dense"
              />
              <DateTime
                className={classes.textField}
                name="date"
                label="Fecha de compra"
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                inputVariant="outlined"
                showTodayButton={true}
                value={values.date}
                margin="dense"
                fullWidth
              />
            </Grid>
          </Grid>
          <Paper elevation={2} className={classes.repetitiveGroup}>
            <FieldArray
              name="items"
              render={({ insert, remove }) =>
                values && values.items && values.items.length > 0
                  ? values.items.map((item, index) => {
                      const fieldTouched =
                        touched.items && touched.items[index]
                          ? touched.items[index]
                          : {}
                      const errorsField =
                        errors.items && errors.items[index]
                          ? errors.items[index]
                          : {}
                      return (
                        <Grid container key={index}>
                          <Grid item xs={12} md={1}>
                            <TextField
                              className={classes.textField}
                              id="qty"
                              name={`items[${index}]qty`}
                              type="number"
                              helperText={
                                fieldTouched.qty
                                  ? errorsField.qty
                                  : ''
                              }
                              error={
                                fieldTouched.qty &&
                                Boolean(errorsField.qty)
                              }
                              label="Cantidad"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 0
                              }}
                              value={item.qty}
                              onChange={handleChangeQuantity(
                                values,
                                item,
                                index,
                                setFieldValue,
                                handleChange
                              )}
                              onBlur={handleBlurTotals(
                                values,
                                setFieldValue,
                                handleBlur
                              )}
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
                              helperText={
                                fieldTouched.unit ? errorsField.unit : ''
                              }
                              error={
                                fieldTouched.unit && Boolean(errorsField.unit)
                              }
                              InputLabelProps={{
                                shrink: true
                              }}
                              label="Unidad"
                              value={item.unit}
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                              helperText={
                                fieldTouched.description
                                  ? errorsField.description
                                  : ''
                              }
                              error={
                                fieldTouched.description &&
                                Boolean(errorsField.description)
                              }
                              label="Description"
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={item.description}
                              onChange={handleChange}
                              onBlur={handleBlur}
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
                                  error={
                                    fieldTouched.tax &&
                                    Boolean(errorsField.tax)
                                  }
                                  defaultChecked={!!item.tax}
                                  defaultValue={item.tax}
                                  onChange={handleChangeCheckbox(
                                    values,
                                    index,
                                    setFieldValue,
                                    handleChange
                                  )}
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
                              helperText={
                                fieldTouched.unitPrice
                                  ? errorsField.unitPrice
                                  : ''
                              }
                              error={
                                fieldTouched.unitPrice &&
                                Boolean(errorsField.unitPrice)
                              }
                              label="Precio Unitario"
                              InputLabelProps={{
                                shrink: true
                              }}
                              inputProps={{
                                min: 0
                              }}
                              value={item.unitPrice}
                              onChange={handleChangeUnitPrice(
                                values,
                                item,
                                index,
                                setFieldValue,
                                handleChange
                              )}
                              onBlur={handleBlurTotals(
                                values,
                                setFieldValue,
                                handleBlur
                              )}
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
                              helperText={
                                fieldTouched.price
                                  ? errorsField.price
                                  : ''
                              }
                              error={
                                fieldTouched.price &&
                                Boolean(errorsField.price)
                              }
                              label="Valor Total"
                              InputLabelProps={{
                                shrink: true
                              }}
                              value={item.price}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              variant="outlined"
                              margin="dense"
                              fullWidth
                              disabled
                            />
                          </Grid>
                          <Grid item>
                            <IconButton
                              aria-label="More"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClick(
                                () => {
                                  remove(index)
                                  values.items && delete values.items[index]
                                  calculateTotals(values, setFieldValue)
                                },
                                () => insert(index + 1, ItemModel)
                              )}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      )
                    })
                  : null
              }
            />
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose('close')}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {values.items.length > 1 && (
                <MenuItem onClick={handleClose('remove')}>
                  <RemoveIcon
                    color="secondary"
                    className={classes.recordAction}
                    fontSize="small"
                  />
                  Eliminar
                </MenuItem>
              )}
              <MenuItem
                className="containedPrimary"
                onClick={handleClose('add')}
              >
                <AddIcon
                  color="primary"
                  className={classes.recordAction}
                  fontSize="small"
                />
                Agregar
              </MenuItem>
            </Menu>
          </Paper>
          <Grid container direction="column" alignItems="flex-end">
            <Grid item>
              <TextField
                className={classes.textField}
                id="subtotal"
                name="subtotal"
                helperText={touched.subtotal ? errors.subtotal : ''}
                error={touched.subtotal && Boolean(errors.subtotal)}
                label="SubTotal"
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                  min: 0
                }}
                value={values.subtotal}
                onChange={handleChange}
                onBlur={handleBlur}
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
                helperText={touched.discount ? errors.discount : ''}
                error={touched.discount && Boolean(errors.discount)}
                label="Descuento"
                InputLabelProps={{
                  shrink: true
                }}
                inputProps={{
                  min: 0
                }}
                value={values.discount}
                // onChange={handleChange}
                onChange={handleChangeDiscount(
                  values,
                  setFieldValue,
                  handleChange
                )}
                onBlur={handleChangeDiscount(
                  values,
                  setFieldValue,
                  handleBlur
                )}
                // onBlur={handleBlur}
                variant="outlined"
                margin="dense"
                placeholder="0"
                fullWidth
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
                onChange={handleChange}
                onBlur={handleBlur}
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
                helperText={touched.total ? errors.total : ''}
                error={touched.total && Boolean(errors.total)}
                label="Total"
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                  min: 0
                }}
                value={values.total}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="dense"
                placeholder="0"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default DetailsForm
