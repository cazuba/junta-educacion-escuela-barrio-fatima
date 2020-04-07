import qs from 'qs'

// modules
import Router from '@modules/router'

export const ARRAY_FORMAT = 'repeat'
export const ARRAY_COMMA = 'comma'

export default class Url {
  static parseSearch(searchAsString) {
    return qs.parse(searchAsString, {
      ignoreQueryPrefix: true,
      arrayFormat: ARRAY_FORMAT
    })
  }

  static stringifySearch(searchAsObject, opts = {}) {
    return qs.stringify(searchAsObject, {
      arrayFormat: ARRAY_FORMAT,
      addQueryPrefix: true,
      ...opts
    })
  }

  static updateSearch(base, searchAsObject, cb = null) {
    const searchAsString = Url.stringifySearch(searchAsObject)
    cb ? cb(base + searchAsString) : Router.go(base + searchAsString)
  }
}
