import React, { Component } from 'react'
import { navigate } from 'gatsby'

// modules
import Auth from '@modules/auth'

export default function(WrappedComponent) {
  return class extends Component {
    render() {
      if (Auth.isAuth()) {
        navigate('/orders')
        return null
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
