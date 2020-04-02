import * as Yup from 'yup'

// modules
import { SENDING, ERROR, SUCCESS } from '@modules/constants'
import { SESSION_ENDPOINT } from '@modules/endpoints'
import Api from '@modules/api'
import Auth from '@modules/auth'
import HTTP_STATUS from '@modules/httpStatus'
import ERROR_CODES from '@modules/errorCode'
import Router from '@modules/router'

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
  const msgId = showMessage('Sending...', { variant: SENDING })
  const login = new Api(SESSION_ENDPOINT)
  const payload = { payload: { ...values } }
  login.post('', payload, (err, response) => {
    hideMessage(msgId)
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
      showMessage(message, {
        variant: ERROR
      })
      return false
    }
    Auth.setAuthenticated(response.data, err => {
      if (err) {
        console.error(err)
        showMessage('There was an error configuring cookies for your session. Please allow/unblock our cookies then try again.', {
          variant: ERROR
        })
        return false
      }
      showMessage('Redirecting...', {
        variant: SUCCESS
      })
      setTimeout(() => {
        Router.go('/orders')
      }, 500)
    })
  })
}
