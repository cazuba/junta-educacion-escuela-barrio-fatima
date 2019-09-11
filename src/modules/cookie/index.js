import JSCookie from 'js-cookie'

export default class Cookie {
  static toJSON(name, value, config, cb) {
    try {
      JSCookie.set(name, JSON.stringify(value), config || {})
      if (cb) return cb(null, true)
      return true
    } catch (err) {
      if (cb) return cb(err)
      return false
    }
  }

  static get(name, cb) {
    try {
      const json = JSCookie.get(name)
      const data = (json && JSON.parse(json)) || {}
      if (cb) cb(null, data)
      return data
    } catch (err) {
      if (cb) return cb(err)
      return {}
    }
  }

  static remove(name, config, cb) {
    try {
      JSCookie.remove(name, config || {})
      return (cb && cb(null)) || true
    } catch (err) {
      return (cb && cb(err)) || false
    }
  }
}
