import React, { useContext } from 'react'
import { Formik } from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

// contexts
import { NotificationsContext } from '@contexts/Notifications'

// modules
import { schema, onSubmit } from './modules/helpers'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%'
  },
  textField: {
    height: '68px',
    marginBottom: theme.spacing(2)
  }
}))

const Login = props => {
  const { showMessage } = useContext(NotificationsContext)
  const classes = useStyles(props)
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={onSubmit}
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
            label="Email / Username"
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
            onClick={() => showMessage({ message: 'test' })}
          >
            Login
          </Button>
          {/* <Snackbar variant={status.css} message={status.message} /> */}
        </form>
      )}
    </Formik>
  )
}

export default Login
