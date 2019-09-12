import { ERROR, SUCCESS } from '@components/Notification'

export const INVALID_TOKEN = 'invalid_token'
export const SESSION_EXPIRED = 'session_expired'
export const LOGGED_OUT = 'logged_out'

export default {
  [INVALID_TOKEN]: {
    variant: ERROR,
    message: 'Invalid token'
  },
  [SESSION_EXPIRED]: {
    variant: ERROR,
    message: 'Session expired'
  },
  [LOGGED_OUT]: {
    variant: SUCCESS,
    message: 'Session closed successfully!'
  }
}
