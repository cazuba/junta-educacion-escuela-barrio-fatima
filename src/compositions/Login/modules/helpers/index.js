import { navigate } from 'gatsby'
import * as Yup from 'yup'

// components
import { SENDING, ERROR, SUCCESS } from '@components/Notification'

// modules
import { SESSION_ENDPOINT } from '@modules/endpoints'
import Api from '@modules/api'
import Auth from '@modules/auth'
import HTTP_STATUS from '@modules/httpStatus'
import ERROR_CODES from '@modules/errorCode'

export const schema = Yup.object({
  email: Yup.string('Enter your email')
    .min(3, 'Invalid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
})

export const onSubmit = (showMessage, hideMessage) => (
  values,
  { setStatus, setSubmitting }
) => {
  showMessage({ variant: SENDING, message: 'Sending...' })
  const login = new Api(SESSION_ENDPOINT)
  const payload = { payload: { ...values } }
  login.post('', payload, (err, response) => {
    hideMessage()
    if (err) {
      const { response } = err
      const { status, data } = response || { status: 500, data: {} }
      let message =
        'There was an error with the authentication please try again.'
      setSubmitting(false)
      setStatus(false)
      if (
        status === HTTP_STATUS.UNAUTHORIZED ||
        data.code === ERROR_CODES.InvalidCredentialsError
      ) {
        message = 'Invalid email and/or password'
      }
      showMessage({
        variant: ERROR,
        message
      })
      return false
    }
    Auth.setAuthenticated(response.data, err => {
      if (err) {
        console.error(err)
        showMessage({
          variant: ERROR,
          message:
            'There was an error configuring cookies for your session. Please allow/unblock our cookies then try again.'
        })
        return false
      }
      showMessage({
        variant: SUCCESS,
        message: 'Redirecting...'
      })
      setTimeout(() => {
        navigate('/orders')
      }, 500)
    })
  })
}
