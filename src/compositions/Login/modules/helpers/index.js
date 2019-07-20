import * as Yup from 'yup'

export const schema = Yup.object({
  email: Yup.string('Enter your email')
    .min(3, 'Invalid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
})

export const onSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    setSubmitting(false)
  }, 400)
}
