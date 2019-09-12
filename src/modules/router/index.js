import { navigate } from 'gatsby'

import Env from '../env'

export default class Router {
  static go(url) {
    return Env.isClient() ? navigate(url) : null
  }
}
