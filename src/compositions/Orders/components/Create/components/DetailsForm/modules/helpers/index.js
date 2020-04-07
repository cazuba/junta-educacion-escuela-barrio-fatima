import * as Yup from 'yup'

// components

// modules
import { SENDING, ERROR, SUCCESS } from '@modules/constants'
import Router from '@modules/router'
import Api from '@modules/api'
import { ORDERS_ENDPOINT } from '@modules/endpoints'

export const schema = Yup.object({
  date: Yup.date().required('La fecha de compra es requerida'),
  name: Yup.string('Razón Social / Nombre y Apellidos').required(
    'Razón social o Nombre y apellidos es requerido'
  ),
  condition: Yup.string('Condición').required('La condición es requerida'),
  description: Yup.string('Descripción')
})

const parseMoneyToNumber = text => parseFloat(text.replace("₡", "").replace(",", ".").replace(' ', ''))

export const onSubmit = (showMessage, hideMessage) => (
  values,
  { setStatus, setSubmitting }
) => {
  const msgId = showMessage('Sending...', { variant: SENDING })
  const formValues = {
    ...values,
    discount: values.discount ? parseMoneyToNumber(values.discount) : 0,
    orderId: undefined,
    fees: undefined,
    subtotal: undefined,
    total: undefined
  }
  formValues.items = formValues.items.map(item => {
    delete item.price
    return item
  })
  const orders = new Api()
  const payload = { payload: formValues }
  orders.post(ORDERS_ENDPOINT, payload, (err, response) => {
    hideMessage(msgId)
    const { status, data } = response || {}
    if (err || !status || !data || status !== 201) {
      err && console.error(err)
      let message = 'There was an error while saving the order please try again.'
      setSubmitting(false)
      setStatus(false)
      showMessage(message, {
        variant: ERROR
      })
      return false
    }
    const { order } = data
    showMessage('Saved!', {
      variant: SUCCESS
    })
    Router.go(`/orders/${order._id || ''}`)
  })
}
