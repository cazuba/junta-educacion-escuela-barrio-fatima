import React, { useContext } from 'react'
import { Formik } from 'formik'
import { Button, TextField } from '@material-ui/core'

// contexts
import { NotificationsContext } from '@contexts/Notifications'

// modules
import { useCommonStyles } from '@modules/formik'
import { schema, onSubmit } from './modules/helpers'

const Login = props => {
  const { showMessage, hideMessage } = useContext(NotificationsContext)
  const classes = useCommonStyles(props)
  return (
    <Formik
      initialValues={{ email: 'a@b.com', password: '12345678' }}
      validationSchema={schema}
      onSubmit={onSubmit(showMessage, hideMessage)}
    >
      {({
        values,
        errors,
        status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            id="email"
            name="email"
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextField
            id="password"
            name="password"
            className={classes.textField}
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            label="Password"
            fullWidth
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default Login
