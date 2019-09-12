import React, { Component } from 'react'

// modules
import Auth from '@modules/auth'
import Router from '@modules/router'
import { SESSION_EXPIRED } from '@modules/paramNotification'

export default function(WrappedComponent) {
  return class extends Component {
    render() {
      if (!Auth.isAuth()) {
        Router.go(`/?code=${SESSION_EXPIRED}`)
        return null
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
