import Env from '@modules/env'

export const isIOS = Env.isClient()
  ? process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  : false
