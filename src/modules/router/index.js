import { navigate } from 'gatsby'

import Env from '../env'

export default class Router {
  static go(url, opts) {
    return Env.isClient() ? navigate(url, opts) : null
  }
}
