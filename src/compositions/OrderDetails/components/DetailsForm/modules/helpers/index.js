import { navigate } from 'gatsby'
import * as Yup from 'yup'

import { SENDING } from '@components/Notification'

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
  showMessage({ variant: SENDING, message: 'Sending...' })
  setTimeout(() => {
    hideMessage()
    console.log(values)
    navigate('/orders')
  }, 600)
}
