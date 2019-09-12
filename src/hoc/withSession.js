import React, { Component } from 'react'
import { navigate } from 'gatsby'

// modules
import Auth from '@modules/auth'
import { SESSION_EXPIRED } from '@modules/paramNotification'

export default function(WrappedComponent) {
  return class extends Component {
    render() {
      if (!Auth.isAuth()) {
        navigate(`/?code=${SESSION_EXPIRED}`)
        return null
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
