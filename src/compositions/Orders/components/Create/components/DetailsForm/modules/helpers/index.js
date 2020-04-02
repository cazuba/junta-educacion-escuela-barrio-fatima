import * as Yup from 'yup'

// components

// modules
import { SENDING } from '@modules/constants'
import Router from '@modules/router'

export const schema = Yup.object({
  orderId: Yup.string('N. Order')
    .min(1, 'N. Orden invalido')
    .required('N. Orden es requerido'),
  date: Yup.date().required('La fecha de compra es requerida'),
  name: Yup.string('Razón Social / Nombre y Apellidos').required(
    'Razón social o Nombre y apellidos es requerido'
  ),
  condition: Yup.string('Condición').required('La condición es requerida'),
  description: Yup.string('Descripción')
})

export const onSubmit = (showMessage, hideMessage) => (
  values,
  { setStatus, setSubmitting }
) => {
  const msgId = showMessage('Sending...', { variant: SENDING })
  setTimeout(() => {
    hideMessage(msgId)
    Router.go('/orders')
  }, 600)
}
