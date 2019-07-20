import { createContext } from 'react'

const LoadingContext = createContext({
  messageVisible: false,
  showMessage: () => {}
})

export default LoadingContext
