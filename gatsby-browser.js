/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import { navigate } from 'gatsby'
import axios from 'axios'
import wrapWithProvider from './wrap-with-provider'
import './src/styles/global.css'

import HTTP_STATUS from './src/modules/httpStatus'

export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  axios.interceptors.request.use(config => config, err => Promise.reject(err))

  axios.interceptors.response.use(
    res => res,
    err => {
      const { status, config } = err.response || {}
      const { method } = config || { method: '' }

      switch (status) {
        case HTTP_STATUS.UNAUTHORIZED:
          navigate('/login')
          break
        case HTTP_STATUS.NOT_FOUND:
          if (method.toString().toLocaleLowerCase() === 'get') {
            navigate('/404')
          }
          break
        default: break
      }

      return Promise.reject(err)
    }
  )
}
