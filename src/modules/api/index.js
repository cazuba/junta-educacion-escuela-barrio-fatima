import axios from 'axios'

// Modules
import Cookie from '../cookie'

export const HTTP_METHODS = ['get', 'delete', 'post', 'put', 'patch']
const JSON_HEADER = 'application/json'

const _getHeaders = (headers = {}) => ({
  ...headers,
  crossDomain: true,
  'Content-Type': headers['Content-Type'] || JSON_HEADER,
  Accept: headers['Accept'] || JSON_HEADER
})

export default class Api {
  constructor(endpoint = '') {
    this.apiUrl = `${process.env['GATSBY_API_URL']}${endpoint}`
    this.__cancelSource = { cancel: () => null, token: null }
  }
  /**
   * Authorize API headers using Cookies module
   * @param {object} headers Headers to be modified
   * @param {function cb() {}} cb Returns (error, token)
   * @returns void
   */
  __authorize(headers = {}, cb = () => null) {
    Cookie.get(process.env['GATSBY_COOKIE_NAME'], (_, token) => {
      if (token && token.accessToken) {
        headers.Authorization = `Bearer ${token.accessToken}`
      }
      cb(null, headers)
    })
  }

  __newCancelToken() {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    this.__cancelSource = source
    return source.token
  }

  /**
   * Call AJAX provider for API requests
   * @param {string} _method GET || POST || DELETE || PUT
   */
  __request(_method = 'get') {
    const method = _method.toLowerCase()
    if (HTTP_METHODS.indexOf(method) > -1) {
      return (config = {}, cb = () => null) => {
        return axios({
          method,
          ...config,
          headers: _getHeaders(config.headers),
          cancelToken: this.__newCancelToken()
        })
          .then(res => cb(null, res))
          .catch(err => cb(err))
      }
    }
    throw new Error(`Method ${method} not found in HTTP_METHODS`)
  }
  /**
   * Executes API requests
   * @param {string} method
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  __execute(method, path, data, cb, config) {
    this.__authorize(config.headers, (err, headers) => {
      if (err) return cb(err)
      config.headers = headers
      config.url = `${this.apiUrl}${path}`
      config.data = data

      const makeRequest = this.__request(method)
      makeRequest(config, (err, res) => {
        if (err) return cb(err)
        cb(null, res)
      })
    })
  }
  cancelRequest() {
    return this.__cancelSource.cancel('Operation canceled by the user.')
  }
  /**
   * GET API method
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  get(path, config = {}, cb = () => null) {
    this.__execute('get', path, null, cb, config)
  }
  /**
   * GET API method (RESOURCE - using id as resource)
   * @alias Alias for get(path='/:id',...)
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  getById(id, data = {}, config = {}, cb = () => null) {
    return this.get(`/${id}`, data, cb, config)
  }
  /**
   * POST API method
   * @name Api.post
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  post(path = '', data = {}, cb = () => null, config = {}) {
    this.__execute('post', path, data, cb, config)
  }
  /**
   * DELETE API method
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  delete(path = '', data = {}, cb = () => null, config = {}) {
    this.__execute('delete', path, data, cb, config)
  }
  /**
   * PUT API method
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  put(path = '', data = {}, cb = () => null, config = {}) {
    this.__execute('put', path, data, cb, config)
  }
  /**
   * PATCH API method
   * @param {string} path
   * @param {object} data
   * @param {function cb() {}} cb
   * @param {object} config
   */
  patch(path = '', data = {}, cb = () => null, config = {}) {
    this.__execute('patch', path, data, cb, config)
  }
}
