import { createContext } from 'react'

const LoadingContext = createContext({
  messageVisible: false,
  showMessage: () => {},
  hideMessage: () => {}
})

export default LoadingContext
