import { navigate } from 'gatsby'
import * as Yup from 'yup'

import { SENDING } from '@components/Notification'

export const schema = Yup.object({
  email: Yup.string('Enter your email')
    .min(3, 'Invalid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
})

export const onSubmit = (showMessage, hideMessage) => (values, { setStatus, setSubmitting }) => {
  showMessage({ variant: SENDING, message: 'Sending...' })
  setTimeout(() => {
    hideMessage()
    alert(JSON.stringify(values, null, 2))
    navigate('/orders')
  }, 400)
}
