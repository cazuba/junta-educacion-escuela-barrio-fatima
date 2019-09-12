import React, { useContext } from 'react'
import { bool, node, oneOf, func } from 'prop-types'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import WarningIcon from '@material-ui/icons/Warning'

// contexts
import { NotificationsContext } from '@contexts/Notifications'

// components
import Loader from '@components/Loader'

export const SUCCESS = 'success'
export const WARNING = 'warning'
export const ERROR = 'error'
export const INFO = 'info'
export const SENDING = 'sending'

const variantIcon = {
  [SUCCESS]: CheckCircleIcon,
  [WARNING]: WarningIcon,
  [ERROR]: ErrorIcon,
  [INFO]: InfoIcon
}

const useStyles = makeStyles(theme => ({
  [SUCCESS]: {
    backgroundColor: green[600]
  },
  [ERROR]: {
    backgroundColor: theme.palette.error.dark
  },
  [INFO]: {
    backgroundColor: theme.palette.primary.dark
  },
  [WARNING]: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 26
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const Notification = ({
  showIcon,
  message,
  variant,
  hideOnClickAway,
  hideMessage,
  ...rest
}) => {
  const classes = useStyles(rest)
  const Icon = variantIcon[variant]
  const { hideMessage: contextHideMessage } = useContext(NotificationsContext)
  function handleClose() {
    hideMessage && hideMessage()
    contextHideMessage && contextHideMessage()
  }

  return (
    <Snackbar
      {...rest}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={true}
      onClose={event => hideOnClickAway && handleClose(event)}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {variant === SENDING ? (
              <>
                <Loader />
                <Typography variant="body2" style={{ marginLeft: '10px' }}>
                  {message}
                </Typography>
              </>
            ) : (
              <>
                {showIcon && (
                  <Icon className={clsx(classes.icon, classes.iconVariant)} />
                )}
                {message}
              </>
            )}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        open={true}
      />
    </Snackbar>
  )
}

Notification.propTypes = {
  hideOnClickAway: bool,
  message: node,
  showIcon: bool,
  variant: oneOf([SUCCESS, WARNING, ERROR, INFO, SENDING]),
  hideMessage: func
}

Notification.defaultProps = {
  variant: INFO,
  showIcon: true,
  hideOnClickAway: true,
  message: '',
  hideMessage: () => null
}

export default Notification
