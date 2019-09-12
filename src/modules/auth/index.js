import Env from '../env'
import Cookie from '../cookie'
import { secondsToDays, secondsToMilliseconds } from '../time'
import { SESSION_EXPIRED } from '../paramNotification'

const SSR_NOT_IMPLEMENTED_CB = cb =>
  (cb && cb('SS not implemented yet.', null)) || false

export default class Auth {
  static getToken(cb = () => null) {
    Cookie.get(process.env['GATSBY_COOKIE_NAME'], (_, token) => {
      if (token && token.accessToken) {
        if (Auth.isValid(token)) return cb(null, token.accessToken)
      }
      return cb(SESSION_EXPIRED)
    })
  }
  static isValid(token) {
    return Date.now() < token._expiresAtAsMilliseconds
  }

  // Is Authentitcated
  static __clientIsAuth(cb) {
    const callback = cb
      ? (err, token) => {
          cb(err, !err && token && Auth.isValid(token))
        }
      : null
    const token = Cookie.get(process.env['GATSBY_COOKIE_NAME'], callback)
    return Auth.isValid(token)
  }
  static __serverIsAuth(cb) {
    return SSR_NOT_IMPLEMENTED_CB(cb)
  }
  static isAuth(cb) {
    return Env.isClient() ? Auth.__clientIsAuth(cb) : Auth.__serverIsAuth(cb)
  }

  // Set Authenticated
  static __clientSetAuthenticated(data, cb = () => null) {
    const _expiresAtAsMilliseconds =
      Date.now() + secondsToMilliseconds(data.expiresIn)
    const tokenWithInfo = {
      _expiresAtAsMilliseconds,
      ...data
    }

    Cookie.toJSON(
      process.env['GATSBY_COOKIE_NAME'],
      tokenWithInfo,
      { expires: secondsToDays(data.expiresIn), path: '/' },
      err => {
        if (err) return cb(err)
        cb(null)
      }
    )
  }
  static __serverSetAuthenticated(_, cb) {
    SSR_NOT_IMPLEMENTED_CB(cb)
  }
  static setAuthenticated(data, cb) {
    Env.isClient()
      ? Auth.__clientSetAuthenticated(data, cb)
      : Auth.__serverSetAuthenticated(data, cb)
  }

  // Clear Session
  static __clientClearSession(cb = () => null) {
    Cookie.remove(process.env['GATSBY_COOKIE_NAME'], null, err => {
      const { location } = Env.getWindow()
      let homeUrl = location.protocol + '//' + location.host
      location.href = homeUrl
      cb()
    })
  }
  static __serverClearSession(cb) {
    SSR_NOT_IMPLEMENTED_CB(cb)
  }
  static clearSession(cb = () => {}) {
    Env.isClient()
      ? Auth.__clientClearSession(cb)
      : Auth.__serverClearSession(cb)
  }

  // logout
  static logout() {
    Auth.clearSession()
  }
}
