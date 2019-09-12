import React, { Component } from 'react'

// modules
import Auth from '@modules/auth'
import Router from '@modules/router'

export default function(WrappedComponent) {
  return class extends Component {
    render() {
      if (Auth.isAuth()) {
        Router.go('/orders')
        return null
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
