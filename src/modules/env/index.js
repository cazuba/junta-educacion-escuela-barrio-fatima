if (typeof window === 'undefined') {
  global.window = {}
}

export default class Env {
  static isServer() {
    return !(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  }

  static isClient() {
    return !Env.isServer()
  }

  static getWindow() {
    return Env.isClient() ? window : {}
  }

  static getDocument() {
    return Env.isClient() ? document : {}
  }
}
